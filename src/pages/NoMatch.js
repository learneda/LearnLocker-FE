import React from 'react'
import styled from 'styled-components'
import img from 'assets/img/bumble-bee-man-ay-yi-no-me-gusta.jpg'

const NoMatch = () => {
  return (
    <StyledNoMatch>
      <div className='no_match_content'>
        <h1>error 404 page you are looking for not found </h1>
      </div>
    </StyledNoMatch>
  )
}

export default NoMatch

const StyledNoMatch = styled.div`
  background-image: url(${img});
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .no_match_content {
    background-color: white;
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    text-transform: uppercase;
  }
`
