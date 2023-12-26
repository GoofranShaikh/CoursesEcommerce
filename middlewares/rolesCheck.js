const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET_KEY;

const checkAdminRole = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedJwt = jwt.verify(token,secret)
        console.log(decodedJwt,'role')
        if(decodedJwt.roleId !=1){  //Admin roleId is 1
            return res.status(403).json({ message: 'Forbidden', error: 'Insufficient privileges' });
        }
        next()
    }
    catch(e){
        console.log(e,'error')
        res.status(403).send('Access denied !!!')
    }
}

module.exports={checkAdminRole}