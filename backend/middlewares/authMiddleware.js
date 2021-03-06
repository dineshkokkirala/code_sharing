
import jwt from "jsonwebtoken"
import User from "../models/userModel"

const protect = async(req,res)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (err) {
            return res.status(400).json({msg:"Not authorized, token failed"})
        }
    }

    if(!token){
        return res.status(401).json({msg:"No Token, Not Authorized"})
    }
}

export {protect}