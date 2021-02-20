import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostExcrept } from './PostExcrept'

import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const error = useSelector((state) => state.posts.error)
  const postStatus = useSelector((state) => state.posts.status)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => <PostExcrept post={post} />)
  }

  // Sort posts in reverse chronological order by datetime string

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
