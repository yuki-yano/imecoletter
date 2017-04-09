<template>
  <div class="modal fade" id="imgmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="c-modal-contents">
        <img v-if="$store.getters.modal !== null" :src="$store.getters.modal.url.base">
        <button type="button" data-dismiss="modal" aria-label="Close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* @flow */
export default {
  name: 'img-modal'
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  border-radius: 0.5rem;
}

.c-modal-contents {
  position: relative;

  button {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    right: 10px;
    top: 10px;
    color: #fff;
    text-align: center;

    &:hover {
      opacity: 0.7;
    }
  }
}

.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
