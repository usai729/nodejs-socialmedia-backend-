# nodejs-socialmedia-backend-api

Welcome to the Node.js Travelog Backend API repository! This backend API is designed to support the Travelog application, a platform for sharing and exploring travel experiences.

`cd nodejs-travelog-backend-api` <br>
`npm install`<br>
`npm start`<br>
<br>
Since the port is set to 3000, the API will be available at *http:localhost:3000*
<br>
API Routes - (Route -> Endpoints)<br>
`/api/auth`<br>
*/api/auth/login*  --- LOGIN<br>
*/api/auth/singup*  --- SINGUP<br>

`/api/post`<br>
*/api/post/new*   --- NEW POST<br>
*/api/post/fetch*  --- FETCH POSTS, POSSIBLY FOR HOME PAGE<br>
*/api/post/p/:postid*  --- GET SPECIFIC POST (takes postid as URL parameter)<br>
*/api/post/updatepost*  --- UPDATE POST    <br>
*/api/post/deletepost/:postid*  --- DELETE POST (takes postid as URL parameter)<br>
*/api/post/addcomment*  --- ADD COMMENT<br>
*/api/post/remotecomment/:cid*  --- REMOVE COMMENT (takes comment id as a url parameter)<br>

`/api/action`<br>
*/api/action/follow*  --- FOLLOW USER<br>
*/api/action/like*  --- LIKE POST<br>

`/api/message`<br>
*/api/message/newchat*  --- CREATE CHAT<br>
*/api/message/sendmsg*  --- SEND MESSAGE<br>
*/api/message/chats*  --- GET ALL CHATS<br>
*/api/message/c/:id*  --- GET MESSAGES AND CHAT OF A CHAT ID (id in parameter is the chat_id)







