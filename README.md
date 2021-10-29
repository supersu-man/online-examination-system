# online-examination-system

## Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

    
## Installation of project dependecies
cd into the project directory and 

    npm install
    
## Usage
- Start Mysql server and login to your database using Mysql client or Workbench. (make sure you have table called 'users' with column names 'username' and 'password')
- Edit resources/questions.csv file and put your own questions.
- Add your mysql credentials to server/db.js file.
- Run server/server.js.
- Run user/login.html using [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## What is happening?
- When server/server.js is started, it creates 'marks' table (if not found) or drops the old 'marks' tables and creates new one (if found).
- When user/login.html is launched using live serve, it first checks for cookies (login credentials) and validates with server.js ('users' table in mysql), if credentials match, user is taken to user/index.html else you need to login and then if server.js says you are good to go then you will be redirected to user/index.html.
- When user/index.html is accessed it will first check and validates your credentials using cookies, if something's wrong you will be taken back to login page, or if everything is good it will request server for questions and options to display them to you. 
- Everytime you move to another question the selected option is sent to server to store it in 'marks' table. 
