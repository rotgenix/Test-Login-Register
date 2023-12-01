import express from 'express'
import { commentPostController, createPostController, deletePostController, getMyPostsController, likePostController, updatePostController } from '../Controllers/PostControllers.js';
import { checkLogin } from '../Utils/CheckLogin.js';

export const PostRoutes = express.Router();

//routes for getting my posts posts
PostRoutes.get('/myposts', checkLogin, getMyPostsController);

//route for creating post
PostRoutes.post('/createpost', checkLogin, createPostController);

//route for updating post
PostRoutes.put('/updatepost', checkLogin, updatePostController);

//route for deleting post
PostRoutes.delete('/deletepost', checkLogin, deletePostController);

//route for liking post
PostRoutes.get('/likepost', checkLogin, likePostController);

//route for commenting on post
PostRoutes.post('/commentpost', checkLogin, commentPostController);