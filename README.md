## Recommendation API (MVP)

A recommendation API for a social music player system
Saves music that user has listened to, which people they follow and from there recommend some music.

Node v8.11.1
NPM v3.10.10

### API endpionts - Core
- `/follow`: POST endpoint to add a follower to a user. 
Takes request object `{to: userId, from: followerId}`

- `/listen`: POST endpoint to add a music to a users playlist. 
Takes request object `{musicId, userId}`

- `/user/:userId/recommendations`: GET endpoint to get user music recommendation
Recommendation is gotten from music user has listen to and their followers

### Run app
- `npm install`
- Create database and update config/config.js with database details
OR
- update config/config.js with database details and run `npm run createDB`
- start server, run `npm start`: creates migration, creates database seed for music and user, starts server
#### add music and follower to a user

 - While server is running, you can make API calls with any API request tool
 like Postman or Insomnia to available endpoints. (see roues/router.js)

 - To run a script that will creat user music and user follower,
 while server is running, open another terminal window and run `npm run execScript`
 or `. script.sh`.
 It will run the requests in script.sh and output the recommendations to the terminal window with CURL

 You can also view the recommendations for this user by using API request tool or
 going to `http://localhost:3005/user/1/recommendations` in your browser


### Dev

To set up dev environment:
- run `npm install`
- start PostgresQL and run `npm run createDB`
- run migration `npm run migrate`, `npm run seedDB`
- run server `nom start`

#### Test
- create test Database `npm run createTestDB`
- run test `npm test`: runs `standard --fix` and mocha test


### TODO

- Dockerize app
- Add more validation
- write more test for controllers and routes
- document routes and create API documentation