import axios from "axios";

export const update_user = async (token, id, info_user) => {
  let info_new_user = {
    user: info_user
  };
  const response = await axios({
    method: "put",
    url: `/user/${id}`,
    headers: {
      Authorization: "Bearer " + token
    },
    data: info_new_user
  });
  return response;
};

export const new_user = async () => {
  let info_new_user = {
    user: {
      email: "u@business.com",
      password: "password",
      user_name: "Luis",
      year: 1998,
      month: 4,
      day: 22
    }
  };

  const response = await axios({
    method: "post",
    url: `/users/signup`,
    data: info_new_user
  });
  localStorage.setItem("jwt", response.data.token);

  return response;
};

export const login = async (email, password) => {
  const response = await axios.post("/users/signin", {
    email: email,
    password: password
  });

  localStorage.setItem("jwt", response.data.token);
  return response;
};
