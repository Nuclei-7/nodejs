// app.post('/login',async (request,response,next)=>{
//   var post_data  =request.body;

//   var email = post_data.email;
//    var userPassword  =post_data.password;

//    const db = await dbConnect();
//    // check email exists
//    db.collection('user')
//    .find({'email':email}).count(function(err,number){
//     if(number==0){
//       response.json('email not exits');
//       console.log('email not exists');
//     }
//     else{
//       // insert data
//       db.collection('user')
//       .findOne({'email':email},function(err,user){
//         var encrypted_password = user.password; // Get password from user
//         if(userPassword == encrypted_password ){
//           response.json('Login successful');
//           console.log('Login successful');
//         }
//         else{
//           response.json('wrong password');
//           console.log('wrong password');
//             }
//         })
//       }
//    })
// });
