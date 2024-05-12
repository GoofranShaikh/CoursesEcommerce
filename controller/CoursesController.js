const Razorpay= require('razorpay');
const dotenv = require('dotenv').config();

const CourseDBOperation = require('../dboperations/CoursesControllerSql');

const razorpay =new Razorpay({
    key_id: process.env.key_id,
    key_secret:process.env.key_secret
})

const AddCourses =async(req,res)=>{
    try{
        let createdCourse=await CourseDBOperation.CreateCourses(req);
        // const courseId = createdCourse.recordsets[0].courseId;
        console.log(createdCourse,'createdCourse')

        return res.status(201).json(
            {
                ...createdCourse[0]?.[0],
                message:"Course Created Successfully"
            }
            
            )
    }
    catch(e){
        console.log(e,'error')
    }

}

const GetAllCourses =async(req,res)=>{
    try{
        let courses =await  CourseDBOperation?.GetCourses();
        return res.status(200).json(courses);
    }
    catch(e){
       return res.status(500).send(e);
    }
}

const CreateOrder = async(req,res)=>{
    try{
        const options = {
            amount: req.body.amount, // amount in paisa (10 INR)
            currency: 'INR',
            receipt: 'order_1',
            payment_capture: 1,
          };
        
          razorpay.orders.create(options, (err, order) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json(order);
          });
    }
    catch(e){
        res.json({message:'Something went wrong'})
    }
}

module.exports={
    AddCourses,
    GetAllCourses,
    CreateOrder
}