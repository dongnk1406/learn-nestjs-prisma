import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { postService } from 'src/services/postService'
import { Button } from 'src/components/ui/button'
import { ProtectedRoute } from 'src/components/ProtectedRoute'

const Container = styled.div`
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
`

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
`

const PostCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
`

const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`

const PostSummary = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
`

const StatusBadge = styled.span<{ status: number }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  
  ${props => props.status === 1 && `
    background-color: #dcfce7;
    color: #166534;
  `}
  
  ${props => props.status === 0 && `
    background-color: #fee2e2;
    color: #991b1b;
  `}
`

const LoadingContainer = styled.div`
  padding: 2rem;
  color: #64748b;
`

const ErrorContainer = styled.div`
  padding: 2rem;
  color: #ef4444;
`

export const Route = createLazyFileRoute('/posts')({
  component: () => (
    <ProtectedRoute>
      <Posts />
    </ProtectedRoute>
  ),
})

function Posts() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts(),
  })

  if (isLoading) return <LoadingContainer>Loading posts...</LoadingContainer>
  if (error) return <ErrorContainer>Error loading posts</ErrorContainer>

  return (
    <Container>
      <Header>
        <Title>Posts</Title>
        <Button>Create Post</Button>
      </Header>
      
      <Grid>
        {posts?.data.data.map((post) => (
          <PostCard key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostSummary>{post.summary}</PostSummary>
            <PostMeta>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <StatusBadge status={post.status}>
                  {post.status === 1 ? 'Published' : 'Draft'}
                </StatusBadge>
                <span>Owner ID: {post.ownerId}</span>
              </div>
            </PostMeta>
          </PostCard>
        ))}
      </Grid>
    </Container>
  )
}
