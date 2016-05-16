/** jshint node:true */
/** jshint esnext:true */

<template>
    <h1>Your connection component!</h1>
    <button @click="connect()">Connect</button>
    <button v-show="connected" @click="send()">Send</button>
    <p class="{{connectionClass}}">
        {{connectionStatus}}
    </p>
<pre>
    {{items | json}}
</pre>

{{$data | json}}
</template>

<script>
import Pahntom from "./js/Phantom.js";

export default Pahntom;
</script>

<style></style>
