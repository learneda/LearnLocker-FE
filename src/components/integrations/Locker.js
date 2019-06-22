import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { truncateText } from '../mixins'

class Locker extends Component {
  handleTruncateText = (content, limit = 10) => {
    return truncateText(content, limit)
  }

  render() {
    if (this.props.locker.length === 0) {
      return <h1 style={{ border: '5px solid pink' }}>Loading...</h1>
    }
    return (
      <div
        style={{ border: '5px solid pink', width: '100%', overflow: 'none' }}
      >
        {this.props.locker.map(obj => {
          if (obj.pocket_id) {
            return (
              <a
                key={obj.item_id}
                href={obj.resolved_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <h2>{obj.resolved_title}</h2>
                <div>
                  <img
                    style={{ maxWidth: '100%' }}
                    src={obj.top_image_url}
                    alt='locker'
                  />
                </div>
                <p>{obj.excerpt}</p>
              </a>
            )
          } else {
            return (
              <a
                key={obj.book_id}
                href={obj.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <h2>
                  <strong>Title:</strong> {obj.title}
                </h2>
                <h3>
                  <strong>Author:</strong> {obj.author}
                </h3>
                <img src={obj.image} alt='' />
                <p>
                  <strong>Description:</strong> {obj.description}
                </p>
                <p>
                  <strong>Shelf:</strong> {obj.shelf}
                </p>
                <p>
                  <strong>Rating:</strong> {obj.rating}
                </p>
              </a>
            )
          }
        })}
      </div>
    )
  }
}

export default withRouter(Locker)

// Extracted single post in a stateless component
// const SinglePost = ({ post, handleTruncateText }) => {
// 	return (
// 		<Post key={post.id}>
// 			<a href={post.post_url} target="_blank" rel="noopener noreferrer">
// 				<img src={post.thumbnail_url} alt="" />
// 			</a>
// 			<div className="post-content">
// 				<a href={post.post_url} target="_blank" rel="noopener noreferrer">
// 					<h1>{handleTruncateText(post.title)}</h1>
// 				</a>
// 				<p>{handleTruncateText(post.description, 15)}</p>
// 				<div className="date-like-heart">
// 					<span className="formatted-date">
// 						Added <Moment fromNow>{post.created_at}</Moment>
// 					</span>
// 				</div>
// 			</div>
// 		</Post>
// 	)
// }
