import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import img1 from "../../assets/images/blog/pic1.jpg";
import img2 from "../../assets/images/blog/pic2.jpg";
import img3 from "../../assets/images/blog/pic3.jpg";
import img4 from "../../assets/images/blog/pic4.jpg";
import img5 from "../../assets/images/blog/pic2.jpg";
import img6 from "../../assets/images/blog/pic3.jpg";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function GallerySlider({ image }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // const swiperFirst = [
  //   { image: imageURL1 },
  //   { image: imageURL2 },
  //   { image: imageURL3 },
  // ];
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="fundraiser-gallery-swiper"
      >
        {image.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="dz-media">
              <img
                style={{ height: "368px", objectFit: "cover" }}
                src={item.url}
                alt=""
              />
            </div>
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
      ></Swiper>
    </>
  );
}
