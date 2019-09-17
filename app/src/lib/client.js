import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
// import { graphQL as graphqlUri } from "../utils/constants";
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';


// async function getToken() {
//   try {
//     const authen_token = await AsyncStorage.getItem('authen_token');
//     return authen_token;
//   } catch (error) {
//     console.log(`Something went wrong with the AsyncStorage: ${error.messages}`);
//     return null;
//   }
// }

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem('authToken');

  return {
    headers: {
      'x-auth-token': token ? `${token}` : null,
    },
  };
});

console.log('TCL: process.env.SERVER_HOST_DEV', process.env.SERVER_HOST_DEV);

const httpLink = createHttpLink({
  // uri: 'https://shop-app-backend.herokuapp.com/graphql'
  // uri: 'http://192.168.56.1:3001/graphql'
  uri: 'http://localhost:3001/graphql'
})

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;
