const userDb = require('../models/userModel')


exports.getUserData =async(req,res)=>{
    try {
        const data = await userDb.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error,'error from try catch')
    }
}


exports.createUser=async(req,res)=>{
    try {
        const {name , email , age , password , imageUrl} = req.body
        const existData = await userDb.findOne({email:email})
        if(existData){
            res.send('user is already exist')
            return
        }
        const newUser = userDb({  
            name : name ,
            email:email,
            age : age,
            password : password,
            imageUrl:imageUrl
        })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.log(error)
        res.send(error, 'error from try catch')
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const id = req.query.id
        console.log(id)
        const result = await userDb.deleteOne({_id:id})
        console.log(result.result)
        res.send({success:true}).status(200)
    } catch (error) {
        console.log(error)
        res.send(error, 'error from try catch')
    }
}



exports.updateUser=async(req,res)=>{
    try {
        const id = req.query.id
        const {name , email , age , password , imageUrl} = req.body
        const result = await userDb.updateOne({_id : id },{$set:{name:name,email:email,age:age, password:password ,imageUrl:imageUrl}})
        res.send('user saved from the database')
    } catch (error) { 
        res.send(error, 'error from the try cathc block')
    }
}