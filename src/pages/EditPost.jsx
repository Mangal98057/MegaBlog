import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../Components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)

  const { id } = useParams()   // ✅ IMPORTANT FIX

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [id, navigate])

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost