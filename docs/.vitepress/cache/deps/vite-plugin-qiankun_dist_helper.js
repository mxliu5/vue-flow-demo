import {
  __commonJS
} from "./chunk-EWTE5DHJ.js";

// node_modules/vite-plugin-qiankun/dist/helper.js
var require_helper = __commonJS({
  "node_modules/vite-plugin-qiankun/dist/helper.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var qiankunWindow = typeof window !== "undefined" ? window.proxy || window : {};
    var renderWithQiankun = function(qiankunLifeCycle) {
      if (qiankunWindow === null || qiankunWindow === void 0 ? void 0 : qiankunWindow.__POWERED_BY_QIANKUN__) {
        if (!window.moudleQiankunAppLifeCycles) {
          window.moudleQiankunAppLifeCycles = {};
        }
        if (qiankunWindow.qiankunName) {
          window.moudleQiankunAppLifeCycles[qiankunWindow.qiankunName] = qiankunLifeCycle;
        }
      }
    };
    exports.default = renderWithQiankun;
    exports.qiankunWindow = qiankunWindow;
    exports.renderWithQiankun = renderWithQiankun;
  }
});
export default require_helper();
/*! Bundled license information:

vite-plugin-qiankun/dist/helper.js:
  (*!
   * vite-plugin-qiankun.js v1.0.14
   * (c) 2021-2022 Teng Mao Qing
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=vite-plugin-qiankun_dist_helper.js.map
