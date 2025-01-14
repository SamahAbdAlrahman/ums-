import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
// CURD

// register
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashPassword = bcrypt.hashSync(password, 8);
        const newUser = await UserModel.create({ name, email, password: hashPassword });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user.' });
    }
  });
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
  // login
  router.post('/login',async(req,res)=>{
    try {

    const {email,password} = req.body;
    const user = await UserModel.findOne({
    where:{email:email}
    });
    if(user == null){
    return res.status(404).json({message:"invaid email"});
    }
    const check = await bcrypt.compareSync(password,user.password);
    if(check == false){
    return res.status(400).json({message:"invalid password"});
    }

    // jwt token
    const token = jwt.sign({id:user.id,name:user.name},"secret_key")
    return res.status(200).json({message:"success",token});
  }
  catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  });
    
  // Update
  router.put('/users/:id', async (req, res) => {
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
  router.delete('/users/:id', async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const user = await UserModel.findByPk(id); 
      if (user == null) {
        return res.status(404).json({ error: 'User not found' }); 
      }
      await user.destroy(); 
      // حذف المستخدم
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete user' }); // في حال حدوث خطأ
    }
  });

  export default router;