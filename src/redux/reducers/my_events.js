const my_events = (state = [], action) => {
  switch (action.type) {
    case "MY_EVENTS":
      return action.data;
    default:
      return state;
  }
};

export default my_events;
