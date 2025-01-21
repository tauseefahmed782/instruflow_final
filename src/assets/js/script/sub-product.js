import '../style/sub-product.scss'
import "./navbar"
import 'swiper/css';
import Swiper from 'swiper';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';



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

        600: {
            slidesPerView: 2,
            spaceBetween: 25,
        }
    }


});


let intervalId2 = setInterval(() => {
    swiper.slideNext()
}, 3000)

const swipeContainer2 = document.querySelector(".product-swiper .swiper-wrapper")

swipeContainer2.addEventListener("mouseenter", () => {
    clearInterval(intervalId2)
})

swipeContainer2.addEventListener("mouseleave", () => {
    intervalId2 = setInterval(() => {
        swiper.slideNext()
    }, 3000)
})
