// import {
//   AUTH_SUCCESS,
//   AUTH_FAIL,
// } from '../actions/types';

// const INITIAL_STATE = {
//   token: null,
// };

//  const Auth = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
// 		case AUTH_SUCCESS:
//       return state;
// 		case AUTH_FAIL:
//       return state;
// 		default:
//       return state;
//   }
// }
// export default Auth;

const initialState = {
  isLoggedIn: false,
  username: '',
  password: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case 'LOGIN': 
          // return Object.assign({}, state, { 
          //     isLoggedIn: true,
          //     username: action.username,
          //     password: action.password
          // });
          return { ...state, isLoggedIn: true, username: action.username, password: action.password }
      case 'LOGOUT':
          // return Object.assign({}, state, { 
          //     isLoggedIn: false,
          //     username: '',
          //     password: ''
          // });
          return { ...state, isLoggedIn: false, username: '', password: '' }
      default:
          return state;
  }
}