import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';
import { usePets } from '../hooks/usePets';

function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { pets, isLoading, error } = usePets();
  const { isSelected, toggleSelection } = useSelection();
// Find the pet that matches the generated id from the route parameter.
  const pet = pets.find((item) => item.id === id);

  if (isLoading) {
    return (
      <PageShell>
        <StateCard>Loading pet details...</StateCard>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <StateCard role="alert">{error}</StateCard>
      </PageShell>
    );
  }

  if (!pet) {
    return (
      <PageShell>
        <StateCard>
          Pet not found. <BackLink to="/">Back to gallery</BackLink>
        </StateCard>
      </PageShell>
    );
  }

  const selected = isSelected(pet.id);

  return (
    <PageShell>
      <BackLink to="/">← Back to gallery</BackLink>

      <DetailCard>
        <PetImage src={pet.url} alt={pet.title} />

        <Content>
          <Eyebrow>Pet Detail</Eyebrow>
          <Title>{pet.title}</Title>
          <Description>{pet.description}</Description>

          <Meta>
            <strong>Created:</strong>{' '}
            {new Date(pet.created).toLocaleDateString()}
          </Meta>

          <SelectButton
            type="button"
            onClick={() => toggleSelection(pet.id)}
            $isSelected={selected}
          >
            {selected ? 'Remove from selection' : 'Add to selection'}
          </SelectButton>
        </Content>
      </DetailCard>
    </PageShell>
  );
}

export default PetDetailPage;

const PageShell = styled.main`
  width: min(980px, 100%);
  margin: 0 auto;
  padding: 32px 20px 56px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 18px;
  color: #6c63ff;
  font-weight: 900;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DetailCard = styled.article`
  overflow: hidden;
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 70px rgba(31, 41, 51, 0.12);

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const PetImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;

  @media (min-width: 800px) {
    height: 100%;
    min-height: 520px;
  }
`;

const Content = styled.div`
  padding: 28px;

  @media (min-width: 800px) {
    padding: 42px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 10px;
  color: #6c63ff;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  color: #17202a;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 0.95;
  letter-spacing: -0.05em;
`;

const Description = styled.p`
  margin: 22px 0;
  color: #586474;
  font-size: 1.08rem;
  line-height: 1.7;
`;

const Meta = styled.p`
  margin: 0 0 24px;
  color: #586474;
`;

const SelectButton = styled.button<{ $isSelected: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 13px 18px;
  background: ${({ $isSelected }) => ($isSelected ? '#17202a' : '#6c63ff')};
  color: #ffffff;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 16px 34px rgba(108, 99, 255, 0.22);

  &:hover {
    transform: translateY(-2px);
  }
`;

const StateCard = styled.p`
  max-width: 520px;
  margin: 80px auto;
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.82);
  color: #586474;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 18px 45px rgba(31, 41, 51, 0.08);
`;