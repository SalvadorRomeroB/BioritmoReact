const selected_event = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_EVENT":
      return action.data;
    default:
      return state;
  }
};

export default selected_event;
