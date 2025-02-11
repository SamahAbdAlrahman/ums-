
import jwt from 'jsonwebtoken';

const auth=()=>{
    return (req,res,next) => {
  const {token} = req.headers;
      
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
           
      const decoded = jwt.verify(token, 'secret_key');

      console.log("Decoded token:", decoded); //  محتويات التوكين
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.id = decoded.id;
      next();
}
    }
export default auth;