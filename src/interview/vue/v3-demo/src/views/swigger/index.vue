<template>
  <div class="swiperbox">
    <swiper
      :slidesPerView="1"
      :spaceBetween="30"
      :loop="true"
      :centeredSlides="true"
      :pagination="{ clickable: true}"
      :autoplay="{ delay: 2500, disableOnInteraction: false}"
      :navigation="true"
      :modules="modules"
    >
      <swiper-slide><img  src="@/assets/image/cat.jpeg" alt="" /></swiper-slide>
      <swiper-slide><img src="@/assets/image/cat.jpeg" alt="" /></swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue' // swiper 所需组件
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'// 分页器
import 'swiper/swiper-bundle.css'
// import 'swiper/css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const modules = [Autoplay, Pagination, Navigation, A11y]
</script>
<style scoped lang="scss">
img {
    width: 100px;
    height: 100px;
} 
</style>
