<template>
  <baidu-map
    class="map"
    style="display: flex; width: 100%; height: 800px; flex-direction: column"
    :center="{ lng: 116.404, lat: 39.915 }"
    :zoom="5"
    :scroll-wheel-zoom="true"
  >
    <bm-marker
      :position="{ lng: 116.404, lat: 39.915 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        content="250"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -15, height: 30 }"
      />
    </bm-marker>
    <bm-marker
      :position="{ lng: 120.21551, lat: 30.25308 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        content="310"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -15, height: 30 }"
      />
    </bm-marker>
    <bm-marker
      :position="{ lng: 106.2385, lat: 38.49246 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        content="267"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -15, height: 30 }"
      />
    </bm-marker>
    <bm-marker
      :position="{ lng: 106.55844, lat: 29.569 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        content="685"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -15, height: 30 }"
      />
    </bm-marker>
    <bm-marker
      :position="{ lng: 114.31159, lat: 30.59847 }"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        content="782"
        :labelStyle="{ color: 'red', fontSize: '24px' }"
        :offset="{ width: -15, height: 30 }"
      />
    </bm-marker>
  </baidu-map>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>
<style>
</style>