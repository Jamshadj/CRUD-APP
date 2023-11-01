import axiosInstance from "./axiosInstance";

export const postSignup = (data) => {
    console.log(data);
    return axiosInstance().post('/user/signup', data); 
  };
  

  export const postLogin = (data) => {
    console.log("data",data);
    return axiosInstance().post('/user/login', data); 
  };
  
  export const getdata = (userId) => {
    console.log(userId, "user");
    return axiosInstance().get(`/user/tasks/${userId}`);
  };

  export const editdata = (id,data) => {
    return axiosInstance().put(`/user/tasks/${id}`,data);
  };

  export const deleteData = (id,data) => {
    return axiosInstance().delete(`/user/tasks/${id}`,data);
  };