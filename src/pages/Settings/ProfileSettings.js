import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { customLayout, customWrapper } from 'components/mixins'
import axios from 'apis/axiosAPI'

const ProfileSettings = props => {
  const { auth, user, editUser } = props
  const alert = useAlert()
  const image = useRef()
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [email, setEmail] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [profile_pic, setProfilePic] = useState('')

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName)
      setUsername(user.username)
      setBio(user.bio)
      setLocation(user.location)
      setWebsiteUrl(user.websiteUrl)
      setEmail(user.email)
      setSelectedFile(user.selectedFile)
      setProfilePic(user.profile_pic)
    }
    axios.get(`/images`).then(res => {
      if (res.data.length > 0) {
        setProfilePic(res.data[0].profile_picture)
      }
    })
  }, [user])

  const handleFileUpload = () => {
    if (selectedFile) {
      const fd = new FormData()
      fd.append('profile_pic', selectedFile, selectedFile.name)
      axios.post(`/images`, fd).then(res => {
        if (res.data.success) {
          axios.get(`/images`).then(res => {
            if (res.data.length > 0) {
              setProfilePic(res.data[0].profile_picture)
              editUser(auth.id, {
                profile_picture: res.data[0].profile_picture,
              })
            }
          })
        }
      })
    }
  }

  //* launches onSubmitting of page form
  const editProfileHandler = (e, id) => {
    e.preventDefault()
    editUser(id, {
      displayName,
      username,
      bio,
      location,
      websiteUrl,
      email,
    })
    // calls func to handle profile change if a new file has been selected
    // selectedFile default value is falsey until user selects file
    if (selectedFile) {
      handleFileUpload()
    }
  }

  // invokes when user selects picture NOT thru dropzone
  const handleFileSelection = e => {
    e.preventDefault()
    if (e.target.files[0]) {
      const file = e.target.files[0].type

      if (file.startsWith('image/')) {
        // set state on selected file
        setSelectedFile(e.target.files[0])
        // read more on =>
        // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
        const reader = new FileReader()

        reader.onload = (function(aImg) {
          return function(e) {
            aImg.src = e.target.result
          }
        })(image.current)

        reader.readAsDataURL(e.target.files[0])

        // console.log(this.image.current.src)
      } else {
        window.alert('Only JPEG, PNG, or GIF file types allowed')
      }
    }
  }
  // invokes when user drops a file on dropzone
  const handleDropZone = file => {
    if (file.type.startsWith('image/')) {
      // set state on selected file
      setSelectedFile(file)
      const reader = new FileReader()

      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result
        }
      })(image.current)

      reader.readAsDataURL(file)
    } else {
      window.alert('Only JPEG, PNG, or GIF file types allowed')
    }
  }

  const handleDragEvent = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrop = e => {
    // read more on
    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    const files = dt.files

    handleDropZone(files[0])
  }
  return (
    <Wrapper>
      <FormGroup onSubmit={e => editProfileHandler(e, auth.id)}>
        <div className='form-wrapper'>
          <div className='row'>
            <div className='col-2'>
              <label>
                Name
                <input
                  type='text'
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder='Add full name'
                  value={displayName}
                  name='displayName'
                  required
                />
              </label>
              <label>
                Email Address
                <input
                  type='text'
                  onChange={e => setEmail(e.target.value)}
                  placeholder='email address'
                  value={email}
                  name='email'
                />
              </label>
              <label>
                Username
                <input
                  type='text'
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Add username'
                  value={username}
                  name='username'
                  required
                />
              </label>

              <label>
                Bio
                <textarea
                  type='text'
                  onChange={e => setBio(e.target.value)}
                  placeholder='Add bio'
                  value={bio}
                  name='bio'
                />
              </label>
            </div>

            <div className='col-2'>
              <label>
                Location
                <input
                  type='text'
                  onChange={e => setLocation(e.target.value)}
                  placeholder='Add location'
                  value={location}
                  name='location'
                />
              </label>

              <label>
                Website URL
                <input
                  type='text'
                  onChange={e => setWebsiteUrl(e.target.value)}
                  placeholder='Add website URL'
                  value={websiteUrl}
                  name='websiteUrl'
                />
              </label>
              <label>
                Profile Picture
                <img
                  style={{
                    width: '200px',
                    display: 'block',
                    margin: '10px auto',
                  }}
                  ref={image}
                  src={profile_pic}
                  onDragEnter={handleDragEvent}
                  onDragOver={handleDragEvent}
                  onDrop={handleDrop}
                  alt='user_upload_picture'
                />
                <input
                  onChange={e => handleFileSelection(e)}
                  type='file'
                  name='profile_pic'
                />
              </label>
            </div>
          </div>

          <div className='btn-group'>
            <Link to='/'>Cancel</Link>
            <button
              type='submit'
              onClick={() => {
                alert.success('User settings successfully updated.')
              }}
            >
              Save
            </button>
          </div>
        </div>
      </FormGroup>
    </Wrapper>
  )
}

export default ProfileSettings

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')};
  @media (max-width: 768px) {
    ${customWrapper('90%', '0 auto')};
  }
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const FormGroup = styled.form`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;
  ${customWrapper('100%', '0 auto')};
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
  .form-wrapper {
    padding: 10px;
    ${customLayout()};
    ${customWrapper('80%', '0 auto')};
    flex-direction: column;
    @media (max-width: 1100px) {
      ${customWrapper('100%', '0 auto')};
    }
    .row {
      padding: 10px;
      ${customLayout('space-between')};
      @media (max-width: 650px) {
        flex-direction: column;
      }
      .col-2 {
        width: 50%;
        padding: 10px;
        ${customLayout()};
        flex-wrap: wrap;
        @media (max-width: 650px) {
          width: 100%;
        }
        label {
          width: 100%;
          padding: 20px 0;
          color: gray;
          input,
          textarea {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.33);
            margin-top: 10px;
            border-radius: 5px;
            padding: 10px;
            color: #333;
            resize: none;
            &:focus {
              outline: none;
              border: 1px solid #3e66f2;
            }
          }
          textarea {
            height: 100px;
          }
        } // label
      } // col-2
    } // row
    .btn-group {
      ${customLayout('flex-end')};
      width: 100%;
      padding: 20px;
      button {
        width: 15%;
        min-width: 100px;
        margin-left: 30px;
        border: 1px solid transparent;
        border-radius: 5px;
        padding: 10px 0;
        background-color: #3e66f2;
        color: white;
        font-weight: 700;
        font-size: 1.6rem;
        transition: 200ms ease-in;
        cursor: pointer;
        &:hover {
          background-color: #3059f3;
        }
      }
      a {
        padding-top: 13px;
        transition: 150ms ease-in;
        font-weight: 700;
        &:hover {
          color: #3e66f2;
        }
      }
    }
  }
`
