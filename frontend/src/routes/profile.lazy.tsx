import { createLazyFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'
import { userService } from '../services/userService'
import { Button } from '../components/ui/button'
import { UserStatus } from '../types/user'

const Container = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1e293b;
`

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  max-width: 400px;
`

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`

const Value = styled.p`
  color: #1e293b;
  font-size: 0.875rem;
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  
  ${props => props.status === UserStatus.ACTIVE && `
    background-color: #dcfce7;
    color: #166534;
  `}
  
  ${props => props.status === UserStatus.INACTIVE && `
    background-color: #fee2e2;
    color: #991b1b;
  `}
`

const ActionsContainer = styled.div`
  margin-top: 1.5rem;
`

const LoadingContainer = styled.div`
  padding: 2rem;
  color: #64748b;
`

const ErrorContainer = styled.div`
  padding: 2rem;
  color: #ef4444;
`

export const Route = createLazyFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getMyProfile(),
  })

  if (isLoading) return <LoadingContainer>Loading profile...</LoadingContainer>
  if (error) return <ErrorContainer>Error loading profile</ErrorContainer>

  if (!profile) return <LoadingContainer>No profile data</LoadingContainer>

  return (
    <Container>
      <Title>My Profile</Title>
      
      <Card>
        <InfoGrid>
          <InfoItem>
            <Label>Name</Label>
            <Value>{profile.name}</Value>
          </InfoItem>
          
          <InfoItem>
            <Label>Email</Label>
            <Value>{profile.email}</Value>
          </InfoItem>
          
          <InfoItem>
            <Label>Phone</Label>
            <Value>{profile.phone}</Value>
          </InfoItem>
          
          <InfoItem>
            <Label>Status</Label>
            <StatusBadge status={profile.status}>
              {profile.status}
            </StatusBadge>
          </InfoItem>
          
          <InfoItem>
            <Label>Role ID</Label>
            <Value>{profile.roleId}</Value>
          </InfoItem>
        </InfoGrid>
        
        <ActionsContainer>
          <Button>Edit Profile</Button>
        </ActionsContainer>
      </Card>
    </Container>
  )
}
