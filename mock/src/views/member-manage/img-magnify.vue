<template>
  <div class="originImgBg" v-show="vShow" @click="close()">
    <div class="box">
      <div class="img">
        <img :src="vSrc" alt="" title="点击缩小">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OriginImg",
  props: ["vSrc", "vShow"],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.originImgBg {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  .box {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .img {
      max-width: 100%;
      text-align: center;
      img {
        width: 100%;
        cursor: zoom-out;
      }
    }
  }
}
</style>
