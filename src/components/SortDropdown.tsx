import styled from 'styled-components';
import type { SortOption } from '../types/sort';

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <SortSelect
      value={value}
      onChange={(event) => onChange(event.target.value as SortOption)}
      aria-label="Sort pets"
    >
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="date-newest">Date Newest First</option>
      <option value="date-oldest">Date Oldest First</option>
    </SortSelect>
  );
}

export default SortDropdown;

const SortSelect = styled.select`
  width: 100%;
  border: 1px solid rgba(31, 41, 51, 0.12);
  border-radius: 999px;
  padding: 15px 18px;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2933;
  outline: none;
  cursor: pointer;
  box-shadow: 0 14px 35px rgba(31, 41, 51, 0.08);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus {
    border-color: #6c63ff;
    box-shadow:
      0 0 0 4px rgba(108, 99, 255, 0.14),
      0 18px 45px rgba(31, 41, 51, 0.12);
    transform: translateY(-1px);
  }
`;