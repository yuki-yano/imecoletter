<template>
  <div id="login">
    <login-header></login-header>
    <h2>TLのイラストツイートを<br>
      表示・保存するだけ</h2>
    <h1>
      <img src="./Login/assets/title.png">
    </h1>
  </div>
</template>

<script>
/* @flow */
import LoginHeader from './Login/LoginHeader'

export default {
  name: 'login-page',
  components: {
    LoginHeader
  }
}
</script>

<style scoped>
#login {
  padding-top: 50px;
  height: 100%;
  background-color: #32adf4;
}

h1,
h2 {
  text-align: center;
}

h1 img {
  width: 234px;
  height: auto;
  margin-bottom: 1rem;
}

h2 {
  padding-top: 2rem;
  color: white;
  font-size: 1.2rem;
  line-height: 1.5rem;
}

h2,
img,
button {
  margin: 0 auto;
}

button {
  display: block;
  background-color: #fff;
  width: 80%;
  border-radius: 100px;
}
</style>
