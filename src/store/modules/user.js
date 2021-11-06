import { login, getUserInfo } from "@/api/sys";
import md5 from "md5";
import { setItem, getItem, removeAllItem } from "../../utils/storage";
import { TOKEN } from "@/constant";
import router,{resetRouter } from "@/router";
import { setTimeStamp } from "@/utils/auth";

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || "",
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token); //存入本地缓存一份
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    login(context, userinfo) {
      console.log("userinfo", userinfo);
      const { username, password } = userinfo;
      console.log(username, password);
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((res) => {
            console.log(res);
            const data = res.token;
            this.commit("user/setToken", data);
            router.push("/");

            //保存登录时间
            setTimeStamp();

            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async getUserInfo(context) {
      const res = await getUserInfo();
      console.log('存储userInfo')
      this.commit("user/setUserInfo", res);
      return res;
    },
    logout() {

      // 清理权限相关
      resetRouter()
      //清理缓存相关
      this.commit("user/setToken", "");
      this.commit("user/setUserInfo", {});
      removeAllItem();

      
      //返回到登录页
      router.push("/login");
    },
  },
};
