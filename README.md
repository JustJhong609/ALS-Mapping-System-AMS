# ALS Mapping System (AMS) — Manolo Fortich District I

A **React Native (Expo + TypeScript)** mobile application for ALS facilitators to map, register, and manage potential adult learners during community mapping activities in **Manolo Fortich District I, Region X (Northern Mindanao), Philippines**.

## About the ALS Program

The **Alternative Learning System (ALS)** is a government initiative of the **Department of Education (DepEd)** of the Philippines that provides out-of-school youth and adults with basic education outside the formal school system. Facilitators conduct community mapping to identify and enroll potential learners who have not completed formal schooling.

This application digitizes **ALS Form 1** — the official community mapping and learner profiling form — enabling field facilitators to capture comprehensive learner data on a mobile device.

> **Current Phase:** Frontend prototype — no backend or database yet. All data is held in memory.

---

## Project Summary for Coding Agents

This is a **React Native mobile application** built with **Expo and TypeScript** that digitizes the DepEd ALS Form 1 community-mapping process for Manolo Fortich District I in the Philippines, where ALS facilitators register and manage records of potential adult learners they encounter during field visits.

The entire application state (the list of learner records) lives in a single `useState` array declared in `src/App.tsx` and passed down through the `AppNavigator` as props. There is no database, no API, and no persistence layer — data is lost when the app is restarted. The root component wraps everything in `SafeAreaProvider`, `PaperProvider` (React Native Paper / Material Design 3 theme), and React Navigation's `NavigationContainer`.

Navigation is handled by a single React Navigation **Native Stack** defined in `src/navigation/AppNavigator.tsx`. The stack has six screens: `Login → Home → LearnerList → LearnerForm → LearnerDetail → Analytics`. `Login` is a placeholder screen with no real authentication. `Home` is a simple hub with buttons to reach `LearnerList` and `Analytics`. `LearnerList` renders the in-memory learner array as searchable cards with add/edit/delete actions. `LearnerForm` is a **5-step wizard** for creating or editing a learner record. `LearnerDetail` is a read-only summary. `Analytics` shows aggregate statistics derived from the in-memory list.

The **Learner data model** (`src/types/index.ts`) is a TypeScript interface with roughly 40 fields grouped into six logical sections: Administrative, Personal, Address, Family, Education, and Logistics. Key fields include full name, sex, birthdate, barangay, last grade completed, reason for not attending school, employment status, and preferred session time. A parallel `LearnerFormData` interface mirrors `Learner` but uses `string` and `Date | null` types to accommodate unvalidated form input before it is committed to the learner record.

The **5-step wizard** (`src/screens/LearnerFormScreen.tsx`) renders one of five section components at a time — `PersonalInfoSection`, `AddressSection`, `FamilySection`, `EducationSection`, and `LogisticsSection` (all in `src/components/form/`) — together with a `StepIndicator` progress bar. Validation runs per section before advancing; validators live in `src/utils/validation.ts` and return a `ValidationResult` (`{ isValid, errors }`). Picker options (barangays, transport modes, grade levels, etc.) are declared as `readonly string[]` constants in `src/utils/constants.ts`. Helper utilities are in `src/utils/helpers.ts`, which currently only exports `createEmptyFormData()`.

The UI is styled using **React Native Paper** components (`TextInput`, `Button`, `Card`, `FAB`, `Dialog`, `RadioButton`, etc.) with a custom blue/amber theme (`COLORS` in `src/utils/constants.ts`). The app is portrait-mode and mobile-first, targeting Android and iOS via Expo Go or native builds.

---

## Features

- 📋 **5-Step Learner Registration Wizard** — structured form capturing 125+ fields per learner
- 🔍 **Search & Filter** — quickly find learners by name
- ✏️ **Full CRUD** — add, view, edit, and delete learner records
- 📊 **Analytics Dashboard** — view learner statistics and summaries
- ✅ **Per-Section Validation** — data is validated at each wizard step before advancing
- 📱 **Mobile-First** — portrait-mode UI optimized for field use on Android and iOS

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | React Native 0.74 + TypeScript |
| Runtime | Expo ~51.0 |
| Navigation | React Navigation 6 (Native Stack) |
| UI Kit | React Native Paper 5.12 (Material Design 3) |
| State | React Hooks (`useState` / `useReducer`) |
| Date Picker | `@react-native-community/datetimepicker` |
| Icons | react-native-vector-icons |
| Animations | react-native-reanimated 3 |

---

