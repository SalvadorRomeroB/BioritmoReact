import {
  all_events,
  my_events,
  created_events
} from "../../components/API_Req/eventsApi";

import { login, update_user } from "../../components/API_Req/userApi";

// FALTA REVISAR IMPLEMENTACION DE ESTO, en codigo original al crear cuenta tambien entra al reducer
// de sign_in
export const sign_in = (email, password) => {
  return async dispatch => {
    try {
      const dbResult = await login(email, password);
      console.log(dbResult);
      dispatch({
        type: "SIGN_IN",
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
      console.log(dbResult);
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
      console.log(dbResult);
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
      console.log(dbResult);
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
      console.log(dbResult);
      dispatch({
        type: "CREATED_EVENTS",
        data: dbResult.data.data
      });
    } catch (err) {
      throw err;
    }
  };
};
