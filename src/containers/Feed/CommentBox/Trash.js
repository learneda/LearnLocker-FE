import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TrashSVG } from 'assets/svg/trash-2.svg'
import { deleteComment } from 'App/store/appActions'
import { useDispatch } from 'react-redux'

const Trash = props => {
  const dispatch = useDispatch()
  return (
    <TrashContainer>
      <TrashSVG
        onClick={() => dispatch(deleteComment(props.comment_id, props.post_id))}
      />
    </TrashContainer>
  )
}

export default Trash

const TrashContainer = styled.div`
  svg {
    cursor: pointer;
  }
`
