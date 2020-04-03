import axios from 'apis/axiosAPI'
import * as types from './notificationTypes'

export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
  dispatch({ type: types.READ_NOTIFICATIONS })
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: types.DELETE_NOTIFICATIONS })
}

export const getNotifications = () => async dispatch => {
  const notifications = await axios.get('/notifications')
  if (notifications.data.length) {
    dispatch({ type: types.FETCH_NOTIFICATIONS, payload: notifications.data })
  }
}
//? Does this need dispatch?!
//? Can't you just return the action object?
//? Nothing async here?
export const receivingNotifications = data => async dispatch => {
  dispatch({ type: types.RECEIVING_NOTIFICATION, payload: data })
}

// export const sendNotifications = data => async dispatch => {
//   disaptch({ type: types.})
// }
