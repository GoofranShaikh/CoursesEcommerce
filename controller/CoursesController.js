const CourseDBOperation = require('../dboperations/CoursesControllerSql');
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

module.exports={
    AddCourses,
    GetAllCourses}