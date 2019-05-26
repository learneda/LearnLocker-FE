import * as type from './homeTypes'
import { ADD_TO_FEED } from 'actions/types'
const initialState = {
  posts: [],
  locker: [],
  hasmore: true,
  offset: 5,
}
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_FEED:
      // payload === an array of posts
      // creating new state obj & merging previous post state with new incoming post state
      return { ...state, posts: [...state.posts, ...action.payload] }
    // hasmore boolean will switch to false so infinite scroll component will stop fetching newsfeed post
    case type.TOGGLE_HAS_MORE:
      return { ...state, hasmore: action.payload }
    // incrementing offset by +5
    case type.INCREMENT_OFFSET:
      return { ...state, offset: action.payload }
    // pushing comment obj into a single post's comment arr
    case type.CREATE_COMMENT:
      // mapping thru each post in posts arr
      // payload will be the comment obj that contains which post it belongs to
      const updatedComments = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // push the comment obj into that post's comment arr
          post.comments.push(action.payload)
        }
        return post
      })
      return { ...state, posts: updatedComments }
    case type.DELETE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to
      const newPosts = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // filter out that comment obj
          post.comments = post.comments.filter(
            comment => comment.id !== action.payload.id
          )
        }
        return post
      })
      return { ...state, posts: newPosts }
    case type.LIKE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to & how many like it has
      const updateLikePosts = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // increment post likes
          post.likes = post.likes + 1
        }
        return post
      })
      return { ...state, posts: updateLikePosts }
    case type.UNLIKE_COMMENT:
      //  payload will be the comment obj that contains which post it belongs to & how many like it has

      const unlikeComment = state.posts.map(post => {
        // if a post id in our state arr matches the payload post id
        if (post.post_id === action.payload.post_id) {
          // decrement post likes
          post.likes = post.likes - 1
        }
        return post
      })
      return { ...state, posts: unlikeComment }
    case type.FETCH_LOCKER:
      return { ...state, locker: action.payload }
    case ADD_TO_FEED:
      const new_posts = [action.payload, ...state.posts]
      return { ...state, posts: new_posts }
    default:
      return state
  }
}