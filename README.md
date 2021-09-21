# Multi-Player Boggle Web App

## Description

A multiplayer Boggle game created in React.

## Play

The game is hosted [here](http://ec2-35-153-50-80.compute-1.amazonaws.com:4001) You can also follow the sections below to setup and run the app locally.

## Local Setup

Clone this repository and run the following commands:

    cd react-boggle-multiplayer
    npm install
    cd client
    npm install

To run the app, first run the following command to begin the backend server:

    cd react-boggle-multiplayer
    npm start

Then, in a separate terminal window, run the following commands to begin the client server:

    cd client
    npm start

You should see a browser window automatically open and the Boggle web app displayed on `http://localhost:8080`. Enjoy!

## AWS EC2 Setup

Boot up a free tier, Amazon Linux AMI EC2 with the following user data:

```
#!/bin/bash
sudo yum install -y git
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs
```

Once your EC2 is running, ssh into it and run the following commands:

```
cd ~
git clone https://github.com/johndaudelin/react-boggle-multiplayer.git
cd react-boggle-multiplayer/client
npm install
npm run build
cd ..
screen
npm start
```

## Code

The client application code was taken initially from my previous project, [react-boggle](https://github.com/Cowboy46/react-boggle), which is a completely single-player version of the game.

I followed the steps on [this blog post](https://www.valentinog.com/blog/socket-react/#socketio-react-and-nodejs-hands-on) for getting started with Express and Socket.io.

## History

Began development on August 24, 2020

## Authors

John Daudelin
