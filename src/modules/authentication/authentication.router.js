import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 


const router = Router();

// register
router.post('/signup', async (req, res) => {
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
    // const token = jwt.sign({id:user.id,name:user.name},"secret_key")
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role, 
      },
      'secret_key',
      { expiresIn: '1h' }
    );
    return res.status(200).json({message:"success",token});
  }
  catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  });
  export default router;