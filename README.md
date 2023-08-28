# Multi-Player Boggle Web App

## Description

A multiplayer Boggle game created in React.

## Play

The game is hosted [here](http://jdboggle.com). You can also follow the sections below to setup and run the app locally.

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

NOTE: If you see compilation errors, check that you are running on Node 14.

## Deploying changes

If you want to deploy a change to the currently running application on [jdboggle.com](http://jdboggle.com), login to the AWS console, SSH into the EC2 instance on which the web app is running, and run the following terminal commands to restart the Express app with the latest changes from the master branch of this repo:

```console
screen -r
```

Hit Ctrl+C to stop the express app.

```console
cd client
git pull
npm run build
cd ..
NODE_ENV=production npm start
```

The latest changes should immediately be deployed to [jdboggle.com](http://jdboggle.com).

## Initial AWS EC2 Setup

Boot up a free tier, Amazon Linux AMI EC2 with the following user data:

```
#!/bin/bash
sudo yum install -y git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 14
sudo yum install -y nodejs #Needed for using npm
```

Make sure you modify the Security Group that is added to allow inbound traffic to port 4001 from all IP addresses.

Create a Load Balancer that routes incoming traffic on port 80 and 443 to port 4001 on your EC2 instance (to do this, you will need to create a target group as well and attach a single target of your created EC2 instance, specifying HTTP as the protocol for the target group and 4001 as the port for the target/EC2 instance).

Once your EC2 instance is running, ssh into it and run the following commands:

```
cd ~
git clone https://github.com/johndaudelin/react-boggle-multiplayer.git
cd react-boggle-multiplayer
npm install
cd /client
npm install
npm run build
cd ..
screen
NODE_ENV=production npm start
```

If you have a Route 53 domain you want to route traffic from, create an Alias record set on the R53 domain that routes to the load balancer you created. Configure the PROD_SERVER url in client/src/constants.js to match your domain record URL. Voila! Navigating to your Route 53 domain URL should bring you to the web server hosted Boggle game.

## Code

The client application code was taken initially from my previous project, [react-boggle](https://github.com/Cowboy46/react-boggle), which is a completely single-player version of the game.

I followed the steps on [this blog post](https://www.valentinog.com/blog/socket-react/#socketio-react-and-nodejs-hands-on) for getting started with Express and Socket.io.

## Improvement Ideas

- Add .env file logic for easy dev vs. prod configuring.

## History

Began development on August 24, 2020

## Authors

John Daudelin
