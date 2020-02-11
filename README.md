# Team 2 Jackals | Java Project Frontend

This repository contains frontend for Java project developed during the course
**Information Systems Development in Java (ITI0203)** at TalTech.

## How to run?

Our application can be run quit quickly.
All you have to do is clone this repository and our backend repository, which can be found
[here](https://github.com/alfrol/filmsearch-back) 

Next you will have to install **Docker**. This is necessary for running the database.
Go to [Docker download page](https://hub.docker.com/?overlay=onboarding) and install it.

Next run Docker. When it gets ready, open the project root directory in your preferred terminal
and type `docker-compose up`. This will run the container with the database.

When the database is ready for connections you will probably see something like this:
*Plugin ready for connections. Socket: '/var/run/mysqld/mysqlx.sock' bind-address: '::' port: 33060*

Now you can run the backend server.

Next you need to run the frontend so that you can actually interact with the application.

Clone the frontend repository. After it is cloned simply open the project root folder in terminal and 
type `ng serve --proxy-config src/proxy.conf.json`. Now go to the http://localhost:4200/films and explore.

After you are done with exploring, stop the frontend, then stop the backend. And don't forget to stop the
Docker container. This can be done by pressing `Ctrl + C` and then typing `docker-compose down` inside the terminal.

## Developed By

* Aleksandr Aleksandrov (*alekal*)
* Anastassia Lobatšjova (*anloba*)
* Allan Šipovski (*alsipo*)
* Alexander Frolov (*alfrol*)
