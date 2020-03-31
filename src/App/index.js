import React, { useEffect, lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CSSReset from 'styles/global/cssReset'
import CSSTransitions from 'styles/global/cssTransitions'
import { composedIndexRedirect as index } from 'hocs/indexRedirect'
import socket from './socket'
import * as appActions from './store/appActions'
import { receivingNotifications } from 'pages/Notifications/store/notificationActions'
import Navbar from 'pages/Navbar'
// Dynamic imports to enable code-splitting
const LandingPage = lazy(() => import('pages/Landing'))
const Home = lazy(() => import('pages/Home'))
const Browse = lazy(() => import('pages/Browse'))
const Locker = lazy(() => import('pages/Locker'))
const HashTag = lazy(() => import('pages/HashTag'))
const Notifications = lazy(() => import('pages/Notifications'))
const Profile = lazy(() => import('pages/Profile'))
const SinglePost = lazy(() => import('pages/SinglePost'))
const Settings = lazy(() => import('pages/Settings'))
const Success = lazy(() => import('pages/Success'))
const NoMatch = lazy(() => import('pages/NoMatch'))

const App = props => {
  const {
    auth,
    fetchAuth,
    receivingNotifications,
    receivingLikePost,
    receivingUnlikePost,
    receivingPonyUp,
    receivingPonyDown,
  } = props
  // initial fetchAuth on browser mount
  useEffect(() => {
    fetchAuth().then(user => {
      if (user.id) {
        // on mount socket will emit to all other sockets online that this user connected
        socket.emit('join', { user_id: user.id })
        // join namespace contains all the current users who are online
        socket.on('join', data => {
          receivingNotifications(data)
        })
        // socket is listening on comments event & will receive a msg obj
        socket.on('comments', msg => {
          // msg obj contains properties of content, action, post_id, user_id, username, created_at, & updated_at
          switch (msg.action) {
            // when action type === destroy
            case 'destroy':
              // invoke action creator deleteComment & pass in msg obj
              // deleteComment(msg)
              break
            // when action type === create
            case 'create':
              // invoke action creator receivingComment & pass in msg obj
              // receivingComment(msg)
              break
            default:
              break
          }
        })
        // socket is listening on like event & will receive a data obj
        socket.on('like', data => {
          // data obj contains postOwnerId, post_id, user_id, username
          switch (data.action) {
            case 'unlike':
              // invoke action creator unlikePost & pass in msg obj
              receivingUnlikePost(data)
              break
            case 'like':
              // invoke action creator likePost & pass in msg obj
              receivingLikePost(data)
              break
            default:
              break
          }
        })
        socket.on('pony', data => {
          // data obj contains postOwnerId, post_id, user_id, username
          switch (data.action) {
            case 'pony_down':
              // invoke action creator ponyDown & pass in msg obj
              receivingPonyDown(data)
              break
            case 'pony_up':
              // invoke action creator ponyUp & pass in msg obj
              receivingPonyUp(data)
              break
            default:
              break
          }
        })
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  // Only show Navbar if logged in and not within popup modal(/success route)
  const showNavbar = () => {
    return auth && window.location.pathname !== '/success'
  }

  return (
    <Container>
      <CSSReset />
      <CSSTransitions />
      {showNavbar() && <Navbar />}
      <Suspense fallback={null}>
        <Switch>
          <Route exact path='/' component={index(Home)} />
          <Route path='/browse' component={index(Browse)} />
          <Route path='/locker' component={index(Locker)} />
          <Route path='/tag/:tag' component={index(HashTag)} />
          <Route path='/notifications' component={index(Notifications)} />
          <Route path='/profile/:id' component={index(Profile)} />
          <Route path='/status/:id' component={index(SinglePost)} />
          <Route path='/settings' component={index(Settings)} />
          <Route path='/success' component={index(Success)} />
          <Route path='/landing' component={LandingPage} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, {
  ...appActions,
  receivingNotifications,
})(App)

App.propTypes = {
  auth: PropTypes.any,
  fetchAuth: PropTypes.func.isRequired,
  receivingNotifications: PropTypes.func.isRequired,
  receivingComment: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  ponyUp: PropTypes.func.isRequired,
  ponyDown: PropTypes.func.isRequired,
}

const Container = styled.div`
  position: relative;
  width: 100%;
  color: #141619;
  background-color: #e6ecf0;
  min-height: 100vh;
  height: 100%;
`
