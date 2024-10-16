import { CloseOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.header`
  position: relative;
  height: 44px;
  padding: 0;
  background: white;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    display: inline-block;
    width: 75px;
    height: 30px;
    border-radius: 15px;
    background: #313131;
    color: white;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;
