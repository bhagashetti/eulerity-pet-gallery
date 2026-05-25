

import { useEffect, useState } from 'react';
import type { ApiPet, Pet } from '../types/pet';
import { createPetId } from '../utils/createPetId';

type UsePetsResult = {
  pets: Pet[];
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
};

const API_URL = 'https://eulerity-hackathon.appspot.com/pets';
// The API does not include actual image file sizes.
// This value is used only to display an estimated selected download size.

const DEFAULT_ESTIMATED_SIZE = 350_000;

export function usePets(): UsePetsResult {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPets(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Failed to load pets. Status: ${response.status}`);
        }

        const data = (await response.json()) as ApiPet[];
// Normalize the API response into the shape the app needs.
        const petsWithIds: Pet[] = data.map((pet, index) => ({
          ...pet,
          id: createPetId(pet.title, index),
          estimatedSize: DEFAULT_ESTIMATED_SIZE,
        }));

        setPets(petsWithIds);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Something went wrong while loading pets.';

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPets();
  }, []);

  return {
    pets,
    isLoading,
    error,
    isEmpty: !isLoading && !error && pets.length === 0,
  };
}