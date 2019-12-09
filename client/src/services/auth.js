import axios from "axios";

const signup = (username, password, imageUrl) => {
  return axios
    .post("/api/auth/signup", {
      username: username,
      password: password,
      imageUrl: imageUrl
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  axios.delete("/api/auth/logout");
};

export { signup, login, logout };
