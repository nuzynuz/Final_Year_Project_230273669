import client from "./client";

const endpoint = "/advance";

const getAdvanceList = (loginId) => client.get(`${endpoint}/${loginId}`);

const requestAdvance = (amount, comment, loginId) =>
  client.post(endpoint, {
    reqestedAmount: amount,
    comment: comment,
    loginId: loginId,
  });

export default {
  getAdvanceList,
  requestAdvance,
};
