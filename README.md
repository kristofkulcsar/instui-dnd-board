# InstUI Drag & Drop Board

A React-based drag-and-drop board component built with Instructure UI and Atlassian's Pragmatic Drag and Drop library. This project demonstrates a complete implementation of a board with accessibility features.

## 👨‍💻 Try It Online

Want to see the drag-and-drop board in action? Try the live demo on CodeSandbox:

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=for-the-badge&logo=codesandbox)](https://codesandbox.io/p/github/kristofkulcsar/instui-dnd-board/main?import=true)

The demo includes:
- Interactive drag-and-drop functionality
- All accessibility features enabled
- Sample navigation items to experiment with
- Real-time preview of the component behavior

## 🚀 Features

- **Full Drag & Drop Support**: Cards can be reordered within columns and moved between columns
- **Column Reordering**: Entire columns can be reordered via drag and drop
- **Accessibility First**: Built with screen reader support and keyboard navigation
- **Visual Feedback**: Post-move flash animations and live region announcements
- **TypeScript**: Fully typed with comprehensive type definitions
- **Modern UI**: Styled with Instructure UI components

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Instructure UI** - Component library and design system
- **Atlassian Pragmatic Drag and Drop** - Accessible drag and drop implementation
- **Emotion** - CSS-in-JS styling

## 📋 Project Structure

```
src/
├── data/                    # Sample data and utilities
├── pieces/
│   └── board/              # Board component architecture
│       ├── board.tsx       # Main board component
│       ├── column.tsx      # Column component
│       ├── card.tsx        # Card component
│       ├── board-context.tsx    # Board state context
│       ├── column-context.tsx   # Column state context
│       ├── drag-handle.tsx      # Drag handle component
│       └── registry.ts          # Element registry for animations
├── types/                  # TypeScript type definitions
│   ├── BoardState.ts
│   ├── Column.ts
│   ├── Item.ts
│   └── ...
├── utils/                  # Utility functions
├── example.tsx            # Main example/demo component
└── main.tsx              # Application entry point
```

## 🎯 Use Cases

This drag-and-drop board is perfect for:

- **Course Navigation Management**: Organize and prioritize course navigation items
- **Kanban Boards**: Task management and workflow visualization
- **Content Organization**: Arrange content by visibility and importance
- **Educational Tools**: Interactive learning interfaces

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd instui-dnd-board
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎮 Usage

The board comes with three pre-configured columns:

1. **Must be visible in order** - Items that need specific ordering
2. **Must be visible** - Important items without strict ordering
3. **Must be hidden** - Items that should be hidden from users

### Drag and Drop Operations

- **Card Reordering**: Drag cards within the same column to reorder
- **Card Moving**: Drag cards between different columns
- **Column Reordering**: Drag column headers to reorder entire columns
- **Keyboard Support**: Full keyboard navigation support for accessibility

### Accessibility Features

- Screen reader announcements for all drag and drop operations
- Keyboard navigation support
- Live region updates
- Focus management after operations
- ARIA labels and descriptions

## 🔧 Customization

### Adding New Items

Modify the `navigationItems` array in `src/data/index.tsx`:

```typescript
const navigationItems: Item[] = [
  { id: 'unique-id', label: 'Your Item Label' },
  // ... more items
];
```

### Custom Columns

Update the `getBasicData()` function in `src/data/index.tsx`:

```typescript
const columnMap: ColumnMap = {
  'your-column-id': {
    title: 'Your Column Title',
    columnId: 'your-column-id',
    items: getItems({ amount: 5 }),
  },
  // ... more columns
};
```

### Styling

The project uses Instructure UI's design tokens and components. Customize the theme by modifying the `InstUISettingsProvider` in `src/main.tsx`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Instructure UI](https://instructure.design/) for the design system
- [Atlassian Pragmatic Drag and Drop](https://github.com/atlassian/pragmatic-drag-and-drop) for the accessible drag and drop implementation
- [Vite](https://vitejs.dev/) for the build tooling
