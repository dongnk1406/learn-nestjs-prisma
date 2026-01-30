import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import styled from '@emotion/styled'
import { Button } from 'src/components/ui/button'
import { useAuth } from 'src/hooks/useAuth'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
`

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const Title = styled.h2`
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login({ email, password })
      navigate({ to: '/', replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <Container>
      <FormContainer>
        <Title>Sign in to your account</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" style={{ marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}
