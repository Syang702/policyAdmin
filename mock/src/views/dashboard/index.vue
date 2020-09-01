<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <!-- @handleSetLineChartData="handleSetLineChartData" -->
    <panel-group />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanelGroup from "./components/PanelGroup";
export default {
  components: {
    PanelGroup
  },
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    // margin: 30px;
  }
  &-text {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background-color: #54bcf0;
    height: 60px;
    color: #ffffff;
    font-size: 24px;

    line-height: 60px;
    font-weight: bold;
    letter-spacing: 8px;
  }
}
</style>
