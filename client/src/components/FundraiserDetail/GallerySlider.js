import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import img1 from '../../assets/images/blog/pic1.jpg';
import img2 from '../../assets/images/blog/pic2.jpg';
import img3 from '../../assets/images/blog/pic3.jpg';
import img4 from '../../assets/images/blog/pic4.jpg';
import img5 from '../../assets/images/blog/pic2.jpg';
import img6 from '../../assets/images/blog/pic3.jpg';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const swiperFirst = [
    {image: img1},{image: img2},
    {image: img3},{image: img4},
    {image: img5},{image: img6},
];

export default function GallerySlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper 
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="fundraiser-gallery-swiper"
      >
        {swiperFirst.map((item, index)=>(
            <SwiperSlide key={index}>
                <div className="dz-media"><img src={item.image} alt="" /></div>
            </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="fundraiser-gallery-thumb"
      >
      </Swiper>
    </>
  );
}
