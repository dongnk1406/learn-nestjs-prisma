import { createLazyFileRoute, Link } from '@tanstack/react-router'
import styled from '@emotion/styled'
import { useAuth } from '../hooks/useAuth'

const Container = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1e293b;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.5;
`

const WelcomeSection = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-top: 2rem;
`

const WelcomeText = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
  
  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export const Route = createLazyFileRoute('/')({
  component: Home,
})

function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <Container>
      <Title>
        {isAuthenticated ? `Welcome back, ${user?.email}!` : 'Welcome to NestJS Prisma Dashboard'}
      </Title>
      
      {isAuthenticated ? (
        <Grid>
          <Card>
            <CardTitle>
              <Link to="/posts">Posts</Link>
            </CardTitle>
            <CardDescription>Manage your blog posts and content</CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link to="/categories">Categories</Link>
            </CardTitle>
            <CardDescription>Organize your content with categories</CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link to="/users">Users</Link>
            </CardTitle>
            <CardDescription>User management and profiles</CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link to="/comments">Comments</Link>
            </CardTitle>
            <CardDescription>View and manage user comments</CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link to="/roles">Roles</Link>
            </CardTitle>
            <CardDescription>Configure user roles and permissions</CardDescription>
          </Card>
          <Card>
            <CardTitle>
              <Link to="/permissions">Permissions</Link>
            </CardTitle>
            <CardDescription>Manage system permissions</CardDescription>
          </Card>
        </Grid>
      ) : (
        <WelcomeSection>
          <WelcomeText>
            Please <Link to="/login">sign in</Link> to access the dashboard and manage your content.
          </WelcomeText>
        </WelcomeSection>
      )}
    </Container>
  )
}
