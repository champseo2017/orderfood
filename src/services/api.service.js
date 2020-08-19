import axios from "axios";

export const getAdminPageCheck = (jwtToken, csrfToken, url) => {
  return axios({
    method: "get",
    url: `${process.env.ENDPOINT}/${url}`,
    headers: {
      Authorization: jwtToken,
      "CSRF-Token": csrfToken,
    },
  })
    .then((res) => {
      const { message } = res.data;
      return message
    })
    .catch((err) => {
      if (err) {
       return err.response.data
      }
    });
};
