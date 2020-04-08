import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post("/users/signin", {
    email: email,
    password: password,
  });
  return response;
};

export const authenticate = (response, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", response.data.token);
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return true;
  } else {
    return false;
  }
};
