export default {
  async contactCoach(context, payload) {
    const newRequest = {
      message: payload.message,
      userEmail: payload.email,
    };

    const response = await fetch(
      `https://vue-http-demo-cf0db-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to send contact request"
      );
      throw error;
    }

    newRequest.coachId = payload.coachId;
    newRequest.id = responseData.name;

    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    if (!context.getters.shouldUpdate) {
      return;
    }

    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-http-demo-cf0db-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch requests"
      );
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        message: responseData[key].message,
        userEmail: responseData[key].userEmail,
      };
      requests.push(request);
    }

    context.commit("setRequests", requests);
    context.commit("setFetchTimestamp");
  },
};
