/** jshint node:true */
/** jshint esnext:true */

<template>
    <h1>Your connection component!</h1>
    <button @click="connect()">Connect</button>
    <button v-show="connected" @click="send()">Send</button>
    <p class="{{connectionClass}}">
        {{connectionStatus}}
    </p>
<spinner></spinner>
<div class="col-md-6">
    Started {{started.length}}
    <div v-for="start in started">
   {{ start }}
 </div>
</div>
<div class="col-md-6">
    Completed {{completed.length}}
    <div v-for="complete in completed">
   {{ complete }}
 </div>
</div>
</div>

</template>

<script>
import Pahntom from "./js/Phantom.js";

export default Pahntom;
</script>

<style></style>
