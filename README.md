# ALS Form 1 — Manolo Fortich District I Mapper

A React Native (TypeScript) mobile app for ALS facilitators to map and list potential ALS learners during community mapping activities in **Manolo Fortich District I**.

> **Current Phase:** Frontend Development Only — no backend, database, or authentication yet. All data is held in memory via `useState`.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native (TypeScript) |
| Navigation | React Navigation (Stack Navigator) |
| UI Kit | React Native Paper |
| Pickers | `@react-native-picker/picker` |
| Date Picker | `@react-native-community/datetimepicker` |
| State | Local `useState` / `useReducer` |

---

## Project Structure

```
src/
├── App.tsx                        # Root component (theme, navigation container)
├── types/
│   └── index.ts                   # Learner, LearnerFormData, navigation types
├── utils/
│   ├── constants.ts               # Region, division, picker options, colours
│   ├── helpers.ts                 # createEmptyFormData()
│   └── validation.ts              # Per-section validators, calculateAge()
├── components/
│   ├── index.ts                   # Barrel exports
│   ├── StepIndicator.tsx          # 5-step wizard progress bar
│   └── form/
│       ├── PersonalInfoSection.tsx
│       ├── AddressSection.tsx
│       ├── FamilySection.tsx
│       ├── EducationSection.tsx
│       └── LogisticsSection.tsx
├── screens/
│   ├── LearnerListScreen.tsx      # Search, list, delete, FAB (+)
│   ├── LearnerFormScreen.tsx      # 5-step wizard (add / edit)
│   └── LearnerDetailScreen.tsx    # Read-only detail view
└── navigation/
    └── AppNavigator.tsx           # Stack navigator config
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or Yarn
- React Native CLI (`npx react-native`)
- Android Studio (for Android) or Xcode (for iOS)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/JustJhong609/ALS-Mapping-System-AMS.git
cd ALS-Mapping-System-AMS

# 2. Install dependencies
npm install

# 3. (iOS only) Install CocoaPods
cd ios && pod install && cd ..

# 4. Start Metro bundler
npx react-native start

# 5. Run on device / emulator
npx react-native run-android   # Android
npx react-native run-ios       # iOS
```

---

## Screens

### 1. Learner List
- Search bar filters by name
- Card list: avatar, full name, age, sex, address preview
- Tap → detail view | Pencil → edit | Trash → delete (with confirmation)
- FAB (+) → new learner form
- Empty state when no learners exist

### 2. Learner Form (5-Step Wizard)
| Step | Section | Key Fields |
|------|---------|-----------|
| 1 | Personal Info | Name, Sex, Birthdate, Mother Tongue |
| 2 | Address | Complete address (multiline) |
| 3 | Family | Father, Mother, Guardian (all optional) |
| 4 | Education | Last grade completed, Reason not attending |
| 5 | Logistics | Distance, travel time, transport, session time |

- Step indicator with progress circles
- Validation per section before advancing
- Save confirmation dialog

### 3. Learner Detail
- Read-only cards grouped by section
- Edit button navigates to form (pre-filled)

---

## Roadmap (Not Yet Implemented)

- [ ] SQLite / Supabase persistence
- [ ] Offline-first sync
- [ ] User authentication
- [ ] Export to CSV / Excel
- [ ] Barangay-level reporting dashboard

---

## License

This project is for educational / government field-use purposes under the Department of Education ALS program-