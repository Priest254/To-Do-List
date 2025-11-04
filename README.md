# Todo Convex App (Stage 3b)

A sophisticated Todo List application built with React Native (Expo), TypeScript, and Convex for real-time backend functionality. Features include theme switching, full CRUD operations, search and filtering, drag-to-reorder, and swipe-to-delete.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete todos with real-time synchronization via Convex
- 🎨 **Theme Switcher**: Light and dark themes with smooth transitions and persistent preferences
- 🔍 **Search & Filter**: Search todos by title/description and filter by status (All, Active, Completed)
- 📅 **Due Dates**: Set and track due dates with visual indicators for overdue items
- 📝 **Rich Todo Items**: Support for title, description, and due dates
- 🔄 **Drag to Reorder**: Long-press and drag todos to reorder them
- 🗑️ **Swipe to Delete**: Swipe left on any todo to reveal delete option
- ✏️ **Edit Todos**: Tap any todo to edit its details
- 📱 **Responsive Design**: Works seamlessly on iOS, Android, and Web
- ♿ **Accessibility**: Full support for screen readers and accessibility features

## Tech Stack

- **React Native** (0.71.8) with **Expo** (48.0.0)
- **TypeScript** for type safety
- **Convex** for real-time backend and data synchronization
- **Styled Components** for theming and UI styling
- **React Native Gesture Handler** for swipe actions
- **React Native Draggable FlatList** for drag-and-drop reordering
- **React Native Modal** for add/edit modals

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Convex account (free tier available)
- For Android: Android Studio and Android SDK
- For iOS: Xcode (macOS only)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex Backend

1. Create a Convex project:
   ```bash
   npx convex dev
   ```

2. Follow the prompts to create a new Convex project or link to an existing one.

3. After setup, Convex will provide you with a URL. Copy the `CONVEX_URL` from the output.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
CONVEX_URL=<your-convex-url-here>
```

**Example:**
```env
CONVEX_URL=https://your-project.convex.cloud
```

### 4. Set Up Convex Schema

The app uses a `todos` table in Convex. The schema should include:
- `_id`: Id (auto-generated)
- `title`: string (required)
- `description`: string (optional)
- `dueDate`: string | null (optional, ISO date string)
- `completed`: boolean (default: false)
- `order`: number (for sorting/reordering)
- `createdAt`: string (ISO date string)
- `updatedAt`: string | null (ISO date string, optional)

The Convex functions in `convex/functions/` handle all database operations.

### 5. Deploy Convex Functions

After setting up your Convex project, deploy the backend functions:

```bash
npx convex deploy
```

### 6. Start Development Server

```bash
npm start
```

Or use platform-specific commands:
- **Android**: `npm run android`
- **iOS**: `npm run ios` (macOS required)
- **Web**: `npm run web`

## Project Structure

```
todo-convex/
├── convex/
│   └── functions/          # Convex backend functions
│       ├── addTodo.ts
│       ├── deleteTodo.ts
│       ├── getTodos.ts
│       ├── reorderTodos.ts
│       └── updateTodo.ts
├── src/
│   ├── components/         # Reusable components
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoModal.tsx
│   ├── screens/            # Screen components
│   │   └── HomeScreen.tsx
│   ├── styles/             # Theme definitions
│   │   └── themes.ts
│   ├── convex/             # Convex client setup
│   │   ├── client.ts
│   │   └── hooks.ts
│   └── App.tsx             # Root component
├── app.json                # Expo configuration
├── package.json            # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## Build Commands

### Development Build

```bash
npm start
```

### Production Build (EAS Build)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Configure EAS:
   ```bash
   eas build:configure
   ```

3. Build Android APK:
   ```bash
   eas build -p android --profile production
   ```

4. Build iOS:
   ```bash
   eas build -p ios --profile production
   ```

### Preview Build (APK for Testing)

Build an APK for testing and preview purposes:

```bash
eas build -p android --profile preview
```

This will create an APK file that you can download and install directly on Android devices for testing without going through app stores.

### Local Build (Android)

```bash
npm run android
```

For iOS (macOS only):
```bash
npm run ios
```

## Environment Variables

The app requires the following environment variable:

- `CONVEX_URL`: Your Convex project URL (required)

Create a `.env` file in the root directory:
```
CONVEX_URL=https://your-project.convex.cloud
```

## Convex Setup Steps

1. **Create Convex Account**: Sign up at [convex.dev](https://www.convex.dev)

2. **Initialize Project**:
   ```bash
   npx convex dev
   ```

3. **Deploy Functions**: The functions in `convex/functions/` are automatically deployed when you run `npx convex dev` in development mode.

4. **Production Deployment**:
   ```bash
   npx convex deploy
   ```

5. **View Dashboard**: Access your Convex dashboard at [dashboard.convex.dev](https://dashboard.convex.dev) to view data and manage your project.

## Usage Guide

### Adding a Todo
1. Tap the "Add Todo" button at the bottom
2. Enter a title (required)
3. Optionally add a description
4. Optionally set a due date (Today, Tomorrow, Next Week, or Clear)
5. Tap "Create"

### Editing a Todo
1. Tap on any todo item
2. Modify title, description, or due date
3. Tap "Save"

### Completing a Todo
1. Tap the checkbox on the left side of any todo
2. Completed todos are shown with a strikethrough

### Reordering Todos
1. Long-press on any todo
2. Drag it to the desired position
3. Release to save the new order

### Deleting a Todo
1. Swipe left on any todo
2. Tap the red "Delete" button

### Searching Todos
1. Use the search bar at the top
2. Type to filter todos by title or description

### Filtering Todos
1. Use the filter buttons (All, Active, Completed)
2. Tap to switch between views

### Theme Switching
1. Tap the theme toggle in the top-right corner
2. Toggle between light and dark themes
3. Your preference is saved automatically

## Troubleshooting

### Convex Connection Issues
- Verify your `CONVEX_URL` is correct in `.env`
- Check that Convex functions are deployed: `npx convex deploy`
- Ensure your Convex project is active in the dashboard

### Build Errors
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

### TypeScript Errors
- Run `npx tsc --noEmit` to check for type errors
- Ensure all dependencies are installed

## Accessibility

The app includes:
- Screen reader support (accessibility labels)
- Proper contrast ratios for text
- Keyboard navigation support (Web)
- Semantic HTML elements (Web)

## Contributing

This is a Stage 3b assignment project. Follow the instructions in `instructions.md` for submission requirements.

## License

Private project for educational purposes.

