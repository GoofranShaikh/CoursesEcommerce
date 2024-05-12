const dbconfig = require('../dbconfig')
const sql = require('mssql')

async function CreateCourses(request){
    try{
        let description=request.body.description;
        let courseName=request.body.courseName;
        let imageLink=request.body.imageLink;
        let price =request.body.price;
        let pool = await sql.connect(dbconfig);
        const executeQuery=`IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'courses')
        Begin
        Create Table courses(
        courseId INT PRIMARY KEY IDENTITY(1,1),
        courseName NVARCHAR(50) NOT NULL,
        description NVARCHAR(255) NOT NULL,
        price INT NOT NULL,
        imageLink NVARCHAR(255),
        createdAt DATETIME DEFAULT GETDATE()
        );
        End;
        INSERT INTO courses(courseName,description,imageLink,price) values (@courseName,@description,@imageLink,@price);
        SELECT TOP(1) courseId from courses AS CreatedCourse ORDER by createdAt DESC;
        `
        let newCourse = await pool.request()
        .input('courseName', sql.NVarChar, courseName)
        .input('description', sql.NVarChar, description)
        .input('price', sql.Int, price)
        .input('imageLink', sql.NVarChar, imageLink)
        .output('courseId', sql.Int)  // Define an output parameter for courseId
        .query(executeQuery);
        console.log(newCourse,'newCourse')
        return newCourse.recordsets;
        
    }
    catch(error){
        console.log(error,'err');
    }
  
}

async function GetCourses(){
    try{
    const pool = await sql.connect(dbconfig);
    let sp = 'GetCourses';
    let courses=await pool.request().execute(sp)
    return courses.recordsets[0];
    }
    catch(e){
        return e
    }

}

module.exports={
    CreateCourses,
    GetCourses
}