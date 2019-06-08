import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import GlobalStyle from 'components/mixins'
import Navbar from 'components/navigation/Navbar'
import { customContainer } from 'components/mixins'
import { composedIndexRedirect as index } from 'components/authentication/indexRedirect'
import { composedHomeRedirect as authentication } from 'components/authentication/homeRedirect'
import useInterval from 'components/hooks/useInterval'
import {
  fetchAuth,
  fetchUser,
  authModalToggle,
  modalLogin,
  modalSignUp,
} from 'actions'
import { ReactComponent as Loading } from 'assets/svg/circles.svg'
import Notifications from 'pages/Notifications'
import Landing from 'pages/Landing/index'
//? Should we implement route-based code-splitting?
//TODO: Need to make this DRY
const LandingPagePromise = import('pages/Landing')
const HomePromise = import('pages/Home')
const BrowsePromise = import('pages/Browse')
const SocialPromise = import('pages/Social')
const SettingsPromise = import('pages/Settings')
const NoMatchPromise = import('pages/NoMatch')
const ProfilePromise = import('pages/Profile')
const SinglePostPromise = import('pages/SinglePost')
const LandingPage = lazy(() => LandingPagePromise)
const Home = lazy(() => HomePromise)
const Browse = lazy(() => BrowsePromise)
const Social = lazy(() => SocialPromise)
const Settings = lazy(() => SettingsPromise)
const NoMatch = lazy(() => NoMatchPromise)
const Profile = lazy(() => ProfilePromise)
const SinglePost = lazy(() => SinglePostPromise)

const App = ({
  fetchAuth,
  fetchUser,
  fetchCollections,
  authModalToggle,
  modalSignUp,
  modalLogin,
  modal,
  auth,
}) => {
  console.log(authModalToggle)
  const { isAuthOpen, isEditOpen } = modal
  useEffect(() => {
    //* initial fetchAuth and fetchUser on browser refresh
    fetchAuth().then(res => {
      if (res.id) {
        fetchUser(res.id)
      }
    })
  }, [])

  useInterval(() => {
    //* fetches auth information every 5 minutes to reduce number of server requests
    fetchAuth()
  }, 300000)

  if (isAuthOpen || isEditOpen) {
    document.getElementById('body').setAttribute('style', 'overflow: hidden')
  } else {
    document.getElementById('body').setAttribute('style', 'overflow: auto')
  }
  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Loading />
          </div>
        }
      >
        <Switch>
          // home HOC
          <Route
            exact
            path={['/', '/feed', '/saved', '/locker']}
            component={authentication(Home)}
          />
          <Route
            path='/landing'
            render={props => (
              <LandingPage
                {...props}
                modalSignUp={modalSignUp}
                modalLogin={modalLogin}
                authModalToggle={authModalToggle}
              />
            )}
          />
          <Route path='/browse' component={index(Browse)} />
          <Route path='/social' component={index(Social)} />
          <Route path='/notifications' component={index(Notifications)} />
          <Route path='/profile/:id' component={index(Profile)} />
          <Route path='/status/:id' component={index(SinglePost)} />
          <Route path='/settings' component={index(Settings)} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    </Container>
  )
}

const mapStateToProps = ({ modal, auth }) => ({ modal, auth })

export default connect(
  mapStateToProps,
  { fetchAuth, fetchUser, authModalToggle, modalLogin, modalSignUp }
)(App)

const Container = styled.div`
  ${customContainer()};
`
