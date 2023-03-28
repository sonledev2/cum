import axiosClient from '@/api/axiosClient';
import Header from '@/components/Header';
import { log } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';

const List = () => {
  const [hasWindow, setHasWindow] = useState(false);
  const [imageList, setImageList] = useState<any>([]);
  const [checkList, setCheckList] = useState<any>([]);
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

  const handleDeletePost = async (postId: any) => {
    try {
      const res: any = await axiosClient.delete(`/api/post/${postId}`);
      console.log(res);

      if (res?.message === 'Delete successfully') {
        toast.success('Delete successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setIsLoad(!isLoad);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      setCheckList([...checkList, e.target.value]);
    }
    if (!e.target.checked) {
      const objWithIdIndex = checkList.findIndex(
        (obj: any) => obj === e.target.value
      );
      if (objWithIdIndex > -1) {
        checkList.splice(objWithIdIndex, 1);
      }
    }
    // } else {
    //   const objWithIdIndex = checkList.findIndex(
    //     (obj: any) => obj._id === e.target.value
    //   );
    //   console.log(objWithIdIndex);
    // }
  };
  const handleDeleteMany = async () => {
    try {
      const res = await axiosClient.patch('/api/post', checkList);
      setIsLoad(!isLoad);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(checkList);

  return (
    <div className='bg-[#f4f4f4]'>
      <Header isLoad={isLoad} setIsLoad={setIsLoad} />
      <div className='w-[700px] h-full mx-auto mt-10 bg-[white] rounded-[5px]'>
        <p className='p-5 text-[20px]'>Image List</p>
        <button onClick={handleDeleteMany}>Delete</button>
        <div className=''>
          {hasWindow &&
            imageList?.map((item: any, index: any) =>
              item.type === 'image' ? (
                <div key={index} className='border-b-2 border-b-[#f3f3f3]'>
                  <div
                    key={index}
                    className='my-5 max-h-[150px] flex justify-between items-center overflow-hidden '>
                    <div className='flex items-center'>
                      <input
                        id='imageCheckbox'
                        name='imageCheckbox'
                        type='checkbox'
                        value={item._id}
                        onClick={(e) => handleCheck(e)}
                        // onChange={() => setCheckList([...checkList, item._id])}
                        className='w-5 h-5 ml-5 mr-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <Image
                        src={item.url}
                        alt='c'
                        className='object-cover'
                        width={150}
                        height={150}
                      />
                    </div>
                    <button className='mx-8 text-[24px] hover:text-[#23232399]'>
                      <FaRegTrashAlt
                        onClick={() => handleDeletePost(item._id)}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div key={index} className='border-b-2 border-b-[#f3f3f3]'>
                  <div
                    key={index}
                    className='my-5 max-h-[150px] flex justify-between items-center '>
                    <div className='flex items-center'>
                      <input
                        id='default-checkbox'
                        type='checkbox'
                        value={item._id}
                        className='w-5 h-5 ml-5 mr-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <ReactPlayer
                        url={item.url}
                        width='auto'
                        height='150px'
                        playing={false}
                        muted={true}
                        controls={true}
                      />
                    </div>
                    <button className='mx-8 text-[24px] hover:text-[#23232399]'>
                      <FaRegTrashAlt
                        onClick={() => handleDeletePost(item._id)}
                      />
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default List;
