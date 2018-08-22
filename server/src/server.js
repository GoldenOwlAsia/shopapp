import express from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/auth';
import configs from './configs';
import graphqlHTTP  from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './modules';

const app = express();

// const schema = buildSchema(`
//   type Query {
//     user(id: Int!): Person
//     users(gender: String): [Person]
//   },
//   type Person {
//     id: Int
//     name: String
//     age: Int
//     gender: String  
//   },
//   type Mutation {
//     updateUser(id: Int!, name: String!, age: Int!): Person
//     createUser(name: String!, gender: String!, age: Int!): Person
//   }
// `);

const getUser = (args) => {
  var userID = args.id;
  return users.filter(user => {
    return user.id == userID;
  })[0];
 }

const retrieveUsers = (args) => {
  if(args.gender) {
    var gender = args.gender;
    return users.filter(user => user.gender === gender);
  } else {
    return users;
  }
 }

const updateUser = ({id, name, age}) => {
  users.map(user => {
    if(user.id === id) {
      user.name = name;
      user.age = age;
      return user;
    }
  });
  return users.filter(user=> user.id === id) [0];
}

const createUser = ({name, gender, age}) => {
  const newUser = {name, gender, age};
  users.push(newUser);

  return newUser;
}

// const root = { 
//   user: getUser,
//   users: retrieveUsers,
//   updateUser: updateUser,
//   createUser: createUser
// };

// cross origin config
app.use(cors());
app.get('/', (req, res, next) => {
  res.send('Hello!');
});

app.all('/api/*', authMiddleware);
// app.use('/api', routes);

// Create an express server and a GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') console.log('error: ', err);
  res.status(500);
  let errorMsg = 'general server error!';
  if (
    err.status === 401
    || err.status === 400
    || err.status === 409
  ) {
    res.status(err.status);
    errorMsg = err.message;
  }

  res.json({
    error: errorMsg,
  });
});

module.exports = app;
