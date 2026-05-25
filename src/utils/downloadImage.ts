import type { Pet } from '../types/pet';
// Create a safe file name from the pet title for the downloaded image.
function getFileNameFromPet(pet: Pet): string {
  const safeTitle = pet.title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${safeTitle || 'pet-image'}.jpg`;
}

export async function downloadImage(pet: Pet): Promise<void> {
  const response = await fetch(pet.url);

  if (!response.ok) {
    throw new Error(`Failed to download ${pet.title}`);
  }

  const blob = await response.blob();
  // Create a temporary object URL so the browser can download the fetched image blob.
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = getFileNameFromPet(pet);
  document.body.appendChild(link);
  link.click();
  link.remove();
// Clean up the temporary object URL after the download is triggered.
  URL.revokeObjectURL(objectUrl);
}

export async function downloadImages(pets: Pet[]): Promise<void> {
  for (const pet of pets) {
    await downloadImage(pet);
  }
}