<template>
  <div class="card-media">
    <a href="#">
      <img src="../Login/assets/hoge.png">
    </a>
  </div>
</template>

<script>
  /* @flow */
</script>

<style lang="scss" scoped>
.card-media {
  border-radius: 4px 4px 0 0;
  height: auto;
}

.card-media img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

a {
  text-decoration: none;

  &:hover {
    transition-duration: 0.3s;
    opacity: 0.7;
  }
}
</style>
