import express from 'express';
import cors from 'cors';
import authMiddleware from './middlewares/auth';
import configs from './configs';
import graphqlHTTP  from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './modules';
import bodyParser from 'body-parser';
import path from 'path'

const app = express();
// cross origin config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb'}));
app.get('/', (req, res, next) => {
  res.send('Hello!');
});

app.use(express.static(path.join(__dirname, '../public')))

// Create an express server and a GraphQL endpoint
app.use('/graphql', authMiddleware, graphqlHTTP({
  schema: schema,
  graphiql: true
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
