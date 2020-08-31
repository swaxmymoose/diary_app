# Diary Application

## About

This is a diary application but could also be used as a journal or modified to record meeting minuites.

The system consists of three Vagrant virtual machines.
  - NodeJS with Express webserver.
      This machine is a web server that communicates with the database machine to store and retrieve post data.
  - MongoDb database machine.
      This machine stores the post data.
  - PDF generation machine.
      This machine runs a daily cron job to generate a pdf of all posts.

## Getting Started

Follow the instructions bellow to get a copy of the project up and running on your local machine.

## Prerequisites

Download and install Virtualbox
  - <https://www.virtualbox.org/wiki/Downloads>	
  - Or use Homebrew `brew cask install virtualbox` in your MACOS terminal.

Download and install Vagrant
  - <https://www.vagrantup.com/downloads.html>
  - Or use Homebrew `brew cask install vagrant` in your MACOS terminal.

### Download and Setup Time
- ~ 1472 MB for downloads of packages/dependencies during provisioning.
- Repo 75 KB (Zipped).
- Running `vagrant up --provision` takes about 7 minutes without the xenial box file already downloaded.
- Running `vagrant up` without provisioning takes 1 ½ minutes.

### Setup & Starting

- After installing prerequisites, open up a terminal window.
- Change directory to the folder you want this project to be enclosed within.
- Then run `git clone https://github.com/swaxmymoose/diary_app.git`
- Next run `cd diary_app`
- The project is viewable and editable from this directory.
- The command `vagrant up` in terminal will run the project.
- You can now view the diary app from <http://localhost:3001>

## Development

There are two ways to develop this application:
1. SSH into the virtual machines and make chances there. e.g. `vagrant ssh webserver`
2. Develop on your own machine.

To develop on your own machine you must locally install NodeJS and MongoDB.
- NodeJS <https://nodejs.org/en/download/> or `brew install node`
- MongoDB <https://www.mongodb.com/try/download/community> or `brew install mongodb`

## Built With

- [MongoDB](https://github.com/mongodb/mongo) - Database used.
- [Express](https://github.com/expressjs/express) -Server/routing API for web app.
- [EJS](https://github.com/mde/ejs) - Javascript templating engine.
- [Node](https://github.com/nodejs/node) - Backend JS runtime.
- [Bootstrap](https://github.com/twbs/bootstrap) - Frontend framework for website elements and styling.
- [Vagrant](https://github.com/hashicorp/vagrant) - Setup and provisioning of virtual machines.
- [Ubuntu Xenial](https://kernel.ubuntu.com/git/) - Underlying VM.
