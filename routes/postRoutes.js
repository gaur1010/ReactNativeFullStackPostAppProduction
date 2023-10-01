const express = require ("express");
const { requireSingIn } = require("../controllers/userController");
const { createPostController,
     getAllPostsController,
      getUserPostsController, 
      deletePostController, updatePostController } = require("../controllers/postController");


//routes object

const router = express.Router();

//create post || post 

router.post('/create-post',requireSingIn,createPostController);


//Get All Posts 

router.get('/get-all-post',getAllPostsController);


//Get user POSTs
router.get('/get-user-post', requireSingIn, getUserPostsController);


//delete post

router.delete("/delete-post/:id",requireSingIn,deletePostController);

//update post
router.put("/update-post/:id",requireSingIn, updatePostController);


//export 

module.exports = router;