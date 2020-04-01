const user = (
  state = {
    day: 4,
    email: "salva@hotmail.com",
    id: 9,
    month: 8,
    user_name: "Salva",
    year: 1997
  },
  action
) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action.data);
      return {
        day: action.data.day,
        email: action.data.email,
        id: action.data.id,
        month: action.data.month,
        user_name: action.data.user_name,
        year: action.data.year
      };
    case "UPDATE_USER":
      return {
        day: action.data.day,
        email: action.data.email,
        id: action.data.id,
        month: action.data.month,
        user_name: action.data.user_name,
        year: action.data.year
      };
    default:
      return state;
  }
};

export default user;
