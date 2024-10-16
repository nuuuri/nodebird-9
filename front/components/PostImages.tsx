import { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import { Image } from '@/types/Image';

import ImagesZoom from './ImagesZoom';

interface PostImagesProps {
  images: Image[];
}

export default function PostImages({ images }: PostImagesProps) {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onCloseImagesZoom = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          style={{ maxHeight: 400, objectFit: 'contain' }}
          onClick={onZoom}
        />
        {showImagesZoom && (
          <ImagesZoom images={images} onClose={onCloseImagesZoom} />
        )}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          style={{ display: 'inline-block', width: '50%' }}
          onClick={onZoom}
        />
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          style={{ display: 'inline-block', width: '50%' }}
          onClick={onZoom}
        />
        {showImagesZoom && (
          <ImagesZoom images={images} onClose={onCloseImagesZoom} />
        )}
      </>
    );
  }

  return (
    <div>
      <img
        role="presentation"
        src={images[0].src}
        alt={images[0].src}
        style={{ width: '50%' }}
        onClick={onZoom}
      />
      <div
        role="presentation"
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
        onClick={onZoom}>
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
      {showImagesZoom && (
        <ImagesZoom images={images} onClose={onCloseImagesZoom} />
      )}
    </div>
  );
}
