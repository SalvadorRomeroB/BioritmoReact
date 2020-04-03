const all_events = (state = [], action) => {
  switch (action.type) {
    case "ALL_EVENTS":
      return action.data;
    default:
      return state;
  }
};

export default all_events;
