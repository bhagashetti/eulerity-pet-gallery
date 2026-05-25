import styled from 'styled-components';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }
// Generate page numbers from the total page count.
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationWrapper aria-label="Gallery pagination">
      <PageButton
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>

      <PageNumbers>
        {pages.map((page) => (
          <NumberButton
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            $isActive={page === currentPage}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </NumberButton>
        ))}
      </PageNumbers>

      <PageButton
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
}

export default Pagination;

const PaginationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 34px;
`;

const PageNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const PageButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: #17202a;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(23, 32, 42, 0.18);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(23, 32, 42, 0.24);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const NumberButton = styled.button<{ $isActive: boolean }>`
  width: 42px;
  height: 42px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? '#6c63ff' : 'rgba(31, 41, 51, 0.1)'};
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? '#6c63ff' : '#ffffff')};
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#17202a')};
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(31, 41, 51, 0.08);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;