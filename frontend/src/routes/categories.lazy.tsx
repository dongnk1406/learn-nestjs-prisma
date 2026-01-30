import { createLazyFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { categoryService } from '../services/categoryService';
import { Button } from '../components/ui/button';
import { formatDate } from '../lib/utils';
import { ProtectedRoute } from '../components/ProtectedRoute';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const CardDescription = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.875rem;

  &:hover {
    color: #2563eb;
  }

  &.danger {
    color: #ef4444;

    &:hover {
      color: #dc2626;
    }
  }
`;

const LoadingContainer = styled.div`
  padding: 2rem;
  color: #64748b;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  color: #ef4444;
`;

export const Route = createLazyFileRoute('/categories')({
  component: () => (
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  ),
});

function Categories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
  });

  if (isLoading)
    return <LoadingContainer>Loading categories...</LoadingContainer>;
  if (error) return <ErrorContainer>Error loading categories</ErrorContainer>;

  return (
    <Container>
      <Header>
        <Title>Categories</Title>
        <Button>Create Category</Button>
      </Header>

      <Grid>
        {categories?.data.data.map((category) => (
          <Card key={category.id}>
            <CardTitle>{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
            <CardFooter>
              <span>Created: {formatDate(category.createdAt)}</span>
              <ActionButtons>
                <ActionButton>Edit</ActionButton>
                <ActionButton className="danger">Delete</ActionButton>
              </ActionButtons>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
