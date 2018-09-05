import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
// import { graphQL as graphqlUri } from "../utils/constants";
// import { setContext } from 'apollo-link-context';
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

// const authLink = setContext(async () => {
//   const token = await AsyncStorage.getItem('authen_token');

//   return {
//     headers: {
//       AUTHEN_TOKEN: token ? `${token}` : null,
//     },
//   };
// });

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://shop-app-backend.herokuapp.com/graphql'
  }),
  cache
});

export default client;
