import { ConnectionDB } from "../DB/connection.js";  
import userRouter from './modules/user/user.router.js';  
import authRouter from './modules/auth/auth.router.js'; 
import blogRouter from './modules/blog/blog.router.js';  

const initApp = (app, express) => {
    ConnectionDB(); 
app.use(express.json());  
  app.use('/users', userRouter); 
  app.use('/auth', authRouter); 
  app.use('/blog', blogRouter);
};

export default initApp;