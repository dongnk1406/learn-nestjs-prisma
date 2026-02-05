import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { commentService } from '../services/commentService'
import { ProtectedRoute } from '../components/ProtectedRoute'

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
`

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CommentCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const CommentContent = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
`

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9ca3af;
`

const LoadingText = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 1.125rem;
  margin-top: 2rem;
`

const ErrorText = styled.div`
  text-align: center;
  color: #dc2626;
  font-size: 1.125rem;
  margin-top: 2rem;
`

function Comments() {
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments'],
    queryFn: commentService.getComments,
  })

  if (isLoading) return <Container><LoadingText>Loading comments...</LoadingText></Container>
  if (error) return <Container><ErrorText>Error loading comments: {(error as Error).message}</ErrorText></Container>

  return (
    <Container>
      <Title>Comments</Title>
      <CommentsList>
        {comments?.data?.data?.map((comment) => (
          <CommentCard key={comment.id}>
            <CommentContent>{comment.content}</CommentContent>
            <CommentMeta>
              <span>By User ID: {comment.authorId}</span>
              <span>Post ID: {comment.postId}</span>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </CommentMeta>
          </CommentCard>
        )) || <p>No comments found</p>}
      </CommentsList>
    </Container>
  )
}

export const Route = createLazyFileRoute('/comments')({
  component: () => (
    <ProtectedRoute>
      <Comments />
    </ProtectedRoute>
  ),
})
