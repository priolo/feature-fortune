import authApi from "../../api/auth-wwOaw6e6.js";
import authEmailApi from "../../api/authEmail-CwM2yjmB.js";
import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { loadStripe } from "../../node_modules/@stripe/stripe-js/dist/index-BEp7jI43.js";
const stripePromise = loadStripe("pk_test_51SOd0bKPMA8alJnoLWJCL5XxjiQBcsQaX3Q92zQ0rd3rdI5xfyrF0xSwONthxR4UE8MtDr6LpuBRTmmKtOtchl2L00zCn9oLYv");
const setup = {
  state: {
    token: null,
    user: null,
    clientSecret: null
  },
  getters: {},
  actions: {
    /**
     * Chiamato allo startup dell'app
     */
    current: async (_, store) => {
      var _a;
      if (!!store.state.user) return;
      let user = null;
      try {
        user = (_a = await authApi.current()) == null ? void 0 : _a.user;
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
      store.setUser(user);
    },
    /**
     * Invia il codice di verifica all'email specificata
     */
    emailSendCode: async (email, store) => {
      await authEmailApi.emailSendCode(email);
    },
    emailVerifyCode: async (code, store) => {
      var _a;
      const user = (_a = await authEmailApi.emailVerify(code)) == null ? void 0 : _a.user;
      store.setUser(user);
    },
    loginWithGithub: async (_, store) => {
      const res = await authApi.githubLoginUrl();
      window.location.href = `${res.url}&prompt=select_account`;
    },
    attachGithub: async (_, store) => {
      const res = await authApi.githubAttachUrl();
      window.location.href = `${res.url}&prompt=select_account`;
    },
    detachGithub: async (_, store) => {
      await authApi.githubDetach();
      store.setUser({
        ...store.state.user,
        githubId: null
      });
    },
    loginWithGoogle: async (token, store) => {
      var _a;
      let user = null;
      try {
        user = (_a = await authApi.loginGoogle(token)) == null ? void 0 : _a.user;
      } catch (error) {
        console.error("Error fetching current user:", error);
        return;
      }
      console.log("User data:", user);
      authSo.setUser(user);
    },
    /** 
     * attacca un account GOOGLE all'ACCOUNT attualmente loggato 
     */
    attachGoogle: async (token, store) => {
      const res = await authApi.googleAttach(token);
      const user = res.user;
      console.log(user);
      store.setUser({
        ...store.state.user,
        googleEmail: user.googleEmail
      });
    },
    detachGoogle: async (_, store) => {
      await authApi.googleDetach();
      store.setUser({
        ...store.state.user,
        googleEmail: null
      });
    },
    logout: async (_, store) => {
      store.setUser(null);
      await authApi.logout();
    }
  },
  mutators: {
    setUser: (user) => ({ user }),
    setClientSecret: (clientSecret) => ({ clientSecret })
  }
};
const authSo = bn(setup);
export {
  authSo as default,
  stripePromise
};
//# sourceMappingURL=repo-BpuRYfKE.js.map
