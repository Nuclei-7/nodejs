// // Register 
// app.post('/register',(request,response,next)=>{
//   var post_data = request.body;

//   var plaint_password = post_data.password;
//   var hash_data = saltHashPassword(plaint_password);

//   var password = hash_data.passwordHash;
//   var salt = hash_data.salt;

//   var name = post_data.name;
//   var email  = post_data.email;

//   var insertJson = {
//     'email' : email,
//     'password' : password,
//     'salt' : salt,
//      'name' : name
//   };
//   var db = client.db(edmtdevnodejs);
//   // check email exist or not
//   db.collection('user')
//    .find({'email':email}).count(function(err,number){
//     if(number!=0)
//     {
//       response.json('Email already exits');
//       console.log('Email already exists');
//    }else
//    {
//     //insert data
//     db.collection('user')
//     .insertOne(insertJson,function(error,res){
//       response.json('Registration success');
//       console.log('Registration success');
//     })
//   }
// })
// });
