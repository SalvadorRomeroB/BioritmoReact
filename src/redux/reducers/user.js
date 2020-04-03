const user = (
  state = {
    day: 22,
    email: "user@gmail.com",
    id: 14,
    month: 4,
    user_name: "userTest",
    year: 1998,
    image: ""
  },
  action
) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        day: action.data.day,
        email: action.data.email,
        id: action.data.id,
        month: action.data.month,
        user_name: action.data.user_name,
        year: action.data.year,
        image: action.data.image
      };
    case "UPDATE_USER":
      return {
        day: action.data.day,
        email: action.data.email,
        id: action.data.id,
        month: action.data.month,
        user_name: action.data.user_name,
        year: action.data.year,
        image: action.data.image
      };
    case "REGISTER_USER":
      return {
        day: action.data.day,
        email: action.data.email,
        id: action.data.id,
        month: action.data.month,
        user_name: action.data.user_name,
        year: action.data.year,
        image: action.data.image
      };
    default:
      return state;
  }
};

export default user;
