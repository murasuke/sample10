"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var restify = __importStar(require("restify"));
var builder = __importStar(require("botbuilder"));
var appTalk = __importStar(require("./app-talk"));
// setup Restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat connector for communicating with the Bot Framework Serivce
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
//Listen for message from users
server.post('/api/messages', connector.listen());
// Receive messages from the user and respond by echoing each message back
//  (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    var m = appTalk.App.Talk.GetGreeting(new Date());
    session.send(m);
    session.send("You said: %s", session.message.text);
});
