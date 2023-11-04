# nodejs-travelog-backend-api

Welcome to the Node.js Travelog Backend API repository! This backend API is designed to support the Travelog application, a platform for sharing and exploring travel experiences.

`cd nodejs-travelog-backend-api`
`npm install`
`npm start`

Since the port is set to 3000, the API will be available at *http:localhost:3000*

API Routes - (Route -> Endpoints)
`/api/auth`
*/api/auth/login*  LOGIN
*/api/auth/singup*  SINGUP

`/api/post`
*/api/post/new*  NEW POST
*/api/post/fetch*  FETCH POSTS, POSSIBLY FOR HOME PAGE
*/api/post/p/:postid*  GET SPECIFIC POST (takes postid as URL parameter)
*/api/post/updatepost*  UPDATE POST    
*/api/post/deletepost/:postid*  DELETE POST (takes postid as URL parameter)
*/api/post/addcomment*  ADD COMMENT
*/api/post/remotecomment/:cid*  REMOVE COMMENT

`/api/action`
*/api/action/follow*  FOLLOW USER
*/api/action/like*  LIKE POST





