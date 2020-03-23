import React, { useState, useRef, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { elevations } from 'styles/utils'
import PinSVG from 'assets/react-svg/PinSVG.js'
import Dropdown from 'components/Dropdown'
import { useSelector, useDispatch } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import { createGoal, fetchGoals, deleteGoal } from 'actions/goalActions'
import ReusablePortal from 'components/Utils/ModalPortal'
import { ReactComponent as X } from 'assets/svg/x.svg'
import axios from 'apis/axiosAPI'

const Modal = (props) => {
  const { setIsModalOpen } = props
  const handleClick = async () => {
    const response = await axios.post('/folders', {
      folder_name: 'earningTheHate'
    })
    console.log('APIresponse', response)
  }
  return (
    <ReusablePortal>
      <ModalWrapper>
        <div className='modal_'>
          <div className='top'>
            <div className='modal_name'>Choose shelf</div>
            <div className='modal_close' onClick={() => setIsModalOpen(false)}>
              <X />
            </div>
          </div>
          <div className='modal_group'>
            <div className='add_link_form'>
              <input />
              <button className='add-btn' onClick={handleClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </ReusablePortal>
  )
}

const Pin = ({ location, item }) => {
  const dropdownRef = useRef()
  const { userId, searchTerm } = useSelector(({ auth, search }) => ({
    userId: auth.id,
    searchTerm: search.searchTerm
  }))
  const dispatch = useDispatch()
  const [ isDropdown, setDropdown ] = useState(false)
  const [ isPinned, setPinned ] = useState(false)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  useOnClickOutside(dropdownRef, () => setDropdown(false))

  useEffect(
    () => {
      return () => {
        setDropdown(false)
        setPinned(false)
      }
    },
    [ location.pathname, searchTerm ]
  )

  const renderModal = () => {
    if (isModalOpen) {
      return <Modal setIsModalOpen={setIsModalOpen} />
    }
  }

  const handleClick = async (e) => {
    setIsModalOpen(true)
  }
  return (
    <div>
      {isDropdown ? (
        <Container
          className='dropdown-wrapper'
          ref={dropdownRef}
          onMouseLeave={() => setDropdown(false)}
          onClick={() => {
            setPinned(true)
            setDropdown(false)
          }}
        >
          <Dropdown
            items={[ { text: 'add to shelf' }, { text: 'favorite' } ]}
            handleClick={handleClick}
          />
        </Container>
      ) : (
        <Wrapper
          isDropdown={isDropdown}
          isPinned={isPinned}
          onClick={() => {
            setDropdown(true)
          }}
        >
          <PinSVG active={isPinned} />
        </Wrapper>
      )}
      {renderModal()}
    </div>
  )
}

Pin.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Pin)
const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;
  background-color: white;
  border: 1px solid powderblue;
  animation: grow 300ms ease;
  @keyframes grow {
    0% {
      opacity: 0.6;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => (props.isDropdown ? '0px' : '10px')};
  right: ${(props) => (props.isDropdown ? '0px' : '10px')};
  z-index: 1;
  padding: 10px;
  border-radius: 50%;
  overflow: hidden;
  opacity: ${(props) => (props.isPinned ? '1' : '0.65')};
  background-color: #fdfdfd;
  ${elevations[1]};
  transition: all 250ms ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    ${elevations[2]};
  }
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.88);
  z-index: 2;

  .modal_ {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    z-index: 1;
    text-align: center;
    max-width: 500px;
    border-radius: 6px;
    border: 3px solid dodgerblue;
    transform: translate(-50%, -50%);
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 13px 18px 13px 25px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal_name {
    letter-spacing: 1px;
    font-size: 2rem;
  }

  .modal_group {
    position: relative;
  }
  .add_link_form {
    display: flex;
    justify-content: space-between;
    padding: 0 13px 13px 13px;
  }
  #form-key {
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px 8px;
    margin: 0;
    color: #000;
    width: 350px;
    margin-right: 10px;
    outline: none;
    &:focus {
      border: 1px solid dodgerblue;
    }
  }
  .add-btn {
    padding: 5px 30px;
    border-radius: 5px;
    color: dodgerblue;
    font-size: 1.6rem;
    letter-spacing: 1px;
    transition: 200ms ease-out;
    cursor: pointer;
    &:hover {
      background-color: #e8f4fb;
      border: 1px solid dodgerblue;
    }
  }

  .modal_close:hover {
    cursor: pointer;
  }
`
