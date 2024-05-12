const AdminDbOperation = require('../dboperations/AdminControllerSql');
const jwt = require('jsonwebtoken');
const qr = require('qrcode');
const dotenv = require('dotenv');
dotenv.config();
const sectrateKey = process.env.SECRET_KEY 
const getAdminDetails=async(req,res)=>{
    try{      
        let user = await AdminDbOperation.getAdmin(req);
        if(user.recordsets?.[0]?.length>0){
            console.log(user.recordsets[0]?.[0],'user')
            const payload={
                userId:user.recordsets[0]?.[0]?.userId,
                username:user.recordsets[0]?.[0]?.username,
                roleId:user.recordsets[0]?.[0]?.roleId
            }
            console.log(payload,'pay')
        // Options for the JWT
            const options = {
                expiresIn: '1h', // Token expiration time
            };

            let token = jwt.sign(payload,sectrateKey,options)
            res.status(200).json({...user.recordsets?.[0][0],token})

        }
        else{
            console.log('no content')
            res.status(204).json({message:'No Content'})
        }
    }
    catch(error){
        res.status(500).send(error)
    }
}

const AddAdmin=async(req,res)=>{
    let createdUser = await AdminDbOperation.CreateAdmin(req);
    res.status(200).json(createdUser);
}

const generateQr = async(req,res)=>{
    try {
        const address = req.body.address; // You can get the address from the request query
    
        // Generate QR code
        const qrCode = await qr.toDataURL(address);
        console.log(qrCode,'qrCode')
        // Send the QR code image as a response
        res.send(`<img src="${qrCode}" alt="QR Code"/>`);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

module.exports={
    getAdminDetails,
    AddAdmin,
    generateQr
};