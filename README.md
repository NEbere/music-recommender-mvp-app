## Recommendation API (MVP)

A recommendation API for a social music player system
Saves music that user has listened to, which people they follow and from there recommend some music.

### API endpionts - Core
- `/follow`: POST endpoint to add a follower to a user. 
Takes request object `{to: userId, from: followerId}`

- `/listen`: POST endpoint to add a music to a users playlist. 
Takes request object `{musicId, userId}`

- `/user/:userId/recommendations`: GET endpoint to get user music recommendation
Recommendation is gotten from music user has listen to and their followers


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