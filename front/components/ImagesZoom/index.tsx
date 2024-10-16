import { useState } from 'react';
import Slick from 'react-slick';

import { Image } from '@/types/Image';

import {
  CloseBtn,
  Global,
  Header,
  ImageWrapper,
  Indicator,
  Overlay,
  SlickWrapper,
} from './styles';

interface ImagesZoomProps {
  images: Image[];
  onClose: () => void;
}

export default function ImagesZoom({ images, onClose }: ImagesZoomProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={() => onClose()}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}>
            {images.map((v) => (
              <ImageWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}/{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
}
