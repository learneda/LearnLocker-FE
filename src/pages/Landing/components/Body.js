import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import newsvg from 'assets/svg/new.svg'
import developerSVG from 'assets/svg/developer.svg'
import videosSVG from 'assets/svg/youtube2.svg'
import shareSVG from 'assets/svg/sharenew.svg'
import learnLocker from 'assets/svg/brand45.svg'

const Body = props => {
  const { authModalOpen, modalSignUp } = props

  return (
    <CallToAction>
      <div className='cta'>
        <div className='cta-left'>
          <img src={learnLocker} alt='logo' />
        </div>
        <StyledFeature>
          <Title>See What your Friends Are Learning</Title>
          <img src={newsvg} alt='friends' />
          <button
            className='button-cta'
            onClick={() => {
              authModalOpen()
              modalSignUp()
            }}
          >
            Get Started!
          </button>
        </StyledFeature>
      </div>
      <Container>
        <div className='feature-card'>
          <h4>Share the best resources in your feed.</h4>
          <div className='svg-container'>
            <img src={shareSVG} alt='share' />
          </div>
        </div>
        <div className='feature-card'>
          <h4>Monitor progress.</h4>
          <div className='svg-container'>
            <img src={developerSVG} alt='developer' />
          </div>
        </div>
        <div className='feature-card'>
          <h4>Save favorites to your locker!</h4>
          <div className='svg-container'>
            <img src={videosSVG} alt='videos' />
          </div>
        </div>
      </Container>
    </CallToAction>
  )
}

export default Body

Body.propTypes = {
  authModalOpen: PropTypes.func.isRequired,
  modalSignUp: PropTypes.func.isRequired,
}

const CallToAction = styled.div`
  display: flex;
  position: relative;
  min-height: calc(100vh - 93px);
  max-width: 1440px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;
  padding: 3vh 1vw;
  .cta {
    display: flex;
  }
  .cta-left {
    height: calc((100vh - 100px) / 1.7);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: relative;
    overflow: hidden;
    border-radius: 50px 50px;
    transform-origin: center;
    @media (max-width: 650px) {
      display: none;
    }
  }
`

const StyledFeature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-left: 30px;
  margin: 0 auto;
  text-align: center;
  height: calc((100vh - 100px) / 1.7);
  width: 50%;
  img {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding: 0;
    img {
      width: 100%;
    }
  }
  .button-cta {
    height: 45px;
    width: 70%;
    border: 1px solid #1da1f2;
    font-size: 1.8rem;
    color: white;
    border-radius: 20px;
    letter-spacing: 3px;
    line-height: 20px;
    background: #1da1f2;
    transition: all 300ms ease-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &:hover {
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      transform: translateY(-1px) scale(1.02);
      border: 1px solid dodgerblue;
    }
  }
`

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.5rem;
  letter-spacing: 1px;
  color: #14171a;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 3%;

  .feature-card {
    display: flex;
    flex-direction: column;
    width: 320px;
    padding: 5px 0;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16), 0 0 3px rgba(0, 0, 0, 0.23);
    transition: width 0.4s ease;
    @media (max-width: 1440px) {
      width: 300px;
    }
    @media (max-width: 1024px) {
      width: 220px;
    }
    &:nth-child(2) {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
  h4 {
    font-size: 2rem;
    max-width: 80%;
    text-align: center;
    margin: 10px 0;
    color: #14171a;
    letter-spacing: 1px;
  }
  .svg-container {
    height: calc((100vh - 90px) / 7);
  }
  img {
    width: 100%;
    height: 100%;
  }
`
