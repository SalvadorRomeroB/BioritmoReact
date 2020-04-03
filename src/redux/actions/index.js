import {
  all_events,
  my_events,
  created_events
} from "../../components/API_Req/eventsApi";

import { login, update_user, new_user } from "../../components/API_Req/userApi";

// FALTA REVISAR IMPLEMENTACION DE ESTO, en codigo original al crear cuenta tambien entra al reducer
// de sign_in
export const sign_in = (email, password) => {
  return async dispatch => {
    try {
      const dbResult = await login(email, password);
      dispatch({
        type: "SIGN_IN",
        data: dbResult.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const register_user = info_user => {
  return async dispatch => {
    try {
      const dbResult = await new_user(info_user);
      dispatch({
        type: "REGISTER_USER",
        data: dbResult.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const put_new_user = (token, id) => {
  return async dispatch => {
    try {
      const dbResult = await update_user(token, id);
      dispatch({
        type: "UPDATE_USER",
        data: dbResult.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const get_all_events = token => {
  return async dispatch => {
    try {
      const dbResult = await all_events(token);
      dispatch({
        type: "ALL_EVENTS",
        data: dbResult.data.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const get_my_events = (token, id) => {
  return async dispatch => {
    try {
      const dbResult = await my_events(token, id);
      dispatch({
        type: "MY_EVENTS",
        data: dbResult.data.events
      });
    } catch (err) {
      throw err;
    }
  };
};

export const get_created_events = (token, id) => {
  return async dispatch => {
    try {
      const dbResult = await created_events(token, id);
      dispatch({
        type: "CREATED_EVENTS",
        data: dbResult.data.data
      });
    } catch (err) {
      throw err;
    }
  };
};

export const select_event = event => {
  return {
    type: "SELECT_EVENT",
    data: event
  };
};
