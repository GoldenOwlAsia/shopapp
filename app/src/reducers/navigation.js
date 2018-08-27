import Navigator from '../navigation';
const initialState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams("Auth")
);
const navigation = (state = initialState, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

export default navigation;
