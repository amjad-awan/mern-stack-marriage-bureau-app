import API from "./GlobalSender";

export const addGroom = (url, data) => {
  console.log("data4", data)
  return API.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data', // Make sure to set the correct content type
    }});
};
export const getGrooms = (url, params) =>
  API.get(url, {
    params: params,
  });