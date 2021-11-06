import { createStore } from "vuex";
import user from "./modules/user.js";
import app from "./modules/app";
import theme from "./modules/theme";
import getters from "./getter";
import permission from './modules/permission'
export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  },
});
