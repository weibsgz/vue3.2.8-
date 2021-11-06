import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
import "./styles/index.scss";
import installIcons from "@/icons/index.js";
// filter
import installFilter from '@/filter'
import installDirective from '@/directives'



//路由守卫
import "./permission";

const app = createApp(App);
installElementPlus(app); //element plus
installIcons(app); //自定义导入图标
installFilter(app)
installDirective(app)
app.use(store).use(router).mount("#app");
