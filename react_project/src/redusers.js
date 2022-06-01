export default function reducer(state, action) {
  switch (action.type) {
    case 'IS_AUTH':
      return {
        ...state,
        isAuth: action.payload
      };
    default:
      throw new Error();
  }
}