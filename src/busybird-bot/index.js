var Slack = require('@slack/client');
var RtmClient = Slack.RtmClient;

//RTM_OBJECT.EVENTS

var RTM_EVENTS = Slack.RTM_EVENTS;
//above are references for convenience
var token = process.env.SLACK_API_TOKEN || ' ';
//this is my token logLevel : 'debug' or 'info' does matter
var rtm = new RtmClient(token, { logLevel: 'debug' });
//above creates an instance of RtmClient the library uses winston node module
//hence, define log level as appropriate
rtm.start();

rtm.on(
    RTM_EVENTS.MESSAGE,
    function(message) {
        var aimed_at_me = message.text;
        console.log("hello")
        var bot_name = new RegExp(/<@U1WP2HVNJ>:/);
        //bot should only respond when talked to
        if(bot_name.test(aimed_at_me)){
            console.log("\n\n\nI am in")
            var channel = message.channel;
            var usr_input = message.text;
            var text = '';
            // var haircut = /:haircut:/ //this works!
            var haircut_patt = new RegExp(/:haircut:/)
            var greeting_patt = new RegExp(/hey/)

            if (greeting_patt.test(usr_input)) {
                text = ' Yo, my fellow human!';
                rtm.sendMessage(text, channel);
            }
            else if (haircut_patt.test(usr_input)) {
                //below doesn't work
                text = text + ' Hey! Do you want to tweet that you have an app. at the salon?';
                rtm.sendMessage(text, channel);
                var app = message.text
                if (app == 'yes') {
                    var resY = 'Consider it done' + message.user
                    rtm.sendMessage(resY, channel);
                } else {
                    var resN = 'Ok'
                    rtm.sendMessage(resN, channel);
                }

            } else {
                text = "I need to either make an array or csv file to save all these responses!";
                rtm.sendMessage(text, channel);
                }
            }
    }
);
