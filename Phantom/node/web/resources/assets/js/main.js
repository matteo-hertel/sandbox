/** jshint node:true */
/** jshint esnext:true */
'use strrict';
var Vue = require("vue");

import Phantom from "./components/vue/Phantom.vue";
import Spinner from "./components/vue/Spinner.vue";
import "./Util/FormatUnicorn";

new Vue({
    el: "#vueApp",
    components: {
        Phantom,
        Spinner
    }
});
