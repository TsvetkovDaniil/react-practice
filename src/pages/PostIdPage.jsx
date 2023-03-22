import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const navigate = useNavigate()

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchCommentsById, isComLoading, comError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsByPostId(id)
      setComments(response.data)
    }
  )

  useEffect(() => {
    fetchPostById(params.id)
    fetchCommentsById(params.id)
  }, [])

  const goBack = () => {
    navigate(`/posts`)
  }

  return (
    <div>
      <h1>Вы открыли страницу с постом с id: {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>ID пользователя: {post.userId}</h2>
          <h3>{post.title}</h3>
          <h3>{post.body}</h3>
        </div>
      )}
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Комментарии:</h1>
          {comments.map((c) => {
            return (
              <div key={c.id} style={{ marginTop: '50px' }}>
                <h2>Пользователь: {c.email}</h2>
                <h3>Название: {c.name}</h3>
                <p>{c.body}</p>
              </div>
            )
          })}
        </div>
      )}
      <MyButton onClick={() => goBack()}>Назад</MyButton>
    </div>
  )
}

export default PostIdPage
