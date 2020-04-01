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

export const new_event = async (token, id) => {
  let new_event = {
    business: {
      name: "event with user",
      description: "something important",
      tag: "FISICO",
      location: "my casa",
      year: 2020,
      month: 12,
      day: 31,
      owner: 9
    }
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

  console.log(data);
  return data;
};

export const update_created_events = async token => {
  let event_id = 27;
  let info_new_event = {
    business: {
      name: "Worked",
      description: "something important",
      tag: "EMOCIONAL",
      location: "my otra casa",
      year: 1998,
      month: 2,
      day: 22,
      owner: 9
    }
  };

  const putData = await axios({
    method: "put",
    url: `/businesses/${event_id}`,
    headers: {
      Authorization: "Bearer " + token
    },
    data: info_new_event
  });
  console.log(putData);
  return putData;
};
