import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../Components'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts()
            .then((res) => {
                setPosts(res?.documents || []) // ✅ safe
            })
            .catch((err) => {
                console.log("Error fetching posts:", err)
                setPosts([]) // ✅ no crash
            })
            .finally(() => {
                setLoading(false) // ✅ stop loading
            })
    }, [])

    // ✅ Loading UI
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <h1 className="text-xl font-semibold">Loading posts...</h1>
            </div>
        )
    }

    // ✅ No posts UI (NO LOGIN MESSAGE)
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold text-gray-500">
                        No posts available
                    </h1>
                </Container>
            </div>
        )
    }

    // ✅ Show posts (guest + logged-in)
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home