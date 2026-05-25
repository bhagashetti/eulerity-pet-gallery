import styled from 'styled-components';
import { formatFileSize } from '../utils/formatFileSize';

type SelectionToolbarProps = {
  selectedCount: number;
  estimatedTotalSize: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDownloadSelected: () => void;
};

function SelectionToolbar({
  selectedCount,
  estimatedTotalSize,
  onSelectAll,
  onClearSelection,
  onDownloadSelected,
}: SelectionToolbarProps) {
  return (
    <ToolbarCard>
      <SelectionInfo>
        <InfoLabel>Selected</InfoLabel>
        <InfoValue>{selectedCount} items</InfoValue>
      </SelectionInfo>

      <SelectionInfo>
        <InfoLabel>Estimated size</InfoLabel>
        <InfoValue>{formatFileSize(estimatedTotalSize)}</InfoValue>
      </SelectionInfo>

      <Actions>
        <ActionButton type="button" onClick={onSelectAll}>
          Select All
        </ActionButton>

        <ActionButton
          type="button"
          onClick={onDownloadSelected}
          disabled={selectedCount === 0}
        >
          Download Selected
        </ActionButton>

        <SecondaryButton
          type="button"
          onClick={onClearSelection}
          disabled={selectedCount === 0}
        >
          Clear Selection
        </SecondaryButton>
      </Actions>
    </ToolbarCard>
  );
}

export default SelectionToolbar;

const ToolbarCard = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  align-items: center;
  margin-bottom: 24px;
  border: 1px solid rgba(31, 41, 51, 0.08);
  border-radius: 26px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 16px 38px rgba(31, 41, 51, 0.08);

  @media (min-width: 760px) {
    grid-template-columns: auto auto 1fr;
  }
`;

const SelectionInfo = styled.div`
  border-radius: 18px;
  padding: 12px 14px;
  background: rgba(247, 244, 239, 0.95);
`;

const InfoLabel = styled.p`
  margin: 0 0 4px;
  color: #8a94a3;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const InfoValue = styled.p`
  margin: 0;
  color: #17202a;
  font-size: 1rem;
  font-weight: 900;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (min-width: 760px) {
    justify-content: flex-end;
  }
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 11px 15px;
  background: #6c63ff;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 26px rgba(108, 99, 255, 0.22);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(108, 99, 255, 0.28);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: #ffffff;
  color: #17202a;
  box-shadow: 0 12px 26px rgba(31, 41, 51, 0.1);
`;