<template>
  <div id="proFile">
      <nav-bar class="nav-bar">
        <div slot="center">档案</div>
      </nav-bar>
      <div class="login">
        <img src="~assets/img/profile/XH.jpg" alt="">
        <div class="text-login">点击登陆</div>
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'ProFile',
    components: {
      NavBar
    }
}
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.login {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-top: -75px;
  margin-left: -75px;
}

.login img{
  background-color: #F5F5F5;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 25px 0 25px;
  box-shadow: 0 2px 25px rgba(175, 165, 170, 0.5);
}

.text-login {
  width: 150px;
  height: 40px;
  background-color: var(--color-tint);
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  border-radius: 20px;
  margin-top: 50px;
  box-shadow: 0 2px 10px 5px rgba(255, 129, 152, 0.7);
}
</style>