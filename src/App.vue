<template>
  <div class="container">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar }
}
</script>

<style>
body {
  background: darkgray;
  /* background: #555; */
/*   
  background-image: url('assets/purple.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; */

  background: linear-gradient(#9198e5, #e66465);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  color: white;
}
.container {
  max-width: 560px;
  margin: 0 auto;
}
form label, form input {
  display: block;
}
form input {
  padding: 4px;
  margin-top: 10px;
  margin-bottom: 20px;
}
button {
  background: #0ec58e;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
}
</style>
