# FlashCast

FlashCast is an API powering a suite of Amazon Alexa Flash Briefing skills corresponding to AccuWeather's [Daily Indices](http://developer.accuweather.com/list-available-daily-indices). Instead of a generic high/low and precipitation forecast, FlashCast provides a highly customizable daily briefing tailored just for you.

![Screenshot of FlashCast feeds, some enabled and some disabled](http://f.jesse.ws/flashcast-screenshot.png)
*Get the forecasts that matter to you.*

## How to use it

The Lambda function in this repository is managed with the [Apex](https://github.com/apex/apex) tool - you should install the tool if you want to deploy the function on your own account. Make sure to customize the `functions/skill/config-sample.json` file with your location and API key, and rename it to `config.json`.

To connect the function to the Flash Briefing service, link it to an Amazon API Gateway GET endpoint, with a pass-through body mapping template. You are then free to spend an hour adding the 50-odd Flash Briefing feeds to your Amazon Developer dashboard, using a different `id` query string parameter for each one. Have fun! (You can also get a nice list of the available feeds by visiting the endpoint in your browser, without a query string parameter.)

## Limitations

Due to restrictions on Amazon's part, Flash Briefing requests cannot be directly tailored to the individual user, and as such the location to retrieve forecasts for must be specified in the Lambda function. This project therefore serves as a proof of concept for a system that could be further integrated with the Alexa ecosystem.

<sub>Needless to say this project is not sponsored or endorsed by AccuWeather, etc. All trademarked images or names are the property of their respective owners, blah blah blah.</sub>