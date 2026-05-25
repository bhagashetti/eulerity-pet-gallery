# Pet Gallery

A React + TypeScript pet gallery application built for the Eulerity front-end take-home assignment.

The app fetches pet data from the Eulerity API and allows users to browse, search, sort, select, view details, and download pet images through a polished responsive UI.

## Project Overview

This project implements a front-end pet gallery using React and TypeScript. It retrieves pet data from the provided API, normalizes the data for app usage, and presents the pets in an interactive gallery.

The application includes gallery browsing, search, sorting, pagination, image selection, selected image download, dynamic detail pages, and global selection state that persists across routes.

## Feature List

- Fetch pets from the Eulerity API using `fetch`
- Display pet image, title, description, and creation date
- Search pets by title or description
- Sort pets by:
  - Name A-Z
  - Name Z-A
  - Date Newest First
  - Date Oldest First
- Select and deselect individual pets
- Select all visible pets
- Clear all selected pets
- Display selected item count
- Display estimated total selected file size
- Download selected pet images
- Pagination for the image gallery
- Dynamic pet detail page using `/pets/:id`
- About page
- Not Found page
- Header navigation with selected count badge
- Global selected state using React Context
- Custom hook for API loading and state management
- Explicit loading, error, and empty states
- Responsive layout:
  - 1 column on mobile
  - 2 columns on tablet
  - 4 columns on desktop
- Styled UI using `styled-components`

## Tech Stack

- React
- TypeScript
- Vite
- styled-components
- react-router-dom

## API Details

The app uses the Eulerity pets API:

```txt
https://eulerity-hackathon.appspot.com/pets
```

The API returns an array of pet objects with this shape:

```ts
{
  title: string;
  description: string;
  url: string;
  created: string;
}
```

The API does not provide a unique `id`, so the app generates a local ID from the pet title and index. The generated ID is used for:

- React list keys
- Selection state
- Dynamic pet detail routes

Example route:

```txt
/pets/tim-and-jim-0
```

## How to Run the Project

Make sure Node.js and npm are installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/bhagashetti/eulerity-pet-gallery.git 
```

### 2. Go into the project folder

```bash
cd pet-gallery
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

After running this command, Vite will show a local URL in the terminal, usually:

```txt
http://localhost:5173/
```

Open that URL in your browser to view the app.

### 5. Create a production build

```bash
npm run build
```

### 6. Preview the production build locally

```bash
npm run preview
```

This starts a local server for the optimized production build.

## Project Structure

```txt
src/
  components/
    AppHeader.tsx
    Pagination.tsx
    PetCard.tsx
    SearchBar.tsx
    SelectionToolbar.tsx
    SortDropdown.tsx

  context/
    SelectionContext.tsx

  hooks/
    usePets.ts

  pages/
    AboutPage.tsx
    GalleryPage.tsx
    NotFoundPage.tsx
    PetDetailPage.tsx

  types/
    pet.ts
    sort.ts

  utils/
    createPetId.ts
    downloadImage.ts
    formatFileSize.ts

  App.tsx
  main.tsx
  index.css
```

## Key Implementation Decisions

### TypeScript data modeling

The API pet object and app pet object are typed separately.

The raw API data includes:

```txt
title
description
url
created
```

The app adds:

```txt
id
estimatedSize
```

This keeps the API contract clear while allowing the app to support routing, selection, and estimated selected size.

### Custom data hook

Pet loading logic is handled in `usePets`.

The hook manages:

- loading state
- error state
- empty state
- successful data state
- response normalization

This keeps API logic separate from page and component UI.

### Global selection state

Selected pets are managed with React Context in `SelectionContext.tsx`.

This allows selection state to persist when navigating between routes. For example, a user can select pets in the gallery, open a pet detail page, return to the gallery, and keep the same selections.

### Local gallery state

Search, sort, and pagination are managed locally in `GalleryPage` because those states only affect the gallery screen.

### Routing

The app uses `react-router-dom` for:

- `/` — gallery page
- `/pets/:id` — pet detail page
- `/about` — about page
- `*` — not found page

### Pagination

Pagination was chosen instead of infinite scroll because it is predictable, easy to test, and works clearly with search, sorting, and Select All visible pets.

### Styling

The UI uses `styled-components`, as requested in the assignment. The gallery uses a responsive CSS grid to support mobile, tablet, and desktop layouts.

## Assumptions and Tradeoffs

- The API does not provide a unique pet ID, so generated local IDs are used.
- The API does not provide image file sizes, so the app uses a consistent estimated size per image.
- Select All selects the currently visible paginated pets rather than every pet in the full dataset. This keeps the action aligned with what the user currently sees.
- Pagination was selected over infinite scroll for clearer interaction and simpler testing.
- Downloading multiple images may depend on browser behavior and permissions for multiple downloads.
- The app uses client-side routing and client-side state only.

## Manual Testing Checklist


- App loads successfully with `npm run dev`
- Production build succeeds with `npm run build`
- Production preview works with `npm run preview`
- Pets load from the Eulerity API
- Loading state appears while data is being fetched
- Error state is handled if the API request fails
- Empty state is handled if no pets are returned
- Pet cards display image, title, description, and created date
- Search filters pets by title
- Search filters pets by description
- Sorting works for Name A-Z
- Sorting works for Name Z-A
- Sorting works for Date Newest First
- Sorting works for Date Oldest First
- Pagination displays the correct number of pets per page
- Previous, Next, and page number buttons work
- Search resets pagination to page 1
- Sorting resets pagination to page 1
- Individual pet selection works
- Selected cards are visually highlighted
- Selected count updates correctly
- Estimated selected file size updates correctly
- Select All selects visible pets
- Clear Selection clears all selected pets
- Download Selected downloads selected images
- Header selected count updates correctly
- Selection persists when navigating to a detail page and back
- Gallery route `/` works
- Detail route `/pets/:id` works
- About route `/about` works
- Invalid routes show the Not Found page
- Layout shows 1 column on mobile
- Layout shows 2 columns on tablet
- Layout shows 4 columns on desktop

## AI Usage

A `PROMPTS.md` file is included in the root of this repository to document how AI tools were used during development.