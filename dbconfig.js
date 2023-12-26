const  config = {
    server: '127.0.0.1', // Replace with your SQL Server instance name
    database: 'CourseWebsite',
    port:1433,
    user: 'Goofy', // Replace with your SQL Server username
    password: 'Goofina@98', // Replace with your SQL Server password
    options: {
      trustedConnection: true, // Use Windows Authentication
      encrypt: false,
       trustServerCertificate: true, // Allow self-signed certificates
    },
  }
    module.exports = config;