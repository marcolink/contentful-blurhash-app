import {useState} from 'react';
import {Blurhash} from 'react-blurhash';
import {motion} from 'framer-motion';

export type BlurhashImgProps = {
  src: string;
  blurhash: string;
  delay?: number;
};

export function BlurhashImage({src, blurhash, delay}: BlurhashImgProps) {
  const [imgIsLoading, setImgIsLoading] = useState(true);

  const onLoaded = () => setImgIsLoading(false);

  return (
    <div className="blurhash-wrapper">
      {blurhash && <Blurhash hash={blurhash} width="100%" height="100%" className={'blurhash'}/>}
      <motion.img
        initial={{opacity: 0}}
        animate={{opacity: imgIsLoading ? 0 : 1}}
        transition={{opacity: {delay: delay || 1.0, duration: 0.3}}}
        onLoad={onLoaded}
        className="image"
        src={src}
        loading="lazy"
        width="100%"
        height="100%"
      />
    </div>
  );
}
