require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

const listener = server.listen(process.env.port, function () {
  console.log('App is ready');
});

const Discord = require('discord.js');
const client = new Discord.Client();
const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBLToken, { webhookServer: listener, webhookAuth: process.env.webhookPassword }, client);

dbl.webhook.on('ready', function (hook) {
  console.log('DBL Webhook is ready');
});

client.on('ready', function () {
  console.log('Discord Client is ready');
});

dbl.webhook.on('vote', function (vote) {
  const user = client.users.cache.get(vote.user);
  if (!user) return;

  user.send('Thanks for voting !');
});

client.login(process.env.discordToken);
