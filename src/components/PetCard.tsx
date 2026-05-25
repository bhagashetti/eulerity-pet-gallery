import styled from 'styled-components';
import { useSelection } from '../context/SelectionContext';
import type { Pet } from '../types/pet';
import { Link } from 'react-router-dom';

type PetCardProps = {
  pet: Pet;
};

function PetCard({ pet }: PetCardProps) {
  const { isSelected, toggleSelection } = useSelection();

  const selected = isSelected(pet.id);

  return (
    <Card $isSelected={selected}>
      <ImageWrapper>
        <PetImage src={pet.url} alt={pet.title} />
        <ImageBadge>Pet Profile</ImageBadge>

        <SelectButton
          type="button"
          onClick={() => toggleSelection(pet.id)}
          $isSelected={selected}
          aria-pressed={selected}
          aria-label={selected ? `Deselect ${pet.title}` : `Select ${pet.title}`}
        >
          {selected ? 'Selected' : 'Select'}
        </SelectButton>
      </ImageWrapper>

      <CardBody>
        <PetTitle>{pet.title}</PetTitle>
        <PetDescription>{pet.description}</PetDescription>

        <Footer>
          <PetDate>{new Date(pet.created).toLocaleDateString()}</PetDate>
          <DetailsLink to={`/pets/${pet.id}`}>View details</DetailsLink>
        </Footer>
      </CardBody>
    </Card>
  );
}

export default PetCard;

const Card = styled.article<{ $isSelected: boolean }>`
  overflow: hidden;
  border: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? 'rgba(108, 99, 255, 0.85)' : 'rgba(31, 41, 51, 0.08)'};
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 24px 60px rgba(108, 99, 255, 0.22)'
      : '0 18px 45px rgba(31, 41, 51, 0.1)'};
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(31, 41, 51, 0.16);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const PetImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #ececf3;
  transition: transform 0.35s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImageBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(255, 255, 255, 0.86);
  color: #4f46e5;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
`;

const SelectButton = styled.button<{ $isSelected: boolean }>`
  position: absolute;
  right: 14px;
  bottom: 14px;
  border: none;
  border-radius: 999px;
  padding: 9px 13px;
  background: ${({ $isSelected }) => ($isSelected ? '#6c63ff' : '#ffffff')};
  color: ${({ $isSelected }) => ($isSelected ? '#ffffff' : '#17202a')};
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(31, 41, 51, 0.18);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardBody = styled.div`
  padding: 18px;
`;

const PetTitle = styled.h2`
  margin: 0 0 9px;
  color: #17202a;
  font-size: 1.22rem;
  line-height: 1.2;
`;

const PetDescription = styled.p`
  min-height: 72px;
  margin: 0 0 18px;
  color: #586474;
  font-size: 0.94rem;
  line-height: 1.55;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const PetDate = styled.p`
  margin: 0;
  color: #8a94a3;
  font-size: 0.82rem;
  font-weight: 600;
`;

const DetailsLink = styled(Link)`
  color: #6c63ff;
  font-size: 0.86rem;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;