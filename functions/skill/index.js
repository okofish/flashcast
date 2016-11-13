var config = require('./config.json');

var uuid = require('uuid');
var request = require('request-promise').defaults({
  baseUrl: 'http://dataservice.accuweather.com/',
  qs: {
    apikey: config['API_KEY']
  }
});

console.log('starting function')
exports.handle = function(event, context, cb) {
  if ('id' in event.params.querystring) {
    var indexID = event.params.querystring.id;
    var locationID = event.params.querystring.location || config['LOCATION_ID'] || 335315;

    var promise = request.get({
      url: '/indices/v1/daily/1day/' + config['LOCATION_ID'] + '/' + indexID,
      qs: {
        details: true
      },
      json: true
    }).then(function(res) {
      console.log(res);
      var forecast = res[0];
      var forecastDate = new Date(forecast['EpochDateTime'] * 1000);
      var uid = uuid.v1({
        node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
        clockseq: 0x1234,
        msecs: forecastDate.getTime() / 1000,
        nsecs: 0
      });

      var toSpeak = forecast['Text'] || ('Today\'s ' + forecast['Name'] + ' is ' + forecast['Category'] + '. ')

      cb(null, {
        uid: 'urn:uuid:' + uid,
        updateDate: forecastDate.toISOString(),
        titleText: 'Today\'s ' + forecast['Name'],
        mainText: toSpeak,
        redirectionURL: forecast['MobileLink'] || undefined
      })
    });
  } else {
    var promise = request.get({
      url: '/indices/v1/daily',
      json: true
    }).then(function(res) {
      cb(null, res);
    });
  }

  promise.catch(function(err) {
    console.error(err);
    cb('We\'re sorry, an error occured.');
  })
}
