import axios from 'apis/axiosAPI'
import * as types from './homeTypes'

export const fetchLocker = () => async dispatch => {
  const lockerData = await axios.get(`/locker`)
  if (lockerData.data.length) {
    dispatch({ type: types.FETCH_LOCKER, payload: lockerData.data })
  }
}
// initial action creator to fetch newsfeed
export const fetchFeed = () => async dispatch => {
  const newsFeed = await axios.get(`/newsfeed?offset=0`)
  if (newsFeed.data.length) {
    dispatch({ type: types.FETCH_FEED, payload: newsFeed.data })
  }
  if (newsFeed.data.length < 5) {
    dispatch({ type: types.TOGGLE_HAS_MORE, payload: false })
  }
}

// InfiniteScroll component will call this func with offset to get next posts
export const fetchMoreFeed = offset => async dispatch => {
  // offset flow => 0, 5, 10 . offset will be incremented by +5 for everytime it is called
  const newsFeed = await axios.get(`/newsfeed?offset=${offset + 5}`)
  // if the response's data array is populated ?
  if (newsFeed.data.length) {
    // set the array with new posts as payload
    dispatch({ type: types.FETCH_MORE_FEED, payload: newsFeed.data })
    // increment the offset by 5
    dispatch({ type: types.INCREMENT_OFFSET, payload: offset + 5 })
  } else {
    // else toggle hasMore state to false so InfiniteScroll can stop calling fetchMoreFeed
    // InfiniteScroll will unmount Loading component when hasMore boolean is false
    dispatch({ type: types.TOGGLE_HAS_MORE, payload: false })
  }
}

export const fetchTopTags = () => async dispatch => {
  const tags = await axios.get('/tags/top')
  if (tags.data.length) {
    dispatch({ type: types.FETCH_TOP_TAGS, payload: tags.data })
  }
}

export const fetchMyTags = () => async dispatch => {
  const myTags = await axios.get('/tags')
  if (myTags.data) {
    dispatch({ type: types.FETCH_MY_TAGS, payload: myTags.data })
  }
}

export const createComment = commentData => async dispatch => {
  const insertedComment = await axios.post('/comments', {
    ...commentData,
  })
  console.log('what is this created comment', insertedComment)

  dispatch({
    type: 'CREATE_COMMENT',
    payload: {
      ...insertedComment.data.comment[0],
      username: commentData.username,
    },
  })
  // dispatch({ type: types.CREATE_COMMENT, payload: commentData })
}
