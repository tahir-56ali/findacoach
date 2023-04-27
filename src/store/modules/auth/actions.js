let timer;

export default {
  async authenticate(context, payload) {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_Ktnzmt5QSbnIi8pg_-dn8aGZeG0mzx8";

    if (payload.mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_Ktnzmt5QSbnIi8pg_-dn8aGZeG0mzx8";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Unable to authenticate");
      throw error;
    }

    // calculate expiresIn
    const expiresIn = responseData.expiresIn * 1000;
    //const expiresIn = 5000; // for testing purpose setting expiresIn for 5 seconds
    const tokenExpiration = new Date().getTime() + expiresIn;

    // set local storage variables for Auto Login functionality on page refresh
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", tokenExpiration);

    // for autologout register timer
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

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
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    // renew timer
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: token,
      userId: userId,
    });
  },
};
