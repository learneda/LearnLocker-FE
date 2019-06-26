import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { customWrapper } from 'styles'
import ProfileSettings from './components/ProfileSettings'
import Integrations from './components/Integrations'
import { editUser } from 'actions'

const Settings = props => {
  const { auth, user, editUser, location, match } = props
  return (
    <Wrapper>
      <BrowseContainer>
        <Tabs>
          <Tab>
            <NavLink
              to={`${match.url}/profile`}
              className={location.pathname === '/settings' ? 'active' : null}
            >
              Settings
            </NavLink>
          </Tab>
          <Tab>
            <NavLink to={`${match.url}/integrations`}>Integrations</NavLink>
          </Tab>
        </Tabs>
        <TabWrapper>
          <Switch>
            <Route
              exact
              path={[`${match.path}`, `${match.path}/profile`]}
              render={props => (
                <ProfileSettings
                  {...props}
                  auth={auth}
                  user={user}
                  editUser={editUser}
                />
              )}
            />
            <Route
              path={`${match.path}/integrations`}
              render={props => <Integrations {...props} />}
            />
          </Switch>
        </TabWrapper>
      </BrowseContainer>
    </Wrapper>
  )
}

const mapStateToProps = ({ auth, user }) => ({ auth, user })

export default connect(
  mapStateToProps,
  { editUser }
)(withRouter(Settings))

Settings.propTypes = {
  auth: PropTypes.any,
  user: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media(max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
`

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
  position: sticky;
  background: rgb(230, 233, 243);
  top: 40px;
  height: 60px;
  align-items: flex-end;
  padding-bottom: 15px;
  z-index: 1;
  .active {
    border-bottom: 3px solid #4064f2;
    font-weight: 900;
    color: #4064f2;
  }
  @media (max-width: 760px) {
    top: 50px;
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
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
  @media (max-width: 350px) {
    font-size: 1rem;
  }
`

// const Wrapper = styled.div`
// 	${customWrapper('80%', '0 auto')}
// 	@media (max-width: 768px) {
// 		${customWrapper('90%', '0 auto')};
// 	}
// 	h2 {
// 		font-size: 3.5rem;
// 		margin: 35px 0;
// 	}
// `;

// const FormGroup = styled.form`
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   border-radius: 5px;
//   background: #fff;
//   ${customWrapper('100%', '0 auto')} padding: 20px;
//   @media (max-width: 768px) {
//     padding: 0px;
//   }

//   .form-wrapper {
//     padding: 10px;
//     ${customLayout()} ${customWrapper('80%', '0 auto')} flex-direction: column;
//     @media (max-width: 1100px) {
//       ${customWrapper('100%', '0 auto')};
//     }
//     .row {
//       padding: 10px;
//       ${customLayout('space-between')} @media (max-width: 650px) {
//         flex-direction: column;
//       }
//       .col-2 {
//         width: 50%;
//         padding: 10px;
//         ${customLayout()} flex-wrap: wrap;
//         @media (max-width: 650px) {
//           width: 100%;
//         }

//         label {
//           width: 100%;
//           padding: 20px 0;
//           color: gray;

//           input,
//           textarea {
//             width: 100%;
//             border: 1px solid rgba(0, 0, 0, 0.33);
//             margin-top: 10px;
//             border-radius: 5px;
//             padding: 10px;
//             color: #333;
//             resize: none;

//             &:focus {
//               outline: none;
//               border: 1px solid #3e66f2;
//             }
//           }

//           textarea {
//             height: 100px;
//           }
//         } // label
//       } // col-2
//     } // row

//     .btn-group {
//       ${customLayout('flex-end')} width: 100%;
//       padding: 20px;

//       button {
//         width: 15%;
//         min-width: 100px;
//         margin-left: 30px;
//         border: 1px solid transparent;
//         border-radius: 5px;
//         padding: 10px 0;
//         background-color: #3e66f2;
//         color: white;
//         font-weight: 700;
//         font-size: 1.6rem;
//         transition: 200ms ease-in;
//         cursor: pointer;

//         &:hover {
//           background-color: #3059f3;
//         }
//       }

//       a {
//         padding-top: 13px;
//         transition: 150ms ease-in;
//         font-weight: 700;

//         &:hover {
//           color: #3e66f2;
//         }
//       }
//     }
//   }
// `
