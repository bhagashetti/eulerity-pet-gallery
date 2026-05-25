import styled from 'styled-components';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <SearchWrapper>
      <SearchIcon aria-hidden="true">🔍</SearchIcon>

      <SearchInput
        type="search"
        placeholder="Search pets by name or personality..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search pets"
      />
    </SearchWrapper>
  );
}

export default SearchBar;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 1rem;
  opacity: 0.65;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid rgba(31, 41, 51, 0.12);
  border-radius: 999px;
  padding: 15px 18px 15px 46px;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2933;
  outline: none;
  box-shadow: 0 14px 35px rgba(31, 41, 51, 0.08);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &::placeholder {
    color: #8a94a3;
  }

  &:focus {
    border-color: #6c63ff;
    box-shadow:
      0 0 0 4px rgba(108, 99, 255, 0.14),
      0 18px 45px rgba(31, 41, 51, 0.12);
    transform: translateY(-1px);
  }
`;