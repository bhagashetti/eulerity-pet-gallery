import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type SelectionContextValue = {
  selectedPetIds: string[];
  selectedCount: number;
  isSelected: (petId: string) => boolean;
  toggleSelection: (petId: string) => void;
  selectMany: (petIds: string[]) => void;
  clearSelection: () => void;
};

type SelectionProviderProps = {
  children: ReactNode;
};

const SelectionContext = createContext<SelectionContextValue | undefined>(
  undefined
);
// Selection is stored globally so selected pets persist across route changes.
export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>([]);

  const value = useMemo<SelectionContextValue>(() => {
    function isSelected(petId: string): boolean {
      return selectedPetIds.includes(petId);
    }

    function toggleSelection(petId: string): void {
      setSelectedPetIds((currentSelectedPetIds) => {
        if (currentSelectedPetIds.includes(petId)) {
          return currentSelectedPetIds.filter((id) => id !== petId);
        }

        return [...currentSelectedPetIds, petId];
      });
    }
// Merge new selected ids with the existing selection and avoid duplicates.
    function selectMany(petIds: string[]): void {
      setSelectedPetIds((currentSelectedPetIds) => {
        const uniqueIds = new Set([...currentSelectedPetIds, ...petIds]);
        return Array.from(uniqueIds);
      });
    }

    function clearSelection(): void {
      setSelectedPetIds([]);
    }

    return {
      selectedPetIds,
      selectedCount: selectedPetIds.length,
      isSelected,
      toggleSelection,
      selectMany,
      clearSelection,
    };
  }, [selectedPetIds]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error('useSelection must be used inside SelectionProvider.');
  }

  return context;
}