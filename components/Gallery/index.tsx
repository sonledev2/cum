import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import '../../styles/gallery.module.scss';

interface Props {
  imageList: any;
}

const Gallery: React.FC<Props> = (props) => {
  const { imageList } = props;
  // const gallerySwiperRef: any = useRef(null);

  // const thumbnailSwiperRef: any = useRef(null);

  // const gallerySwiperParams: any = {
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // };

  // const thumbnailSwiperParams: any = {
  //   spaceBetween: 10,
  //   centeredSlides: true,
  //   slidesPerView: 'auto',
  //   touchRatio: 0.2,
  //   slideToClickedSlide: true,
  // };

  // useEffect(() => {
  //   const gallerySwiper = gallerySwiperRef.current.swiper;

  //   const thumbnailSwiper = thumbnailSwiperRef.current.swiper;

  //   if (gallerySwiper.controller && thumbnailSwiper.controller) {
  //     gallerySwiper.controller.control = thumbnailSwiper;
  //     thumbnailSwiper.controller.control = gallerySwiper;
  //   }
  // }, []);

  return (
    <div>
      {/* <Swiper {...gallerySwiperParams} ref={gallerySwiperRef}>
        {imageList?.map((item: any, index: any) => (
          <div key={index} className='w-[100%] max-h-[500px]'>
            <Image src={item.url} alt='c' width={720} height={480} />
          </div>
        ))}
      </Swiper>
      <Swiper {...thumbnailSwiperParams} ref={thumbnailSwiperRef}>
        {imageList?.map((item: any, index: any) => (
          <div key={index} className='w-[100%] max-h-[500px]'>
            <Image src={item.url} alt='c' width={720} height={480} />
          </div>
        ))}
      </Swiper> */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className='image-gallery'>
        {imageList.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Image
              src={item.url}
              alt='image'
              width={500}
              height={500}
              className='mx-auto'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
