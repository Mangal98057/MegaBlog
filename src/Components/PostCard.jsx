import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featureImage }) {

  if (!$id) return null

  const imageUrl = featureImage
    ? appwriteService.getFilePreview(featureImage)
    : 'https://via.placeholder.com/400x200?text=No+Image'

  return (
    <div className='p-2'>
      <Link to={`/post/${$id}`}>
        
        <div className='w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition'>
          
          <div className='w-full flex justify-center mb-4'>
            <img
              src={imageUrl}
              alt={title || "post"}
              className='rounded-xl h-48 w-full object-cover'
            />
          </div>

          <h2 className='text-xl font-bold'>
            {title || "Untitled"}
          </h2>

        </div>

      </Link>
    </div>
  )
}

export default PostCard