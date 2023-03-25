import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Zoom from 'react-medium-image-zoom';
import Header from '@/components/Header';

const Image = () => {
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
              <img src={item.url} alt='c' className='h-auto' />
            </Zoom>
            {/* <FaTimes
                    className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                /> */}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Image;
