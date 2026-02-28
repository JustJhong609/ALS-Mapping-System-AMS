// ──────────────────────────────────────────────
// ALS Form 1 – Manolo Fortich District I
// Fixed values & dropdown options
// ──────────────────────────────────────────────

/** Pre-filled administrative fields */
export const REGION = 'Region X (Northern Mindanao)';
export const DIVISION = 'Bukidnon Division';
export const DISTRICT = 'Manolo Fortich District I';

/** Sex radio options */
export const SEX_OPTIONS: readonly string[] = ['Male', 'Female'];

/** Civil status options */
export const CIVIL_STATUS_OPTIONS: readonly string[] = [
  'Single',
  'Married',
  'Widow/er',
  'Separated',
  'Live-in',
];

/** Role in the family (relationship to household head) */
export const FAMILY_ROLE_OPTIONS: readonly string[] = [
  'Head',
  'Spouse',
  'Daughter/Son',
  'Stepson/Stepdaughter',
  'Son-in-law/Daughter-in-law',
  'Grandson/Granddaughter',
  'Father/Mother',
  'Brother/Sister',
  'Uncle/Aunt',
  'Nephew/Niece',
  'Houseboy/Housegirl',
  'Others (Non-relative/Boarder)',
];

/** Currently studying options */
export const CURRENTLY_STUDYING_OPTIONS: readonly string[] = ['Yes', 'No'];

/** Mother-tongue dropdown */
export const MOTHER_TONGUE_OPTIONS: readonly string[] = [
  'Tagalog',
  'Kapampangan',
  'Pangasinense',
  'Iloko',
  'Bikol',
  'Cebuano',
  'Hiligaynon',
  'Waray',
  'Tausug',
  'Maguindanaoan',
  'Maranao',
  'Chabacano',
  'Ybanag',
  'Ivatan',
  'Samal',
  'Aklanon',
  'Kinaray-a',
  'Yakan',
  'Surigaonon',
];

/** Reason for not attending school */
export const REASON_OPTIONS: readonly string[] = [
  'Schools are very far',
  'No school within the barangay',
  'No regular transportation',
  'High cost of education',
  'Illness / Disability',
  'Housekeeping / Housework',
  'Employment / Looking for work',
  'Lack of personal interest',
  'Cannot cope with school work',
];

/** Barangays in Manolo Fortich District I */
export const BARANGAY_OPTIONS: readonly string[] = [
  'Ticala',
  'Santo Niño',
  'Dicklum',
  'Tankulan',
  'Lingion',
  'San Miguel',
];

/** Transport mode options */
export const TRANSPORT_OPTIONS: readonly string[] = [
  'Walking',
  'Tricycle',
  'Habal-habal',
  'Jeepney',
  'Multicab',
  'Private Vehicle',
  'Bicycle',
];

/** Last grade / level completed (Educational Attainment) */
export const GRADE_LEVELS: readonly string[] = [
  'G1 – G6 (Elementary)',
  '1st Year HS / Grade 7',
  '2nd Year HS / Grade 8',
  '3rd Year HS / Grade 9',
  '4th Year HS / Grade 10',
  'High School Graduate',
  'Grade 11 Vocational',
  'Senior HS Graduate',
];

/** Yes/No options (reusable) */
export const YES_NO_OPTIONS: readonly string[] = ['Yes', 'No'];

/** Preferred session time options */
export const SESSION_TIME_OPTIONS: readonly string[] = [
  'Morning (8:00 AM – 12:00 PM)',
  'Afternoon (1:00 PM – 5:00 PM)',
  'Evening (6:00 PM – 9:00 PM)',
  'Weekends Only',
];

/** Form section titles for the wizard */
export const FORM_SECTIONS: readonly string[] = [
  'Personal Information',
  'Education Background',
  'Address',
  'Family Information',
  'Logistics & Schedule',
];

/** App theme colours */
export const COLORS = {
  primary: '#1565C0',
  primaryDark: '#0D47A1',
  primaryLight: '#42A5F5',
  accent: '#FF6F00',
  surface: '#FFFFFF',
  background: '#F5F5F5',
  error: '#D32F2F',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  success: '#2E7D32',
  white: '#FFFFFF',
} as const;
