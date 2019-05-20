import React, { Component } from 'react'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'
import axios from 'axios'
import styled from 'styled-components'
import { customWrapper } from '../mixins'
import { post as URL } from '../../services/baseURL'
import ContentLoader from 'react-content-loader'
import HelpScreen from '../utils/screens/HelpScreen'
import OnlineFriendsSVG from '../../assets/svg/online_friends.svg'
import PostContainer from './posts/index'
import { StyledFeed } from './StyledFeed'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as Loading } from '../../assets/svg/circles.svg'

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor='#c2c2c2'
    secondaryColor='#ecebeb'
    style={{ minWidth: '100%', maxWidth: '700px', width: '100%' }}
  >
    <circle cx='30' cy='30' r='30' />
    <rect x='75' y='13' rx='4' ry='4' width='100' height='13' />
    <rect x='75' y='37' rx='4' ry='4' width='50' height='8' />
    <rect x='3' y='68' rx='5' ry='5' width='400' height='400' />
  </ContentLoader>
)
class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentValue: '',
    }
    this.socket = openSocket(URL)
  }

  componentDidMount() {
    this.socket.emit('join', { user_id: this.props.auth.id })

    this.socket.on('join', data => {
      console.log(data, 'FROM JOIN CONNECTION')
      this.props.populateNotifications(data)
    })

    this.socket.on('comments', msg => {
      console.log(msg)
      switch (msg.action) {
        case 'destroy':
          const new_state = this.state.posts.map((post, index) => {
            if (post.post_id === msg.post_id) {
              post.comments = post.comments.filter(
                comment => comment.id !== msg.id
              )
            }
            return post
          })

          this.setState({ posts: new_state })
          break
        case 'create':
          // const updated_state = this.props.posts.map((post, index) => {
          //   if (post.post_id === msg.post_id) {
          //     post.comments.push(msg)
          //   }
          //   return post
          // })
          // this.setState({ posts: updated_state })
          this.props.createComment(msg)
          break
        default:
          break
      }
    })
    this.socket.on('like', data => {
      console.log('in like socket connection', data)
      switch (data.action) {
        case 'unlike':
          const updated_state = this.state.posts.map((post, index) => {
            if (post.post_id === data.post_id) {
              const likes = post.likes
              post.likes = likes - 1
            }
            return post
          })
          this.setState({ posts: updated_state })
          break
        default:
          const update_state = this.state.posts.map((post, index) => {
            if (post.post_id === data.post_id) {
              const likes = post.likes
              post.likes = likes + 1
            }
            return post
          })
          this.setState({ posts: update_state })
          break
      }
    })
    console.log(this.props.feed)
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  handleSubmit = (event, post_id, comment, postOwnerId) => {
    const body = comment.trim()
    if (body) {
      const comment = {
        action: 'create',
        content: body,
        user_id: this.props.auth.id,
        post_id: post_id,
        username: this.props.user.username,
        postOwnerId,
      }
      this.socket.emit('comments', comment)
    }
  }

  handleDeleteComment = (comment_id, post_id) => {
    this.socket.emit('comments', {
      action: 'destroy',
      comment_id: comment_id,
      post_id: post_id,
    })
  }

  handleClick = data => {
    this.socket.emit('like', data)
  }

  render() {
    while (!this.props.user) {
      console.log('in while ')
      return (
        <Container>
          <MyLoader />
        </Container>
      )
    }

    const search = this.props.searchTerm
    const filteredPosts = this.props.posts.filter((post, index) => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.thumbnail_url.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.username.toLowerCase().includes(search.toLowerCase())
      )
    })

    let posts = []

    // if (this.props.user) {
    posts = filteredPosts.map((post, index) => (
      <PostContainer
        key={index}
        handleSubmit={this.handleSubmit}
        handleClick={this.handleClick}
        post={post}
        user_id={this.props.auth.id}
        username={this.props.user.username}
        profile_picture={this.props.user.profilePicture}
        handleDeleteComment={this.handleDeleteComment}
        socketId={this.socket.id}
      />
    ))
    // }
    if (this.props.posts) {
      return (
        <Container>
          <InfiniteScroll
            dataLength={this.props.posts.length}
            next={() => this.props.subsequentFetchFeed(this.props.offset)}
            hasMore={this.props.hasmore}
            loader={<Loading style={{ margin: 'auto', display: 'block' }} />}
          >
            {posts}
          </InfiniteScroll>
        </Container>
      )
    } else {
      return (
        <Container style={{ minWidth: '100%' }}>
          <HelpScreen
            headerText='Hello! Follow your friends and share your posts with them.'
            imgSource={OnlineFriendsSVG}
          />
        </Container>
      )
    }
  }
}

export default Feed

const Container = styled.div`
  ${customWrapper('100%', '0 auto')}
  ${StyledFeed}
`
