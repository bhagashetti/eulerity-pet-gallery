export type ApiPet = {
  title: string;
  description: string;
  url: string;
  created: string;
};

export type Pet = ApiPet & {
  id: string;
  estimatedSize: number;
};