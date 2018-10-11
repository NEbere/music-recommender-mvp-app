
# Script adds music to user1 and user2 playlist
# makes user2 a follower to user1
# Gets the recommendation for user1 based on their playlist and follower playlist

# Add music to user playlist 
printf '========= add music listened to userId: 1 and userId: 2 ========\n\n'
# user 1
curl -d '{"musicId":1, "userId": 1}' -H "Content-Type: application/json" -X POST http://localhost:3005/listen
# user 2
curl -d '{"musicId":2, "userId": 2}' -H "Content-Type: application/json" -X POST http://localhost:3005/listen

# Make user1 follow user2
printf '\n\n========= add follower to userId: 1 ========\n\n'
curl -d '{"from":2, "to": 1}' -H "Content-Type: application/json" -X POST http://localhost:3005/follow

# Get user1 music recommendation
printf '\n\n========= user recommendations for userId: 1 ========\n\n'
curl http://localhost:3005/user/1/recommendations