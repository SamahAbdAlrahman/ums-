import blogModel from '../../../DB/models/blog.model.js';
import {UserModel} from "../../../DB/models/users.js";
export const BlogRouter =async (req, res) => {
    try {
      const blogs = await blogModel.findAll({
          attributes: ['id','title'],
          include:{
              model: UserModel,
              attributes: ['id','name'],
          }
    
      });
      return res.status(200).json({ message: "success", blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);  // طباعة التفاصيل في السيرفر
        return res.status(500).json({ message: "Error fetching blogs", error: error.message });
      }
  }

  export const createBlog =async (req, res) => {
    try {
        // return res.status(200).json(req.id);
      const { title, description } = req.body;  
      const blog = await blogModel.create({ title, description ,UserId:req.id});
  
      return res.status(201).json({ message: "Blog created successfully", blog });

    } catch (error) {

      console.error("Error creating blog:", error);
      return res.status(500).json({ message: "Error creating blog", error: error.message });
    }
  }