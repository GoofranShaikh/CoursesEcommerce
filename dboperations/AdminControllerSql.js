const dbconfig = require('../dbconfig')
const sql = require('mssql')

async function CreateAdmin(request){
    try{
        let email=request.body.email;
        let username=request.body.username;
        let password=request.body.password;
        let roleId=request.body.roleId;
        let pool = await sql.connect(dbconfig);
        const executeQuery=`IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
        Begin
        Create Table users(
        userId INT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) NOT NULL,
        password NVARCHAR(50) NOT NULL,
        email NVARCHAR(255) NOT NULL Unique,
        roleId INT,
        createdAt DATETIME DEFAULT GETDATE(),
        FOREIGN KEY(roleId) REFERENCES roles(roleId)
        );
        End;
        INSERT INTO users(username,email,roleId,password) values (@username,@email,@roleId,@password)
        `
        let newUser = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('roleId', sql.Int, roleId)
        .query(executeQuery);
        return newUser.recordsets;
        
    }
    catch(error){
        console.log(error,'err');
    }
  
}

async function getAdmin(request){
    try{
        let username=request.body.username;
        let password=request.body.password;
        let sqlquery = 'SELECT * from USERS WHERE username = @username and password = @password;';
        let pool= await sql.connect(dbconfig);
        let selectedUser = await pool.request()
                          .input('username',sql.NVarChar,username)
                          .input('password',sql.NVarChar,password)
                          .query(sqlquery)
                          return selectedUser;
                          
    }
    catch(error){
        console.log(error)
    }
}

module.exports={
    CreateAdmin,
    getAdmin
}