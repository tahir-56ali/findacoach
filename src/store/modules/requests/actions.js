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
};
