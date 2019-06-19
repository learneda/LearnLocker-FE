import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
import styled from 'styled-components'
import EditModal from 'components/utils/EditModal/EditModal'
import deleteIcon from 'assets/svg/delete-icon.svg'
import editSvg from 'assets/svg/edit.svg'
import SharedButton from '../shared'
import { selectLogo, printRootUrl } from 'helpers'
import { smartTruncate } from '../mixins'
import { StyledCollections } from './StyledCollections'

const Collection = props => {
  const collections = props.collections
    .map(collection => (
      <Card key={collection.id}>
        <a href={collection.post_url} target='_blank' rel='noopener noreferrer'>
          <img src={collection.thumbnail_url} alt='' />
        </a>
        <div className='post-content'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <a
              href={collection.post_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h1>{smartTruncate(collection.title, 80)}</h1>
            </a>
            <p>{smartTruncate(collection.description, 100)}</p>
            <a
              className='post-root-url'
              href={collection.post_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div
                style={{
                  display: 'flex',
                  marginTop: '5px',
                  alignItems: 'center',
                }}
              >
                {selectLogo(collection.post_url)}
                {printRootUrl(collection.root_url)}
              </div>
            </a>
          </div>
          <div className='date-like-heart'>
            <span className='formatted-date'>
              {moment(collection.created_at).fromNow() ===
              'a few seconds ago' ? (
                'just now'
              ) : (
                <Moment fromNow>{collection.created_at}</Moment>
              )}
            </span>

            <SharedButton bookmark={collection} />
            <div
              className='delete-bookmark'
              onClick={() => props.handleDelete(collection.id)}
            >
              <img src={deleteIcon} className='delete-icon' alt='delete icon' />
              <span className='del-span'>Delete</span>
            </div>
          </div>
          <div className='edit-icon'>
            <img
              src={editSvg}
              alt=''
              onClick={() => {
                props.handleModalOpen(collection)
              }}
            />
          </div>
        </div>
      </Card>
    ))
    .reverse()

  return (
    <Wrapper>
      {props.modalOpen && (
        <EditModal
          open={props.modalOpen}
          handleModalOpen={props.handleModalOpen}
          post={props.editPost}
        />
      )}
      {collections}
    </Wrapper>
  )
}

export default Collection
//* padding necessary for sticky Tabs to work
const Wrapper = styled.div`
  padding: 0px 6px 0px;
`
const Card = styled.div`
  ${StyledCollections};
`
