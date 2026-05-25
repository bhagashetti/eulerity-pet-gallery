# PROMPTS.md

This file documents my use of AI tools during development of the Eulerity Pet Gallery take-home assignment.

I used AI tools, including ChatGPT and Codex in VS Code, as coding assistants to speed up implementation. I provided the project direction, feature requirements, component structure, and implementation logic, then used AI to help generate TypeScript code, refine styling, debug issues, and review the final solution.

I reviewed, modified, tested, and finalized the code before submission.

## AI Usage Summary

- I guided the project architecture and feature breakdown.
- I used AI to generate TypeScript/TSX code based on my planned structure.
- I used AI to speed up component creation and styled-components implementation.
- I used AI to debug API and build issues.
- I used AI to refine state management, routing, pagination, and download behavior.
- I reviewed and tested all generated code before keeping it in the final project.

## Prompt Log

### Prompt 1

I am building the Eulerity Pet Gallery assignment using React and TypeScript. Based on the assignment requirements, help me organize the work into a clean implementation plan with gallery, search, sort, selection, routing, pagination, and documentation.

### Prompt 2

I want to use Vite with the React TypeScript template for this project. Generate the setup steps 

### Prompt 3

I want this project organized with `components`, `pages`, `hooks`, `context`, `types`, and `utils`. Generate a professional folder structure for a small React TypeScript take-home project.

### Prompt 4

The API returns pets with `title`, `description`, `url`, and `created`, but no `id`. Generate TypeScript types for the raw API object and the normalized app object, and add a generated ID field for app usage.

### Prompt 5

Generate a `createPetId` utility that creates a readable stable ID from the pet title and index so I can use it for React keys, selected state, and `/pets/:id` routing.

### Prompt 6

Generate a custom `usePets` hook using `fetch`. It should call the Eulerity pets API, normalize the response, add generated IDs and estimated image sizes, and expose `pets`, `isLoading`, `error`, and `isEmpty`.

### Prompt 7

I received an `Unexpected token '<'` JSON parsing error while fetching pets. Help me debug the issue and update the fetch URL so the hook reads from the correct Eulerity endpoint.

### Prompt 8

Generate a typed `PetCard` component that accepts a `Pet` prop and displays the pet image, title, description, created date, a select button, and a detail link.

### Prompt 9

Generate styled-components for `PetCard` with a polished card layout, hover effect, selected state styling, image badge, and responsive-friendly spacing.

### Prompt 10

Generate a `GalleryPage` that uses `usePets`, renders `PetCard` components, and keeps gallery-level local state for search term, sort option, and current page.

### Prompt 11

Generate a reusable `SearchBar` component with typed props. It should update the gallery search term and filter pets by title or description.

### Prompt 12

Generate a typed `SortDropdown` component using a `SortOption` union type. It should support Name A-Z, Name Z-A, Date Newest First, and Date Oldest First.

### Prompt 13

Update the gallery logic so search and sort work together using `useMemo`, with search applied first and sorting applied after.

### Prompt 14

Generate the main gallery styled-components, including hero section, toolbar, result pill, responsive grid, and state cards for loading/error/empty states.

### Prompt 15

I want selected pets to persist when navigating between routes. Generate a React Context implementation that stores selected pet IDs and exposes `isSelected`, `toggleSelection`, `selectMany`, `clearSelection`, and `selectedCount`.

### Prompt 16

Update the app entry point so the entire app is wrapped with the selection provider and selected state is available across gallery, detail, and about routes.

### Prompt 17

Update `PetCard` so it reads from the selection context, toggles selected state, and visually indicates when a pet is selected.

### Prompt 18

Generate a `SelectionToolbar` component that displays selected count, estimated total file size, Select All, Clear Selection, and Download Selected actions.

### Prompt 19

Generate a `formatFileSize` utility that converts byte values into readable KB or MB strings for the selection toolbar.

### Prompt 20

Generate image download utilities that can download one selected image or multiple selected images using blob URLs and temporary anchor elements.

### Prompt 21

Update `GalleryPage` so the selection toolbar receives selected count, estimated total size, select all visible pets, clear selection, and download selected handlers.

### Prompt 22

Generate a reusable `Pagination` component with typed props, Previous and Next buttons, page number buttons, disabled states, and accessible pagination markup.

### Prompt 23

Update the gallery so pagination works after search and sort. Show 8 pets per page, reset to page 1 when search or sort changes, and make Select All select only the current visible page.

### Prompt 24

Generate React Router setup with routes for `/`, `/pets/:id`, `/about`, and a fallback not found route.

### Prompt 25

Generate an `AppHeader` component with Gallery and About navigation links, plus a selected-count badge that shows global selected state across routes.

### Prompt 26

Generate a `PetDetailPage` using the route parameter from `/pets/:id`. It should find the matching pet, show loading/error/not-found states, display pet details, and allow adding/removing the pet from selection.

### Prompt 27

Generate an `AboutPage` that explains the project purpose, tech stack, and implemented features in a professional way.

### Prompt 28

Generate a `NotFoundPage` for unmatched routes with a link back to the gallery.

### Prompt 29

Review the completed implementation against the Eulerity assignment requirements and identify any missing feature, edge case, or polish item before submission.

### Prompt 30

Generate final documentation content for `README.md` and `PROMPTS.md`, including setup instructions, features, architecture decisions, assumptions, testing checklist, and AI usage summary.

Generate documentation that is clear, concise, and reviewer-friendly. The README should include:

- project overview
- feature list
- tech stack
- API details
- local setup instructions
- project structure
- key implementation decisions
- assumptions and tradeoffs
- manual testing checklist


## Final Note

AI tools were used to accelerate development and generate code from my implementation direction. I reviewed the code, adjusted it where needed, tested the behavior locally, and ensured the final project met the assignment requirements.





