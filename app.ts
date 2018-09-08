import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as appTalk from './app-talk';

// setup Restify server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, ()=>{
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Serivce
const connector = new builder.ChatConnector({
    appId:process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD});

//Listen for message from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back
//  (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, (session)=>{
    const m = appTalk.App.Talk.GetGreeting(new Date());
    session.send(m);
    session.send("You said: %s", session.message.text);
});