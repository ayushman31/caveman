RUN :
(install) : bun install
(dev) : bun dev


folder structure :
app/
├── (web)/
│   ├── layout.tsx
│   ├── page.tsx          ← Landing page
│   ├── first/
│   │   └── page.tsx
│   ├── second/
│   │   └── page.tsx
│   └── third/
│       └── page.tsx
components/
├── Text.tsx
├── MultiText.tsx
├── Video.tsx
├── ContentItem.tsx
└── Content.tsx