## Project Structure

```
src/
├── App.tsx                          # Root: Paper + Navigation providers, global learner state
├── types/
│   └── index.ts                     # Learner, LearnerFormData, navigation type definitions
├── utils/
│   ├── constants.ts                 # Region, division, barangay lists, picker options, colours
│   ├── helpers.ts                   # createEmptyFormData()
│   └── validation.ts                # Per-section validators, calculateAge()
├── components/
│   ├── StepIndicator.tsx            # 5-step wizard progress circles
│   └── form/
│       ├── PersonalInfoSection.tsx  # Step 1 — name, sex, birthdate, mother tongue
│       ├── AddressSection.tsx       # Step 2 — barangay, complete address
│       ├── FamilySection.tsx        # Step 3 — father, mother, guardian info
│       ├── EducationSection.tsx     # Step 4 — last grade, reason not in school, employment
│       └── LogisticsSection.tsx     # Step 5 — distance, travel time, preferred session
├── screens/
│   ├── LoginScreen.tsx              # Authentication gate (placeholder)
│   ├── HomeScreen.tsx               # Dashboard / main navigation hub
│   ├── AnalyticsScreen.tsx          # Learner statistics and reporting
│   ├── LearnerListScreen.tsx        # Search, list, delete, FAB (+)
│   ├── LearnerFormScreen.tsx        # 5-step wizard (add / edit)
│   └── LearnerDetailScreen.tsx      # Read-only detail view
└── navigation/
    └── AppNavigator.tsx             # Stack navigator with authentication gating
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or Yarn
- [Expo Go](https://expo.dev/client) app on your mobile device (for quick testing), **or**
- Android Studio (for Android emulator) / Xcode (for iOS simulator)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/JustJhong609/ALS-Mapping-System-AMS.git
cd ALS-Mapping-System-AMS

# 2. Install dependencies
npm install

# 3. Start the Expo dev server
npm start          # Shows a QR code — scan with Expo Go

# Run on a specific platform
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

---

## Screens

### 1. Login
- Username and password entry (placeholder — no real authentication yet)
- Navigates to the Home dashboard on submission

### 2. Home
- Central navigation hub
- Quick links to Learner List and Analytics screens

### 3. Learner List
- Search bar filters learners by name in real time
- Card list showing avatar, full name, age, sex, and address preview
- Tap a card → Detail view | Pencil icon → Edit | Trash icon → Delete (with confirmation dialog)
- FAB (+) → opens the new learner registration form
- Empty state message when no learners exist

### 4. Learner Form (5-Step Wizard)

| Step | Section | Key Fields |
|------|---------|-----------|
| 1 | Personal Info | Last name, First name, Middle name, Sex, Birthdate, Mother Tongue, IP/4Ps status, Religion |
| 2 | Address | Barangay (Ticala, Santo Niño, Dicklum, Tankulan, Lingion, San Miguel), Complete address |
| 3 | Family | Father, Mother, Guardian — names, occupation, contact details |
| 4 | Education | Currently studying, Last grade completed, Reason not attending, Employment status, Monthly income, BLP status |
| 5 | Logistics | Distance (km), Travel time, Mode of transport, Preferred session time, Date mapped |

- Step indicator with numbered progress circles
- Validation runs per section before advancing to the next step
- Confirmation dialog before saving

### 5. Learner Detail
- Read-only summary cards grouped by section (Personal, Address, Family, Education, Logistics)
- Edit button navigates back to the pre-filled form

### 6. Analytics
- Learner statistics and summary data for the mapped barangays

---

## Learner Data Model

Each learner record captures the fields required by **ALS Form 1**, organized into five sections:

| Section | Example Fields |
|---------|---------------|
| Administrative | Region X, Division, District, Calendar Year, Mapped By |
| Personal | Full name, Sex, Birthdate, Age, Mother Tongue, Religion, IP/4Ps status |
| Address | Barangay, Complete address |
| Family | Father/Mother/Guardian names, occupations, contact info |
| Education | Last grade completed, Reason not attending, Employment, Monthly income |
| Logistics | Distance, Travel time, Transport mode, Preferred session time, Date mapped |

---

## Roadmap

- [ ] SQLite / Supabase persistence
- [ ] Offline-first data sync
- [ ] Real user authentication
- [ ] Export to CSV / Excel
- [ ] Barangay-level reporting dashboard

---

## License

This project is developed for educational and government field-use purposes under the **Department of Education — Alternative Learning System (ALS)** program.