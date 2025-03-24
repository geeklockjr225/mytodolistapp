const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')



exports.register = async (req,res) => {
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({name,email,password:hashedPassword})
    res.json({message:"utilisateur cree avec succes",user})

}

exports.login = async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({where:{email}})
    if(!user || !(await bcrypt.compare(password, user.password)) ) {
        return res.status(401).json({message:"indentifiant incorrecte"})
    }
    const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET,{
        expiresIn:"24h"
    })
    res.json({token,user})
}