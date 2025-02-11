import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 
import auth from "../../middleware/auth.js";

import {sendEmail} from "../../utils/sendEmail.js";
import fileUpload from "../../utils/multer.js";
import cloudinary from '../../utils/cloudinary.js';

const router = Router();
// CURD


 
   // Read(get)

   router.get('/users',
    // auth(), 
   async (req, res) => {
    try {
   const user = await UserModel.findAll();
  sendEmail()
  .then(() => console.log("Email sent successfully!"))
  .catch((err) => console.error("Error sending email:", err));

      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  });
// GET NAMES 
  router.get('/usersNames',auth(), async (req, res) => {
    try {
   const user = await UserModel.findAll({
    attributes :['name','email']
   });
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  }); 
  // Update
  router.put('/updateUser/:id',auth(), async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
  
      const user = await UserModel.findByPk(id); 
  
      if (user == null) {
        return res.status(404).json({ error: 'User not found' }); 
      }
  
      user.name = name; 
  
      await user.save(); 
      // حفظ التغييرات في قاعدة البيانات
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update user' }); 
    }
  });
  // Delete
  router.delete('/deleteUser/:id', auth(),async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await UserModel.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      await user.destroy(); 
      res.status(200).json(user);
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  
router.put('/:id',fileUpload().single('image'),async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // اذا موجود

  const {secure_url} =await cloudinary.uploader.upload(req.file.path);
  user.profilePic = secure_url;
  await user.save();
   return res.status(200).json({massage:"success"});
 });
  export default router;