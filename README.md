## App for creating, editing, deleting, displaying blogs, with registration and login for users

#

## Used Technologies 

Docker, Node.js v15.5.1(Express), MongoDB, HTML, CSS, Jquery

Node.js(express, dotenv, morgan, ejs, express-ejs-layouts, colors,  mongoose, bcrypt, connect-flash, express-session, passport, passport-local)


## LIVE DEMO 
[http://app-blogs-node.herokuapp.com/](http://app-blogs-node.herokuapp.com/)

npm init

## Start docker container
    
    sudo docker-compose up -d --build

## Enter docker container
    
    sudo docker exec -it docker-node-mongo /bin/bash
    
## Inside the container import data to database and copy photos
        
    node seeder.js -import // to delete node seeder.js -delete
        
## Start the server
    npm run dev
