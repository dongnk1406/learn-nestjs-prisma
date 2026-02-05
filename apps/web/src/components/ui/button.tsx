import React from 'react'
import styled from '@emotion/styled'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  
  /* Size variants */
  ${props => props.size === 'sm' && `
    padding: 8px 12px;
    font-size: 14px;
  `}
  
  ${props => (props.size === 'md' || !props.size) && `
    padding: 10px 16px;
    font-size: 16px;
  `}
  
  ${props => props.size === 'lg' && `
    padding: 12px 24px;
    font-size: 18px;
  `}
  
  /* Color variants */
  ${props => (props.variant === 'primary' || !props.variant) && `
    background-color: #3b82f6;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: #f1f5f9;
    color: #475569;
    border-color: #e2e8f0;
    
    &:hover:not(:disabled) {
      background-color: #e2e8f0;
    }
  `}
  
  ${props => props.variant === 'danger' && `
    background-color: #ef4444;
    color: white;
    
    &:hover:not(:disabled) {
      background-color: #dc2626;
    }
  `}
  
  ${props => props.variant === 'ghost' && `
    background-color: transparent;
    color: #475569;
    
    &:hover:not(:disabled) {
      background-color: #f1f5f9;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}
