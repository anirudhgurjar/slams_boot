

<template>
  <div id="app">     
     <router-view name="header"/> 
    <div>
      <router-view/>
    </div>
    <!-- <router-view name="footer"/> -->
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {};
</script>
