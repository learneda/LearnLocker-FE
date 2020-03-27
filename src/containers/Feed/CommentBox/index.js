import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Trash from './Trash'
import styled from 'styled-components'
import { customLayout } from 'styles'
import { Link } from 'react-router-dom'
import moment from 'moment'
const CommentBox = props => {
  //TODO: Make DRY
  moment.relativeTimeThreshold('s', 40)
  moment.relativeTimeThreshold('ss', 10)
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  })
  const {
    post_comments,
    user_id,
    post_id,
    postOwnerId,
    profile_picture,
    handleSubmit,
    inputCommentRef,
  } = props
  const [itemsToRender, setRender] = useState(-2)
  const [commentInput, setCommentInput] = useState('')

  const handleMoreComments = e => {
    e.preventDefault()

    setRender(prev => prev - 3)
  }

  const handleChange = e => {
    setCommentInput(e.target.value)
  }

  return (
    <Container>
      <div className='comments-container'>
        <div className='comment-box'>
          {post_comments.length - 1 < Math.abs(itemsToRender) ? null : (
            <button className='show-more-btn' onClick={handleMoreComments}>
              show more comments
            </button>
          )}
          {post_comments.slice(itemsToRender).map((comment, index) => {
            if (comment.user_id === user_id) {
              return (
                <div key={comment.id} className='comment'>
                  <div className='comment-text'>
                    <h2>
                      <Link to={`/profile/${comment.user_id}`}>
                        {comment.username}
                        <span className='comment-date'>
                          <span> &#183; </span>
                          {moment(comment.created_at).fromNow()}:
                        </span>
                      </Link>
                    </h2>
                    <span>{comment.content}</span>
                  </div>
                  <Trash comment_id={comment.id} post_id={post_id} />
                </div>
              )
            } else {
              return (
                <div key={comment.id} className='comment'>
                  <div className='comment-text'>
                    <h2>
                      <Link to={`/profile/${comment.user_id}`}>
                        {comment.username}{' '}
                        <span className='comment-date'>
                          {moment(comment.created_at).fromNow()}:
                        </span>
                      </Link>
                    </h2>
                    <span>{comment.content}</span>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSubmit(e, post_id, commentInput, postOwnerId)
              setCommentInput('')
            }}
            className='add-comment'
          >
            <div className='pic-and-form'>
              <img src={profile_picture} alt='' />
              <input
                placeholder='Add a comment...'
                type='text'
                name='commentInput'
                value={commentInput}
                onChange={handleChange}
                ref={inputCommentRef}
              />
            </div>
            <button>Post!</button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default CommentBox

CommentBox.propTypes = {
  post_comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  user_id: PropTypes.number.isRequired,
  post_id: PropTypes.number.isRequired,
  postOwnerId: PropTypes.number.isRequired,
  profile_picture: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputCommentRef: PropTypes.node,
}
const Container = styled.div`
  .comments-container {
    padding: 13px 15px;

    .add-comment {
      display: flex;
      align-items: center;
      .pic-and-form {
        display: flex;
        align-items: center;
        width: 100%;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 13px;
      }

      input {
        padding: 10px;
        width: 100%;
        border-radius: 3px;
        border: 1px solid lightgrey;
        height: 40px;
        font-size: 1.4rem;
        @media (max-width: 600px) {
          width: 90%;
        }
        ::placeholder {
          /* border-bottom: 1px solid lightgrey; */
        }
        :focus {
          border: 1px solid #3f65f2;
          outline: none;
        }
      }

      button {
        border: 1px solid transparent;
        background-color: #3f65f2;
        color: white;
        border-radius: 5px;
        font-weight: 700;
        margin-left: 20px;
        padding: 8px 25px;
        font-size: 1.5rem;
        cursor: pointer;

        @media (max-width: 400px) {
          width: 120px;
        }
      }
    }

    .more_btn {
      display: none;
    }

    .comment-box {
      .show-more-btn {
        border: 1px solid transparent;
        color: #4064f2;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        transition: 200ms ease-out;
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        opacity: 0.9;
        background: #f1f2f5;
        &:hover {
          color: #3059f3;
          opacity: 1;
          transition: 200ms ease-in;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .comment {
      ${customLayout('space-between')}
      margin-bottom: 15px;
      padding: 10px;
      background-color: #f3f4f7;
      border-radius: 5px;
      overflow: hidden;
      &:hover {
        .more_btn {
          display: flex;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
        }
      }

      .comment-text {
        h2 {
          margin-right: 10px;
          color: #222;
          font-weight: 700;
          font-size: 1.4rem;
        }
        .comment-date {
          opacity: 0.7;
          font-weight: 500;
          font-size: 1.2rem;
        }
        span {
          color: #222;
          opacity: 0.9;
          /* word-break: break-all; */
          overflow: hidden;
          width: 80%;
          font-size: 1.4rem;
          word-break: break-word;
        }
      }
    }
  }
`
