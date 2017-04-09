<template>
  <div class="login-header">
    <div class="">
    </div>
    <div class="d-flex justify-content-start align-self-center">
      <a href="#back-ground">
        制作経緯
      </a>
      <a href="#hou-to">
        使い方
      </a>
      <a href="features">
        機能説明
      </a>
      <a href="support-os">
        対応OS
      </a>
      <a href="update">
        更新内容
      </a>
      <a href="update">
        コンタクト・バグ報告等
      </a>
      <button type="button" name="button" class="tweet">
        <i class="fa fa-twitter"></i><span>ツイート</span>
      </button>
      <button type="button" name="button" class="fb">
        <i class="fa fa-thumbs-o-up"></i><span>いいね</span>
      </button>
    </div>
  </div>
</template>

<script>
/* @flow */
export default {
  name: 'login-page'
}
</script>

<style lang="scss" scoped>
.login-header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 48px;
  background-color: #32adf4;
  border-bottom: 1px solid #0d80c0;
  z-index: 1000;
  padding: 0 1rem;
}

button {
  padding: 0.2rem 0.8rem;
  color: #fff;
  border-radius: .2rem;

  .tweet {
    background-color: #1da1f2;
  }

  .fb {
    background-color: #3b5998;
  }
}

a {
  display: block;
}
</style>
