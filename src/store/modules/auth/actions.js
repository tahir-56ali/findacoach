let timer;

export default {
  async authenticate(context, payload) {
    const formData = {
      email: payload.email,
      password: payload.password,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_Ktnzmt5QSbnIi8pg_-dn8aGZeG0mzx8";

    if (payload.mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_Ktnzmt5QSbnIi8pg_-dn8aGZeG0mzx8";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Unable to authenticate");
      throw error;
    }

    // calculate expireIn
    //const expireIn = responseData.expireIn * 1000;
    const expireIn = 5000; // for testing purpose setting expireIn for 5 seconds
    const tokenExpiration = new Date().getTime() + expireIn;

    // set local storage variables for Auto Login functionality on page refresh
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", tokenExpiration);

    // for autologout register timer
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expireIn);

    context.commit("setUser", {
      userId: responseData.localId,
      token: responseData.idToken,
    });
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      userId: null,
      token: "",
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
