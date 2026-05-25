// The API does not provide a unique id, so this creates a readable local id
// for React keys, selection state, and dynamic pet detail routes.

export function createPetId(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${slug}-${index}`;
}