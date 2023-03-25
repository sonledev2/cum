import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const List = () => {
  const [hasWindow, setHasWindow] = useState(false);
  const [imageList, setImageList] = useState<any>([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axiosClient.get('/api/post');
        setImageList(res);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [isLoad]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className='h-[100vh] bg-[#f4f4f4]'>
      <Header isLoad={isLoad} setIsLoad={setIsLoad} />
      <div className='w-[800px] h-full mx-auto mt-10 bg-[white] rounded-[5px]'>
        List
        <div className='grid grid-cols-3'>
          {hasWindow &&
            imageList?.map((item: any, index: any) =>
              item.type === 'image' ? (
                <div key={index} className=' flex w-full max-h-[200px]'>
                  <div className='flex items-center mb-4'>
                    <input
                      id='default-checkbox'
                      type='checkbox'
                      value=''
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='default-checkbox'
                      className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Default checkbox
                    </label>
                  </div>
                  <img src={item.url} alt='c' className='object-cover' />
                  <div>{item.type}</div>
                  {/* <FaTimes
                        className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                      /> */}
                </div>
              ) : (
                <div key={index} className='flex  max-w-[250px]'>
                  <div className='flex items-center mb-4'>
                    <input
                      id='default-checkbox'
                      type='checkbox'
                      value=''
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='default-checkbox'
                      className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Default checkbox
                    </label>
                  </div>
                  <ReactPlayer
                    url={item.url}
                    width='auto'
                    height='auto'
                    playing={false}
                    muted={true}
                    controls={true}
                  />
                  {/* <FaTimes
                        className='absolute top-0 right-[0px] text-[20px] z-100 cursor-pointer'
                      /> */}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default List;
