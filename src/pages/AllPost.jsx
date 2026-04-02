import { useState, useEffect } from 'react'
import { Container, PostCard } from '../Components'
import appwriteService from '../appwrite/config'

function AllPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents)
      }
    })
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}

        </div>

      </Container>
    </div>
  )
}

export default AllPost