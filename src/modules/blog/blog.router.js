import {Router} from 'express';
import blogModel from '../../../DB/models/blog.model.js';
import auth from "../../middleware/auth.js";
import {BlogRouter,createBlog} from './blog.controller.js';

import {asyncHandler} from "../../utils/catchError.js"
const router = Router();

router.get("/",  auth(), BlogRouter);

router.post("/", auth(), asyncHandler(createBlog));
  
export default router;
