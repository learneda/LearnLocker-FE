import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { smartTruncate } from 'styles'

const ProfileNav = ({
  auth,
  user,
  match,
  location,
  postCount,
  followingCount,
  followerCount,
}) => {
  const [isSmallAvatar, setIsSmallAvatar] = useState(false)

  const shrinkAvatar = e => {
    if (window.scrollY > 320) {
      setIsSmallAvatar(true)
    } else {
      setIsSmallAvatar(false)
    }
  }

  useEffect(() => {
    shrinkAvatar()
    window.addEventListener('scroll', shrinkAvatar)
    return () => {
      window.removeEventListener('scroll', shrinkAvatar)
    }
  }, [])

  return (
    <Nav>
      <div className='nav-container'>
        <div className='nav-left'>
          {!isSmallAvatar ? (
            <img
              src={user.profile_picture}
              className='profile-avatar'
              alt='avatar'
            />
          ) : (
            <div className='small-wrapper'>
              <img
                src={user.profile_picture}
                className='profile-avatar-small'
                alt='avatar'
              />
              <div className='profile-user'>
                <span className='profile-name'>
                  {smartTruncate(user.display_name, 18)}
                </span>
                <span className='profile-username'>
                  {smartTruncate(`@${user.username}`, 18)}
                </span>
              </div>
            </div>
          )}
        </div>
        <ul className='nav-center'>
          <Tab>
            <NavLink
              to={`${match.url}/posts`}
              className={
                location.pathname === `/profile/${user.id}` ? 'active' : null
              }
            >
              <div className='navlink-item'>
                <div>Posts</div>
                <span className='count'>{postCount}</span>
              </div>
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/following`}>
              <div className='navlink-item'>
                <div>Following</div>
                <span className='count'>{followingCount}</span>
              </div>
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/followers`}>
              <div className='navlink-item'>
                <div>Followers</div>
                <span className='count'>{followerCount}</span>
              </div>
            </NavLink>
          </Tab>
          {/* <Tab>
            <NavLink to={`${match.url}/likes`}>Likes</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/ponies`}>Ponies</NavLink>
          </Tab> */}
        </ul>
        <div className='nav-right'>
          {auth.id === user.id && (
            <Link to='/settings' className='edit-profile'>
              Edit profile
            </Link>
          )}
        </div>
      </div>
    </Nav>
  )
}

ProfileNav.propTypes = {
  auth: PropTypes.any,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profile_picture: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(ProfileNav)

const Nav = styled.nav`
  height: 50px;
  background: #fff;
  position: sticky;
  border-bottom: 1px solid #bfbfbf;
  top: 50px;
  z-index: 4;
  .navlink-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .count {
    align-self: center;
    font-size: 17px;
  }
  .nav-container {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1200px) {
      justify-content: flex-start;
    }
    @media (max-width: 860px) {
      justify-content: center;
    }
  }
  .nav-left {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    min-width: 260px;
    /* border: 1px solid red; */
    @media (max-width: 570px) {
      min-width: 225px;
    }
    @media (max-width: 500px) {
      display: none;
    }
  }
  .profile-avatar {
    position: relative;
    bottom: 120px;
    left: 20px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 5px solid #fff;
  }
  .small-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .profile-avatar-small {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .profile-user {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  .profile-name {
    margin-bottom: 5px;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: #14171a;
    @media (max-width: 570px) {
      font-size: 1.4rem;
    }
  }
  .profile-username {
    color: dodgerblue;
  }
  .nav-center {
    height: 100%;
    width: 580px;
    display: flex;
    /* border: 1px solid red; */
    @media (max-width: 600px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      margin-left: 10px;
    }
  }
  .nav-right {
    height: 100%;
    width: 260px;
    display: flex;
    padding: 0 10px;
    justify-content: center;
    align-items: center;
    @media (max-width: 1000px) {
      display: none;
    }
    .edit-profile {
      border: 1px solid dodgerblue;
      padding: 10px 15px;
      border-radius: 20px;
      color: dodgerblue;
      cursor: pointer;
      &:hover {
        background: #e8f4fb;
      }
    }
  }
`

const Tab = styled.li`
  height: 100%;
  transition: 300ms ease;
  list-style: none;
  .active {
    font-weight: bold;
    color: dodgerblue;
    border-bottom: 2px solid dodgerblue;
  }
  a {
    border-bottom: 2px solid transparent;
    color: #66757f;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    transition: 300ms ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0 2rem;
    transition: 300ms ease;
    @media (max-width: 570px) {
      font-size: 1.3rem;
      padding: 0 0.8rem;
    }
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid dodgerblue;
    }
    @media (max-width: 620px) {
      padding: 0 1rem;
    }
  }
`
