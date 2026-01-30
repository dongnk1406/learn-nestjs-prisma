import { createLazyFileRoute } from '@tanstack/react-router'
import styled from '@emotion/styled'
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

const PlaceholderCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`

function Roles() {
  return (
    <Container>
      <Title>Roles Management</Title>
      <PlaceholderCard>
        <p>Roles management interface coming soon...</p>
        <p>This will allow you to create, edit, and manage user roles.</p>
      </PlaceholderCard>
    </Container>
  )
}

export const Route = createLazyFileRoute('/roles')({
  component: () => (
    <ProtectedRoute>
      <Roles />
    </ProtectedRoute>
  ),
})
