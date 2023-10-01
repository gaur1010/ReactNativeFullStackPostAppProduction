//create post

const postModel = require("../models/postModel");

const createPostController = async (req,res) =>{
    try{
        const {title,description}= req.body
        //validation
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:'Please Provid All fields'
            })
        }
        const post =await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();
        res.status(201).send({
            success:true,
            message:'Post Created Successfully',
            post,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            message:'Error in Create Post Api',
            error
        })
    }
};

//Get All Posts

const getAllPostsController = async(req,res)=>{
    try{
        const posts = await postModel.find().populate('postedBy',"_id name")
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:"All posts Data",
            posts,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GETALLPOST API',
            error,
        })
    }

};

//get User posts
 const getUserPostsController = async (req,res) =>{
    try{
        const userPosts=await postModel.find({ postedBy:req.auth._id});
        res.status(200).send({
            success:true,
            message:"user posts",
            userPosts,
        });

    }catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in user POST API",
            error,
        });

    };
 };
 //delete post
 const deletePostController = async (req,res)=>{
    try{
        const{id}=req.params;
        await postModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            success:true,
            message:"your Post has been deleted",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in deleted post api",
            error,
        });

    }

 };
 
//Update POST
const updatePostController = async (req, res) => {
    try {
      const { title, description } = req.body;
      //post find
      const post = await postModel.findById({ _id: req.params.id });
      //validation
      if (!title || !description) {
        return res.status(500).send({
          success: false,
          message: "Please Provide post title or description",
        });
      }
      const updatedPost = await postModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title || post?.title,
          description: description || post?.description,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Post Updated Successfully",
        updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in update post api",
        error,
      });
    }
  };
module.exports = {createPostController,getAllPostsController,getUserPostsController, 
    deletePostController, updatePostController,};