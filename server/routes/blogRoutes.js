import express from "express";
import fetchUser from "../middleware/fetchUser.js";
import blogModel from "../models/blogModel.js";
import multer from "multer";
import path from 'path';
import * as fs from 'fs';

const __dirname = path.resolve();

const router = express.Router();

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname +'/uploads'));
    }
});

const upload = multer({storage: storage});

//Get All Blogs
router.get("/blogs", fetchUser ,async(req,res)=>{
    try {
        const blogs = await blogModel.find({});
        return res.json(blogs);
    } catch (error) {
        return res.status(404).json({message : "An error Occurred"});        
    }
})

//Get specific user's blog
router.get("/myblogs", fetchUser ,async(req,res)=>{
    try {
        const blogs = await blogModel.find({user : req.user.id});
        return res.json(blogs);
    } catch (error) {
        return res.status(404).json({message : "An error Occurred"});        
    }
})

//Specifc blog

router.get("/getBlog/:id", fetchUser ,async(req,res)=>{
    try {
        const blog = await blogModel.findById(req.params.id);
        return res.json(blog);
    } catch (error) {
        return res.status(404).json({message : "An error Occurred"});        
    }
})

//Create Blog
router.post("/createBlog",fetchUser,upload.single('coverImage'),async(req,res)=>{
    try {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);

        const {title, desc, cover} = req.body;
        const postDoc = await blogModel.create({
            title,
            desc,
            cover,
            coverImage : req.file.filename+".png",
            user : req.user.id,
          });
        
          res.json(postDoc);
    } catch (error) {
        return res.status(404).json({message : "An error Occurred"});        
    }
})

//Edit Blogs

router.put("/updateBlog/:id",fetchUser, async(req,res)=>{
    try {
        const {title, desc, cover} = req.body;

        const newBlog = {};

        if(title){
            newBlog.title = title;
        }

        if(desc){
            newBlog.desc = desc;
        }

        if(cover){
            newBlog.cover = cover;
        }

        let blog = await blogModel.findById(req.params.id);

        if(!blog){
            return res.status(404).send("Not Found") 
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await blogModel.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
        res.json(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");      
    }
})

router.put("/like", fetchUser, (req,res) => {
    blogModel.findByIdAndUpdate(req.params.id, {
        $push : {likes:req.user._id}
    },{new : true}).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    })
})

//Delete Blog
router.delete('/deleteBlog/:id', fetchUser, async (req, res) => {
    try {
        // Find the blog to be delete and delete it
        let blog = await blogModel.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this blog
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await blogModel.findByIdAndDelete(req.params.id)
        res.json({ "Success": "blog has been deleted", blog: blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

export default router;