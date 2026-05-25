import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import PetCard from '../components/PetCard';
import SearchBar from '../components/SearchBar';
import SelectionToolbar from '../components/SelectionToolbar';
import SortDropdown from '../components/SortDropdown';
import { useSelection } from '../context/SelectionContext';
import { usePets } from '../hooks/usePets';
import type { SortOption } from '../types/sort';
import { downloadImages } from '../utils/downloadImage';
// Keeping the page size small makes pagination easy to test and review.
const PETS_PER_PAGE = 8;

function GalleryPage() {
  const { pets, isLoading, error, isEmpty } = usePets();

  const { selectedPetIds, selectedCount, selectMany, clearSelection } =
    useSelection();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
// Search first, then sort the filtered results before pagination is applied.
  const filteredAndSortedPets = useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    const searchedPets = normalizedSearchTerm
      ? pets.filter((pet) => {
          const title = pet.title.toLowerCase();
          const description = pet.description.toLowerCase();

          return (
            title.includes(normalizedSearchTerm) ||
            description.includes(normalizedSearchTerm)
          );
        })
      : pets;

    return [...searchedPets].sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.title.localeCompare(b.title);
      }

      if (sortOption === 'name-desc') {
        return b.title.localeCompare(a.title);
      }

      if (sortOption === 'date-newest') {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      }

      return new Date(a.created).getTime() - new Date(b.created).getTime();
    });
  }, [pets, searchTerm, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedPets.length / PETS_PER_PAGE);
// Pagination is applied after search and sort so the visible page matches the current filters.
  const paginatedPets = useMemo(() => {
    const startIndex = (currentPage - 1) * PETS_PER_PAGE;
    const endIndex = startIndex + PETS_PER_PAGE;

    return filteredAndSortedPets.slice(startIndex, endIndex);
  }, [filteredAndSortedPets, currentPage]);

  const selectedPets = useMemo(() => {
    return pets.filter((pet) => selectedPetIds.includes(pet.id));
  }, [pets, selectedPetIds]);

  const estimatedTotalSize = useMemo(() => {
    return selectedPets.reduce((total, pet) => total + pet.estimatedSize, 0);
  }, [selectedPets]);

  function handleSearchChange(value: string): void {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleSortChange(value: SortOption): void {
    setSortOption(value);
    setCurrentPage(1);
  }
// Select only the pets visible on the current page so the action matches the UI.
  function handleSelectAllVisiblePets(): void {
    selectMany(paginatedPets.map((pet) => pet.id));
  }

  function handlePageChange(page: number): void {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }
// Download all currently selected pets and show a simple alert if any download fails.
  async function handleDownloadSelected(): Promise<void> {
    try {
      await downloadImages(selectedPets);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while downloading images.';

      window.alert(message);
    }
  }

  if (isLoading) {
    return (
      <PageShell>
        <StateCard>Loading pets...</StateCard>
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

  if (isEmpty) {
    return (
      <PageShell>
        <StateCard>No pets found.</StateCard>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Hero>
        <HeroContent>
          <Eyebrow>Eulerity Hackathon</Eyebrow>
          <Title>Find your favorite pet</Title>
          <Subtitle>
            Explore a playful gallery of pets, search by personality, select your
            favorites, and download the images you love.
          </Subtitle>
        </HeroContent>

        <HeroStat>
          <StatNumber>{pets.length}</StatNumber>
          <StatLabel>Pets loaded</StatLabel>
        </HeroStat>
      </Hero>

      <Toolbar>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        <SortDropdown value={sortOption} onChange={handleSortChange} />

        <ResultPill>
          Showing <strong>{paginatedPets.length}</strong> of{' '}
          <strong>{filteredAndSortedPets.length}</strong>
        </ResultPill>
      </Toolbar>

      <SelectionToolbar
        selectedCount={selectedCount}
        estimatedTotalSize={estimatedTotalSize}
        onSelectAll={handleSelectAllVisiblePets}
        onClearSelection={clearSelection}
        onDownloadSelected={handleDownloadSelected}
      />

      {filteredAndSortedPets.length === 0 ? (
        <StateCard>No pets match your search.</StateCard>
      ) : (
        <>
          <PetGrid>
            {paginatedPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </PetGrid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </PageShell>
  );
}

export default GalleryPage;

const PageShell = styled.main`
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 32px 20px 56px;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  margin-bottom: 26px;
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 34px;
  padding: 28px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.68)),
    linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(255, 197, 90, 0.18));
  box-shadow: 0 24px 70px rgba(31, 41, 51, 0.11);

  @media (min-width: 760px) {
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 38px;
  }
`;

const HeroContent = styled.div`
  max-width: 720px;
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
  max-width: 760px;
  color: #17202a;
  font-size: clamp(2.35rem, 6vw, 4.8rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
`;

const Subtitle = styled.p`
  max-width: 650px;
  margin: 18px 0 0;
  color: #586474;
  font-size: 1.04rem;
  line-height: 1.7;
`;

const HeroStat = styled.div`
  width: 150px;
  border-radius: 28px;
  padding: 22px;
  background: #17202a;
  color: #ffffff;
  box-shadow: 0 18px 35px rgba(23, 32, 42, 0.22);
`;

const StatNumber = styled.p`
  margin: 0;
  font-size: 2.3rem;
  font-weight: 900;
  line-height: 1;
`;

const StatLabel = styled.p`
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.86rem;
  font-weight: 700;
`;

const Toolbar = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  align-items: center;
  margin-bottom: 22px;

  @media (min-width: 760px) {
    grid-template-columns: 1fr 260px auto;
  }
`;

const ResultPill = styled.p`
  margin: 0;
  width: fit-content;
  border: 1px solid rgba(31, 41, 51, 0.09);
  border-radius: 999px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.74);
  color: #586474;
  font-size: 0.92rem;
  white-space: nowrap;
  box-shadow: 0 12px 28px rgba(31, 41, 51, 0.07);

  strong {
    color: #17202a;
  }
`;

const PetGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
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