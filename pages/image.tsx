import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Zoom from 'react-medium-image-zoom';
import Header from '@/components/Header';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import Gallery from '@/components/Gallery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ImagePage = () => {
  const [imageList, setImageList] = useState<any>([]);

  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get('/api/image');
        setImageList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [isLoad]);
  return (
    <main>
      <Header isLoad={isLoad} setIsLoad={setIsLoad} />
      <div className='' style={{ columnCount: '4', columnGap: '0px' }}>
        {imageList?.map((item: any, index: any) => (
          <div key={index} className='w-[100%] max-h-[500px]'>
            <Zoom>
              <Image src={item.url} alt='c' width={720} height={480} />
            </Zoom>
          </div>
        ))}
      </div>
      {/* <div className='bg-[#f3f3f3]'> */}
      {/* <Carousel showArrows={true}>
          {imageList?.map((item: any, index: any) => (
            <div key={index} className='max-w-[500px] max-h-[500px]'>
              <Zoom>
                <Image src={item.url} alt='c' width={720} height={480} />
              </Zoom>
            </div>
          ))}
        </Carousel> */}
      {/* <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}>
          {imageList?.map((item: any, index: any) => (
            <div key={index} className='w-[100%] max-h-[500px]'>
              <SwiperSlide>
                <Image src={item.url} alt='c' width={720} height={480} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper> */}
      {/* <Gallery imageList={imageList} /> */}
      {/* </div> */}
    </main>
  );
};

export default ImagePage;
