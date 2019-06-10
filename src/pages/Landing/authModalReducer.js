import {
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_SIGNUP,
  AUTH_MODAL_LOGIN,
} from './authModalTypes'

const initialState = {
  isAuthOpen: false,
  isSignUp: true,
}

export const authModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_MODAL_TOGGLE: {
      return {
        ...state,
        isAuthOpen: !state.isAuthOpen,
      }
    }
    case AUTH_MODAL_SIGNUP: {
      return {
        ...state,
        isSignUp: true,
      }
    }
    case AUTH_MODAL_LOGIN: {
      return {
        ...state,
        isSignUp: false,
      }
    }
    default:
      return state
  }
}