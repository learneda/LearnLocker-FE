import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button, Grommet } from 'grommet';

import { buttonBg } from '../../components/mixins';
import friendsSVG from '../../assets/svg/online_friends.svg';
import booksSVG from '../../assets/svg/reading-list-drawing.svg';
import videosSVG from '../../assets/svg/video-drawing.svg';
import shareSVG from '../../assets/svg/wall_post-drawing.svg';
import onlineSVG from '../../assets/svg/online-drawing.svg';
import landingVideo from '../../assets/video/landing.mp4';
import browser from '../../assets/img/browser.png';
import downIcon from '../../assets/svg/down-icon.svg';

export default function Body() {
  const scrollDown = useRef();
  const handleClick = () =>
    scrollDown.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <Grommet theme={theme}>
      <CallToAction>
        <div className="landing-content">
          <h1>The exciting new way to learn.</h1>
          <Button
            className="get-started"
            primary
            label="Find Out More"
            onClick={handleClick}
            reverse
          />
        </div>
        <div className="landing-img">
          <img src={browser} alt="browser top section" />
          <video
            className="landing-video"
            src={landingVideo}
            autoPlay
            muted
            loop
          />
        </div>
        <img
          src={downIcon}
          className="down-arrow"
          alt="arrow facing downwards"
          onClick={handleClick}
        />
      </CallToAction>
      <StyledFeature textAlign="center" ref={scrollDown}>
        <StyledFeatureTitle marginBottom="60px">
          See What your Friends Are Learning
        </StyledFeatureTitle>
        <img src={friendsSVG} alt="friends" />
      </StyledFeature>
      <StyledFeaturesContainer>
        <div className="feature-card">
          <h4>Keep track of your favorite books</h4>
          <img src={booksSVG} alt="books" />
        </div>
        <div className="feature-card">
          <h4>Keep track of your favorite videos</h4>
          <img src={videosSVG} alt="videos" />
        </div>
        <div className="feature-card">
          <h4>Share the best resources with your friends</h4>
          <img src={shareSVG} alt="share" />
        </div>
      </StyledFeaturesContainer>
      <StyledFeature textAlign="center">
        <img src={onlineSVG} alt="online" />
      </StyledFeature>
    </Grommet>
  );
}

const StyledFeature = styled.div`
  text-align: ${props => props.textAlign};
  padding: 70px 0;
  img {
    width: 100%;
  }
  @media (max-width: 500px) {
    padding: 35px 0;
  }
`;

const StyledFeatureTitle = styled.h3`
  font-size: 5rem;
  font-weight: 500;
  line-height: 3.5rem;
  margin-bottom: ${props => props.marginBottom};
  @media (max-width: 500px) {
    font-size: 3.5rem;
    margin-bottom: 40px;
  }
`;

const theme = {
  button: {
    padding: {
      vertical: '20px'
    },
    border: {
      radius: '5px',
      color: buttonBg
    },
    primary: {
      color: buttonBg
    }
  }
};

const StyledFeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .feature-card {
    width: 32%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    padding: 10px;
  }
  img {
    width: 200px;
  }
  h4 {
    font-size: 2.6rem;
    max-width: 80%;
    text-align: center;
    margin: 20px 0;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    .feature-card {
      width: 100%;
      margin-bottom: 15px;
    }
  }
`;

const CallToAction = styled.div`
  min-height: 82vh;
  padding: 0px 0;
  display: flex;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .landing-img {
    width: 50%;
    @media (max-width: 992px) {
      width: 80%;
    }
    @media (max-width: 900px) {
      width: 95%;
    }
  }
  .landing-content {
    width: 60%;
    margin-top: 50px;
    margin-right: 10px;
    @media (max-width: 992px) {
      margin: 20px 0 40px;
      width: 80%;
      .get-started {
        vertical-align: super;
        margin-left: 20px;
        padding: 15px 18px;
      }
    }
    @media (max-width: 900px) {
      width: 95%;
    }
    .get-started {
      @media (max-width: 650px) {
        padding: 10px;
        font-size: 1.6rem;
      }
    }
  }
  h1 {
    padding-bottom: 45px;
    font-size: 8rem;
    line-height: 8.5rem;
    font-weight: 700;
    @media (max-width: 1450px) {
      font-size: 7rem;
    }
    @media (max-width: 1250px) {
      font-size: 6.5rem;
    }
    @media (max-width: 992px) {
      display: inline;
    }
    @media (max-width: 768px) {
      font-size: 6rem;
      line-height: 7rem;
    }
    @media (max-width: 650px) {
      font-size: 5.5rem;
    }
    @media (max-width: 580px) {
      font-size: 4.7rem;
      line-height: 6rem;
    }
    @media (max-width: 500px) {
      font-size: 3.8rem;
      line-height: 5rem;
      padding-bottom: 20px;
    }
  }
  .landing-video {
    width: 100%;
    border: 3px solid #fff;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .landing-img img {
    width: 100%;
    margin-bottom: -7px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .down-arrow {
    position: absolute;
    bottom: 20px;
    width: 50px;
    left: 50%;
    transform: translateX(50%);
    animation: bounce 2s infinite;
    cursor: pointer;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;
