import React, { useState, useRef } from 'react'
import bellIcon from 'assets/svg/bell.svg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as notificationActions from 'pages/Notifications/notificationActions'
import styled from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'

const Notifications = props => {
  const { notifications, readNotifications, deleteNotifications } = props
  const modal = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  useOnClickOutside(modal, () => setIsModalOpen(false))
  let count = props.notifications
  count = count.length
  return (
    <StyledNotifications>
      <img
        onClick={() => {
          setIsModalOpen(true)
          {
            /* readNotifications() */
          }
        }}
        src={bellIcon}
        alt='bell-icon'
        className='bell-icon'
      />
      <p>{count ? count : null}</p>
      {isModalOpen && (
        <div className='modal-portal' ref={modal}>
          <button
            className='modal-close'
            onClick={() => {
              setIsModalOpen(false)
              readNotifications()
            }}
          >
            clear
          </button>
          {!count ? (
            <div className='notification-empty'>
              You have no new notifications.
            </div>
          ) : (
            notifications.map((obj, i) => {
              return (
                <div className='notification' key={i}>
                  <Link
                    to={`/status/${obj.post_id}`}
                    onClick={() => setIsModalOpen(false)}
                  >
                    <div>{`${obj.invoker} ${obj.type} on your post`}</div>
                  </Link>
                </div>
              )
            })
          )}
        </div>
      )}
    </StyledNotifications>
  )
}

const mapStateToProps = ({ notifications }) => ({ notifications })

export default connect(
  mapStateToProps,
  { ...notificationActions }
)(Notifications)

const StyledNotifications = styled.div`
  position: relative;
  display: flex;
  padding: 5px 10px;
  border-radius: 5px;
  /* background: #f4511e;
  color: #fff; */
  color: #333;
  #notifications {
    background: none;
    margin: 0;
    padding: 5px 2px;
    color: #333;
  }
  span {
    background: none;
    margin: 0;
    padding: 0;
  }
  p {
    /* align-self: flex-end; */
    color: #3f65f2;
  }
  .modal-portal {
    display: flex;
    position: absolute;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.0975);
    flex-direction: column;
    height: 250px;
    width: 450px;
    overflow: auto;
    border: 1px solid #e6e6e6;
    background-color: rgba(255, 255, 255, 0.98);
    border-radius: 5px;
    top: 40px;
    right: -140px;
    z-index: 10;
    .modal-close {
      position: absolute;
      display: flex;
      align-item: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      border-radius: 5px;
      top: 10px;
      right: 5px;
      z-index: 20;
      background: none;
      border: 2px solid #3059f3;
      width: 45px;
      height: 25px;
      cursor: pointer;
    }
    .notification-empty {
      text-align: center;
      margin-top: 50px;
    }
    @media (max-width: 760px) {
      right: -40px;
    }

    .notification {
      min-height: 60px;
      display: flex;
      align-items: center;
      padding-left: 15px;
      border-bottom: 1px solid #e6e6e6;
    }
    .notification:last-child {
      border-bottom: none;
    }
  }
`
