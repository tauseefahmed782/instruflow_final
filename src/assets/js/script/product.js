import '../../../assets/css/product.scss';
import 'swiper/css';
import Swiper from 'swiper';
import 'aos/dist/aos.css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import AOS from 'aos';
import anime from 'animejs/lib/anime.es.js';

AOS.init();

document.addEventListener('DOMContentLoaded', () => {
  // Ensure the Swiper container exists
  const swiperContainer = document.querySelector('.product-swiper');
  console.log(swiperContainer,"swiperContainer");
  if (swiperContainer) {
    const swiper = new Swiper(swiperContainer, {
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
        },
      },
    });

    console.log(swiper, "swiper");

    // Set interval to slide next
    let intervalId2 = setInterval(() => {
      swiper.slideNext();
    }, 3000);

    // Get swiper wrapper and attach event listeners if it exists
    const swipeContainer2 = swiperContainer.querySelector('.swiper-wrapper');
    console.log(swipeContainer2,"swipeContainer2");
    if (swipeContainer2) {
      swipeContainer2.addEventListener('mouseenter', () => {
        clearInterval(intervalId2);
      });

      swipeContainer2.addEventListener('mouseleave', () => {
        intervalId2 = setInterval(() => {
          swiper.slideNext();
        }, 3000);
      });
    }

    // Navigation buttons: check if they exist before adding listeners
    const nextBtn = swiperContainer.querySelector('.product-swiper-button.next');
    const prevBtn = swiperContainer.querySelector('.product-swiper-button.prev');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => swiper.slideNext());
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => swiper.slidePrev());
    }
  } else {
    console.warn("Swiper container not found");
  }

  // Anime.js animations
  anime({
    targets: '.banner .detail',
    keyframes: [
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1 },
    ],
    duration: 500,
  });

  anime({
    targets: '.banner .videoBx',
    keyframes: [
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1 },
    ],
    duration: 500,
  });

  // Video box toggle class on click
  const videoBox = document.querySelector('.videoBx .video');
  if (videoBox) {
    videoBox.addEventListener('click', () => {
      document.querySelector('.videoBx').classList.toggle('active');
    });
  }

  console.log('hello');
});
