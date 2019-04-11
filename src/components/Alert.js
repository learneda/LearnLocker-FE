import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../assets/svg/x.svg';

export default function Alert({ message, close }) {
  return (
    <Container onClick={close}>
      <div />
      <Message>{message}</Message>
      <XX>
        <X onClick={close} />
      </XX>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(3, 177, 45, 0.85);
  color: white;
  cursor: pointer;
  font-weight: 500;
  padding: 18px 23px;
  width: 100vw;
  @media (max-width: 500px) {
    padding: 13px 13px;
  }
`;

const Message = styled.span`
  text-align: center;
`;

const XX = styled.div`
  cursor: pointer;
`;
