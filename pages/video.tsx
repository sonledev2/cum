import { useState, useEffect } from 'react';
import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import ReactPlayer from 'react-player';

const Video = () => {
  const [videoList, setVideoList] = useState<any>([]);

  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get('/api/video');
        setVideoList(res);
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
        {videoList?.map((item: any, index: any) => (
          <div key={index} className='w-[100%] max-h-[500px]'>
            <ReactPlayer
              url={item.url}
              width='auto'
              height='auto'
              playing={true}
              muted={true}
              controls={true}
            />
            {/* <FaTimes
                    className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                /> */}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Video;
