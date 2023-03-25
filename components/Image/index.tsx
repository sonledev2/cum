import React from 'react';
import Image from 'next/image';

// interface C {
//   src: any;
//   width: any;
//   quality: any;
//     loader: ImageLoaderProps;
// }

interface Props {
  src: any;
  width: any;
  height: any;
  quality: any;
}

const MyImage: React.FC<Props> = (props) => {
  const { src, width, height, quality } = props;
  const myLoader = (props: any) => {
    return `https://firebasestorage.googleapis.com/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  return (
    <React.Fragment>
      <Image
        loader={myLoader}
        src={src}
        width={width}
        height={height}
        quality={quality}
        alt='Picture of the author'
      />
    </React.Fragment>
  );
};

export default MyImage;
