import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from 'components/sidebar/Sidebar'
import Following from 'components/social/Following'
import Followers from 'components/social/Followers'
import Suggested from 'components/social/Suggested'
import Meetups from 'components/social/Meetups'
import { customWrapper } from 'components/mixins'
import * as socialActions from 'actions/socialActions'
import { fetchCollections } from 'actions'
const Social = props => {
  const {
    userId,
    user,
    following,
    followers,
    suggested,
    collections,
    followAUser,
    unfollowAUser,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    fetchCollections,
    match,
    location,
  } = props

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(userId)
      fetchFollowers(userId)
      fetchSuggested(userId)
    }
    if (!collections.length) {
      fetchCollections(userId)
    }
  }, [])
  return (
    <Container>
      <Sidebar
        user={user}
        collections={collections}
        following={following}
        followers={followers}
      />
      <Wrapper>
        <Tabs>
          <Tab>
            <NavLink
              to={`${match.url}/following`}
              className={location.pathname === '/social' ? 'active' : null}
            >
              Following
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/followers`}>Followers</NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/suggested`}>Suggested</NavLink>
          </Tab>
        </Tabs>
        <TabWrapper>
          <Switch>
            <Route
              exact
              path={[`${match.path}`, `${match.path}/following`]}
              render={props => (
                <Following
                  {...props}
                  userId={userId}
                  user={user}
                  following={following}
                  followers={followers}
                  followAUser={followAUser}
                  unfollowAUser={unfollowAUser}
                  fetchFollowing={fetchFollowing}
                />
              )}
            />
            <Route
              path={`${match.path}/followers`}
              render={props => (
                <Followers
                  {...props}
                  userId={userId}
                  following={following}
                  followers={followers}
                  followAUser={followAUser}
                  unfollowAUser={unfollowAUser}
                  fetchFollowing={fetchFollowing}
                />
              )}
            />
            <Route
              path={`${match.path}/suggested`}
              render={props => (
                <Suggested
                  {...props}
                  userId={userId}
                  suggested={suggested}
                  followAUser={followAUser}
                  fetchFollowing={fetchFollowing}
                  fetchSuggested={fetchSuggested}
                />
              )}
            />
            <Route path={`${match.path}/meetups`} component={Meetups} />
          </Switch>
        </TabWrapper>
      </Wrapper>
    </Container>
  )
}

const mapStateToProps = ({ auth, user, social, collections }) => ({
  userId: auth.id,
  user,
  collections,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    fetchCollections,
    ...socialActions,
  }
)(withRouter(Social))

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
  display: flex;
  justify-content: space-between;
  position: relative;
`
const Wrapper = styled.div`
  max-width: 1600px;
  padding-left: 3%;
  width: 100%;
`

const TabWrapper = styled.div`
  position: relative;
`

const Tabs = styled.ul`
  display: flex;
  align-items: flex-end;
  position: sticky;
  background: rgb(230, 233, 243);
  top: 59px;
  height: 100px;
  z-index: 1;
  width: 100%;
  padding-bottom: 25px;
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
  font-size: 2rem;
  margin-left: 10px;
  a {
    transition: 100ms ease-out;
    &:hover {
      color: #4064f2;
      transition: 100ms ease-in;
    }
  }
`
