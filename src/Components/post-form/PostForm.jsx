import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        try {
            if (!userData?.$id) {
                console.log("User not logged in")
                return
            }

            const file = data.image?.[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null

            const payload = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featureImage: file
                    ? file.$id
                    : post?.featureImage || null,
                userId: userData.$id,
            }

            if (post) {
                if (file && post.featureImage) {
                    await appwriteService.deleteFile(post.featureImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id, payload)

                if (dbPost) navigate(`/post/${dbPost.$id}`)
            } else {
                const dbPost = await appwriteService.createPost(payload)

                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }

        } catch (error) {
            console.log("Post submit error:", error)
        }
    }

    const slugTransform = useCallback((value) => {
        if (!value || typeof value !== 'string') return ''

        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue(
                    'slug',
                    slugTransform(value.title),
                    { shouldValidate: true }
                )
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">

            {/* LEFT SIDE */}
            <div className="w-full md:w-2/3 bg-white shadow-md rounded-xl p-5">

                <Input
                    label="Title :"
                    placeholder="Enter title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />

                <Input
                    label="Slug :"
                    placeholder="Enter slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        )
                    }}
                />

                <div className="mb-4">
                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/3 bg-white shadow-md rounded-xl p-5">

                <Input
                    label="Feature Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* Image Preview */}
                {post && post.featureImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featureImage)}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-lg border"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    className="w-full text-white font-semibold py-2 rounded-lg transition-all duration-200 hover:scale-105"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>

        </form>
    )
}

export default PostForm