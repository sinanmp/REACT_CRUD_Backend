const userDb = require('../models/userModel')
const jwt = require('jsonwebtoken')


exports.loginPost =async(req,res)=>{
    try {
        const {email , password} = req.body
        console.log('login worked')
        const user = await userDb.findOne({email:email})
        if(!user){
            console.log('user not exist')
            res.send('user not exist')
        }else{
            if(password == user.password){
               const token = jwt.sign({email:email,username:user.name},"jwt-secret-key",{expiresIn:'1d'})
                res.cookie('token',token)
                res.send({user:user})
            }else{
                res.send('password is not match')
            }
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}





exports.signupPost=async(req,res)=>{
    try {
        const {email , password , name} = req.body
        const exist = await userDb.findOne({email:email})
        if(exist){
            res.send('user is exist')
            return
        }else{
            const newUser = new userDb({
                email:email,
                password:password,
                name:name
            })
            await newUser.save()
            const token = jwt.sign({email:email,username:name},"jwt-secret-key",{expiresIn:'1d'})
            res.cookie('token',token)
            res.send({user:newUser})
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}



exports.verifyUser = async(req, res) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).send('Token is not available');
        } else {
            jwt.verify(token, 'jwt-secret-key', async(err, decode) => {
                if (err) {
                    console.error('Error verifying token:', err);
                    return res.status(401).send('Token is invalid');
                }
                const data = await userDb.findOne({email:decode.email})
                const user={
                    email:data.email,
                    name:data.name, 
                    imageUrl:data.imageUrl
                } 
                return res.send({ user: user, message: 'Token verified successfully' });
            });
        }
    } catch (error) {
        console.error('Error in verifyUser:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.imageUpdate=async(req,res)=>{
    try {
        const {email , imageUrl} = req.body
        console.log('worked here and ',email,imageUrl)
        await userDb.updateOne({email:email},{$set:{imageUrl:imageUrl}})
        const data = await userDb.findOne({email:email})
        const user = {
            email:data.email,
            name:data.name,
            imageUrl:data.imageUrl
        }
        res.send({success:true,user:user})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}




exports.logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
            res.status(200).json({ message: 'Logout successful' });
        } else {
            res.status(400).json({ message: 'No token found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
