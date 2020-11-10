import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcryptjs"


const registerUser = async(req,res)=>{

    const {name,email,password} =req.body;

    try {

        if(!name||!email||!password){
            return res.status(400).json({msg:"Please fill all fields"})
        }

       
        const user = await User.findOne({email})
    
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password,salt)
        
        const newUser = await User.create({
            name,
            email,
            password:hash_password
        })

        if(newUser){
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                token:generateToken(newUser._id)
            })
        }

    } catch (err) {
        return res.status(500).json({msg:"Internal Server Error"})
    }
}



export {registerUser}