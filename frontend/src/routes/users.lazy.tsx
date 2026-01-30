import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { userService } from '../services/userService'
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

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const UserCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`

const UserInfo = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
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

function Users() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  })

  if (isLoading) return <Container><LoadingText>Loading users...</LoadingText></Container>
  if (error) return <Container><ErrorText>Error loading users: {(error as Error).message}</ErrorText></Container>

  return (
    <Container>
      <Title>Users</Title>
      <UserGrid>
        {users?.data?.data.map((user) => (
          <UserCard key={user.id}>
            <UserName>{user.email}</UserName>
            <UserInfo>ID: {user.id}</UserInfo>
            <UserInfo>Status: {user.status}</UserInfo>
            <UserInfo>Created: {new Date(user.createdAt).toLocaleDateString()}</UserInfo>
          </UserCard>
        )) || <p>No users found</p>}
      </UserGrid>
    </Container>
  )
}

export const Route = createLazyFileRoute('/users')({
  component: () => (
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  ),
})
