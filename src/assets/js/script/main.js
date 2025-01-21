import '../style/style.scss'

import Swiper from 'swiper';
import "./navbar"
import 'swiper/css';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import "aos/dist/aos.css"
import AOS from "aos"

AOS.init()

const swiper = new Swiper('.product-swiper', {
  loop: true,
  navigation: {
    nextEl: '.product-swiper-button.next',
    prevEl: '.product-swiper-button.prev',
  },
  slidesPerView: 1,
  spaceBetween: 25,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },

  modules: [Navigation, Pagination],
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 25,
    },

    600 : {
    slidesPerView: 2,
    spaceBetween: 25,
    }
  }


});


let intervalId2 = setInterval(() => {
  swiper.slideNext()
},3000)

const swipeContainer2 = document.querySelector(".product-swiper .swiper-wrapper")

swipeContainer2.addEventListener("mouseenter", () => {
  clearInterval(intervalId2)
})

swipeContainer2.addEventListener("mouseleave", () => {
  intervalId2 = setInterval(() => {
    swiper.slideNext()
  },3000)
})



document.querySelector(".product-swiper-button.next").addEventListener("click", () => swiper.slideNext())
document.querySelector(".product-swiper-button.prev").addEventListener("click", () => swiper.slidePrev())




const tSwiper = new Swiper('.tswiper', {
  loop: true,
  navigation: {
    nextEl: '.tswiper-button.next',
    prevEl: '.tswiper-button.prev',
  },
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },

    820: {
    slidesPerView: 3,
    spaceBetween: 10,
    },

    550: {
      slidesPerView: 2,
      spaceBetween: 10,
    }
  }


});


let intervalId = setInterval(() => {
  tSwiper.slideNext()
},3000)

const swipeContainer = document.querySelector(".tswiper .swiper-wrapper ")

swipeContainer.addEventListener("mouseenter", () => {
  clearInterval(intervalId)
})

swipeContainer.addEventListener("mouseleave", () => {
  intervalId = setInterval(() => {
    tSwiper.slideNext()
  },3000)
})



document.querySelector(".tswiper-button.next").addEventListener("click", () => tSwiper.slideNext())
document.querySelector(".tswiper-button.prev").addEventListener("click", () => tSwiper.slidePrev())
