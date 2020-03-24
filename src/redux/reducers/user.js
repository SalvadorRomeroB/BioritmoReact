const user = (
  state = {
    day: 22,
    email: "user5@business.com",
    id: 8,
    month: 4,
    user_name: "Jaquez",
    year: 1998
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
