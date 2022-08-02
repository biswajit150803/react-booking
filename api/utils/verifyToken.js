import jwt from "jsonwebtoken";
import { createError } from "./error.js";
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        // return next(createError(401,"You are not authenticated!"))
        res.status(401).json("You are not authenticated!");
        return ;
    }
    jwt.verify(token,"sdfsdf",(err,user)=>{
        if(err){
            // return next(createError(403,"Token is not valid!"))
            res.status(403).json("Token is not valid!")
            return;
        }
        req.user=user;
        next()
    })
}
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        // return next(createError(403, "You are not authorized!"))
        res.status(403).json("You are not authorized!");
        return ;
      }
    });
  };
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        // return next(createError(403, "You are not authorized!"))
        res.status(403).json("You are not authorized!");
        return ;
      }
    });
  };