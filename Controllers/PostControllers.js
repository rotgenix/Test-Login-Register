import { PostModel } from '../Database/Models/Models.js';

//function to fetch all user posts
export const getMyPostsController = async (req, res) => {
    try {
        console.log("object")
        const userID = req.userID;
        const userPosts = await PostModel.find({ createdBy: userID });

        res.json({
            success: true,
            messsage: "User posts fetched successfully",
            userPosts
        })

    } catch (error) {
        res.json({
            success: false,
            messsage: "Server error while fetching user posts",
            userPosts
        })
    }
}

//Create post functuion
export const createPostController = async (req, res) => {
    try {
        const userID = req.userID;

        const { imgAddress, caption } = req.body;
        const createPost = await PostModel.create({
            createdBy: userID,
            imgAddress,
            caption
        });
        return res.json({
            messsage: "Post created successfully",
            createPost
        })

    } catch (error) {
        res.json({
            success: false,
            messsage: "Server error while creating Post"
        })
    }
}

//update Post function
export const updatePostController = async (req, res) => {
    try {
        const { postID, newcaption } = req.body;
        const updatedPost = await PostModel.findByIdAndUpdate({ _id: postID }, { caption: newcaption })
        res.json({
            success: true,
            messsage: "Post Updated Successfully",
        })
    } catch (error) {
        res.json({
            success: false,
            messsage: "Server While updating Post",
        })
    }
}

//delete post function
export const deletePostController = async (req, res) => {
    const { postID } = req.body;
    const deletepost = await PostModel.deleteOne({ _id: postID });
    res.json({
        messsage: "deleted"
    })
}

//like post function
export const likePostController = async (req, res) => {
    try {
        const userID = req.userID;

        const { postID } = req.body;

        const liked = await PostModel.updateOne({ _id: postID }, { $push: { likedBy: userID } });

        res.json({
            success: true,
            messsage: "Post Liked Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            messsage: "Server error while liking post"
        })
    }
}

//comment post function
export const commentPostController = async (req, res) => {
    try {
        const userID = req.userID;

        const { postID, userComment } = req.body;
        const comment = await PostModel.updateOne({ _id: postID }, {
            $push: {
                comments: {
                    commentBy: userID,
                    userComment
                }
            }
        });

        res.json({
            success: true,
            messsage: "Commented Successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            messsage: "Server error while commenting on post"
        })
    }
}
