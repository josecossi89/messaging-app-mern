import axios from "axios";

const instance = axios.create({
  baseURL: "https://messaging-appbackend.herokuapp.com",
});

export default instance;
