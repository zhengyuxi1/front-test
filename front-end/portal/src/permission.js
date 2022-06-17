import router from "./router";
import { deviceDispatcher } from "./utils/deviceDispatcher";

// 设备路由分发
router.beforeEach(deviceDispatcher);
