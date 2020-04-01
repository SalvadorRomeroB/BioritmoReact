import axios from "axios";

export const all_events = async token => {
  const data = axios.get("/businesses", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return data;
};

export const my_events = async (token, id) => {
  const data = axios.get(`/user/businesses/${id}`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return data;
};

export const new_event = async (token, id, event) => {
  let new_event = {
    business: event
  };
  const postData = await axios({
    method: "post",
    url: `/businesses/create/${id}`,
    headers: {
      Authorization: "Bearer " + token
    },
    data: new_event
  });
  return postData;
};

export const add_my_events = async (token, user_id, event_id) => {
  const postData = await axios({
    method: "post",
    url: `/businesses/add/${user_id}/${event_id}`,
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return postData;
};

export const created_events = async (token, id) => {
  const data = await axios.get(`/user/businesses/owner/${id}`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return data;
};

export const update_created_events = async (token, event_id, event) => {
  let info_new_event = {
    business: event
  };

  const putData = await axios({
    method: "put",
    url: `/businesses/${event_id}`,
    headers: {
      Authorization: "Bearer " + token
    },
    data: info_new_event
  });
  return putData;
};
