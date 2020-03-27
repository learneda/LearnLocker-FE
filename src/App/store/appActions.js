import * as types from './appTypes'
import axiosAuth from 'apis/axiosAuth'
import axios from 'apis/axiosAPI'

// Fetches userID on App mount
export const fetchAuth = () => async dispatch => {
  const res = await axiosAuth.get(`/current_user`)
  const { id, ...user } = res.data
  if (id) {
    dispatch({ type: types.FETCH_AUTH, payload: { id } })
    dispatch({ type: types.FETCH_USER, payload: user })
  } else {
    dispatch({ type: types.FETCH_AUTH, payload: false })
  }
  return res.data
}
// Fetch user details
export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/users/id/${id}`)
  dispatch({ type: types.FETCH_USER, payload: res.data })
}

export const fetchNotifications = notifications => ({
  type: types.FETCH_NOTIFICATIONS,
  payload: notifications,
})

// export const createComment = commentData => async dispatch => {
//   const insertedComment = await axios.post('/comments', {
//     ...commentData,
//   })
//   console.log('what is this created comment', insertedComment)
//   dispatch({ type: types.CREATE_COMMENT, payload: commentData })
// }

export const receivingComment = commentData => async dispatch => {
  // dispatch({ type: types.CREATE_COMMENT, payload: commentData })
}

export const deleteComment = (comment_id, post_id) => async dispatch => {
  const deletedComment = await axios.delete(`comments/${comment_id}`)
  console.log('what happpen', deletedComment)
  const commentData = { comment_id, post_id }
  dispatch({ type: types.DELETE_COMMENT, payload: commentData })
}

export const likePost = postData => async dispatch => {
  // console.log(commentData)
  dispatch({ type: types.LIKE_POST, payload: postData })
}

export const unlikePost = postData => async dispatch => {
  dispatch({ type: types.UNLIKE_POST, payload: postData })
}

export const ponyUp = data => dispatch => {
  dispatch({ type: types.PONY_UP, payload: data })
}

export const ponyDown = data => dispatch => {
  dispatch({ type: types.PONY_DOWN, payload: data })
}
