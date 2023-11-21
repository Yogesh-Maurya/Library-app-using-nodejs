const db = require('../routes/db-config');
const bcrypt = require("bcrypt");

const register=async(req,res)=>{
    const {email,password:Npassword}=req.body;
    if(!email||!Npassword)
        return res.json({status:"error",error:"Please Enter your email and password"});
    else{
        console.log(email);
        db.query('SELECT email FROM users WHERE email=?',[email],async(err,result)=>{
            if(err) throw err;
            if(result[0]) return res.json({status:"error",error:"Email already exists"});
            else{
                const password=await bcrypt.hash(Npassword,8);
                console.log(password);
                db.query('INSERT INTO users SET ?',{email:email,password:password},(error,results)=>{
                    if(error) throw error;
                    return res.json({status:"success",success:"User has been Registered"});
                })
            }
        })
    }
}
module.exports=register;