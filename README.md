# Simple RESTful Car Appointment Scheduler


1. clone this directory: git clone https://github.com/jkday/scheduler.git
1. from a shell/command prompt with access to docker commands build the image
    1. change into the cloned directory
    1. docker build -t carappt .
1. Run the web App in docker 
    1. docker run -p 4000:3003 -e ROOT_URL=http://localhost -e MONGO_URL=mongodb://localhost:27017 -it carappt
    1. NOTE: There is a 15 sec delay embedded in the script to give the DB time to startup
    Look for the following text to know when the webapp has started:
        Public path at: /code/public
        Listening on port 3003
        Successfully connected to the database
1. Access the web App from a local browser (chrome or firefox only!) 
    1. http://localhost:4000

## USAGE
1. Make several appointments on the right hand side of the app
1. Query the DB using the search features on the left hand side and from the Pop-up window
1. The single update & single delete features are only found after you do a GET (top left) to reveal a previously saved appointment
    1. Add an appointment (right), then query that same appointment using the top left search feature using 
         1. the same F & L names
         1. MM/DD/YYYY date
         1. military time without punctuation: 5:30pm -> 1730
         
1. SPECIAL NOTE: To "GET" or retrieve an appointment use military time without any punctuation
    1. You can save an appointment for 3:30pm on 6/21/19 but you can only lookup that same appointment 
    using 1530 as a query value

  
