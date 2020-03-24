export const sign_in = user => {
  return {
    type: "SIGN_IN",
    data: user
  };
};

export const put_new_user = user => {
  return {
    type: "UPDATE_USER",
    data: user
  };
};

export const get_all_events = events => {
  return {
    type: "ALL_EVENTS",
    data: events
  };
};

export const get_my_events = events => {
  return {
    type: "MY_EVENTS",
    data: events
  };
};

export const post_new_event = events => {
  return {
    type: "MY_EVENTS",
    data: events
  };
};
