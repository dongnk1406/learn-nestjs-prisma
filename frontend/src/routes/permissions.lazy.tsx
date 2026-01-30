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

function Permissions() {
  return (
    <Container>
      <Title>Permissions Management</Title>
      <PlaceholderCard>
        <p>Permissions management interface coming soon...</p>
        <p>This will allow you to create, edit, and manage system permissions.</p>
      </PlaceholderCard>
    </Container>
  )
}

export const Route = createLazyFileRoute('/permissions')({
  component: () => (
    <ProtectedRoute>
      <Permissions />
    </ProtectedRoute>
  ),
})
