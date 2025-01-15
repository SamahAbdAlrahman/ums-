import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 
import jwt from 'jsonwebtoken';


const router = Router();
// CURD


 
   // Read(get)

   router.get('/users', async (req, res) => {
    try {
   const user = await UserModel.findAll();
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  });
// GET NAMES 
  router.get('/usersNames', async (req, res) => {
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
  router.put('/updateUser/:id', async (req, res) => {
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
      res.status(500).json({ error: 'Failed to update user' }); // في حال حدوث خطأ
    }
  });
  // Delete
  router.delete('/deleteUser/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const token = req.headers['token'];
      
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
           
      const decoded = jwt.verify(token, 'secret_key');
      console.log("Decoded token:", decoded); //  محتويات التوكين
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
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
  

  export default router;