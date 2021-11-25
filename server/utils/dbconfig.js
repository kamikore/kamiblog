const  mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'kami',
  password : 'kami123456',
  database : 'myblog'
});

connection.connect(err =>{
  if(err) 
    throw err;
  console.log('数据库连接成功')
});

connection.query('select * from users;', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

  connection.end();