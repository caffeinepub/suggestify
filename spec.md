# Suggestify

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing/login page with role selection (Student, Staff, Faculty, Admin)
- Complaint submission form with fields: title, category, location, description, priority
- Dashboard showing submitted complaints with real-time status (Pending, In Progress, Resolved)
- AI resolution plan display panel (3-step action plan, mock data ready for Gemini API integration)
- Admin panel: view all complaints, update status, assign to department
- Role-based navigation (different views per role)
- Responsive layout for mobile and desktop

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Set up app shell with role-based routing (Student/Staff/Faculty vs Admin views)
2. Build login/role selection screen (no real auth, stubbed for Firebase Auth integration)
3. Build complaint submission form with category, location, priority fields
4. Build complaints list/dashboard with status badges and filters
5. Build complaint detail view with AI resolution plan section (mock 3-step plan)
6. Build admin panel with status update controls and department assignment
7. Add clear API placeholder comments throughout for Node.js/Firebase backend integration
8. Ensure full responsiveness
