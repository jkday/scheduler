# RESTful Car Appointment Scheduler


1. clone this directory: git clone https://github.com/jkday/scheduler.git
1. install node & npm
    1. Windows: https://nodejs.org/en/download/
    1. Linux: apt-get install -yqq --no-install-recommends node npm
1. install a local version of MongoDB
    1. Windows: https://www.mongodb.org/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-3.2.4-signed.msi/download
    1. Linux: sudo apt-get install -y mongodb
    1. mkdir a Mongo DB directory: mkdir -p /data/db    OR mkdir at c:\data\db
1.  Install Node dependencies
    1. cd into the working directory from step #1
    1. run: npm install
1. Start web app: npm start
    1. this will start the MongoDB server AND webserver
    1. interact with the Car Appointment app by going to a browswer at: localhost:3003
1. SPECIAL NOTE: To "GET" or retrieve an appointment use military time without any punctuation
    1. You can save an appointment for 3:30pm on 6/21/19 but you can only lookup that same appointment 
    using 1530 as a query value
1. SPECIAL NOTE #2: Dockerized version is coming by tomorrow AM

##USAGE
1. Make several appointments on the right hand side of the app
1. Query the DB using the search features on the left hand side and from the Pop-up window
1. The single update & single delete features are only found after you do a GET (top left) to reveal a previously saved appointment
    1. Add an appointment (right), then query that same appointment using the top left search feature using 
         1. the same F & L names
         1. MM/DD/YYYY date
         1. military time without punctuation: 5:30pm -> 1730
  
