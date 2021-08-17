
'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
   const userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    console.log('userRecord.token>>>>>>>',userRecord.token);
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await users.findAll({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;






















// 'use strict';

// const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const {UsersModel} = require('./models/index');
// const basicAuth = require('./middleware/basic')
// const router = express.Router();


// router.post('/signup', async (req, res) => {
//     console.log("inside signup !!! ");
//     console.log({body: req.body})


//     try {
//         req.body.password=await bcrypt.hash(req.body.password,15);
      
//         const record=await UsersModel.create({
//             username : req.body.username,
//             password: req.body.password
//         });
//         res.status(201).json(record);
//     } catch (error) {
//         console.log(error);
//         res.status(403).send("Error Creating User");
//     }
// })

  
//   router.post('/signin', basicAuth, (req, res) => {
//     const user = req.user;
//     //return user
//     res.status(200).json(user);
//     //if i want to delete user.dataValues['password']; & return user
//     // res.status(200).json({username: username, id: user.id})
//   });
  
//   module.exports = router;


  
  
  