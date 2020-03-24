const created_events = (state = [], action) => {
  switch (action.type) {
    case "CREATED_EVENTS":
      console.log(action.data);
      return action.data;
    default:
      return state;
  }
};

export default created_events;
