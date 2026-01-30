import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import styled from '@emotion/styled'
import { useAuth } from 'src/hooks/useAuth'

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: #475569;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
  
  &.active {
    font-weight: 600;
    color: #3b82f6;
    background-color: #eff6ff;
  }
`

const LogoutButton = styled.button`
  color: #dc2626;
  background: transparent;
  border: 1px solid #dc2626;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #dc2626;
    color: white;
  }
`

const UserInfo = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`

function RootComponent() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <>
      <NavigationContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/categories">Categories</NavLink>
              <NavLink to="/comments">Comments</NavLink>
              <NavLink to="/users">Users</NavLink>
              <NavLink to="/roles">Roles</NavLink>
              <NavLink to="/permissions">Permissions</NavLink>
            </>
          )}
        </NavLinks>
        
        {isAuthenticated && user && (
          <UserSection>
            <UserInfo>Welcome, {user.email}</UserInfo>
            <LogoutButton onClick={logout}>
              Logout
            </LogoutButton>
          </UserSection>
        )}
      </NavigationContainer>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
