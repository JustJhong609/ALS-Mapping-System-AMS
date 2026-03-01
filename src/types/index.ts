/**
 * Learner data model based on Official ALS Form 1 data elements.
 */
export interface Learner {
  // Internal ID for list management
  id: string;

  // Administrative
  region: string;
  division: string;
  district: string;
  calendarYear: number;
  mappedBy: string;

  // Personal Information
  lastName: string;
  firstName: string;
  middleName: string;
  nameExtension?: string;
  sex: 'Male' | 'Female';
  civilStatus: string;
  birthdate: Date;
  age: number;
  motherTongue: string;
  isIP: boolean;
  ipTribe?: string;
  religion?: string;
  is4PsMember: boolean;

  // Address
  barangay: string;
  completeAddress: string;

  // Family
  roleInFamily: string;
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  guardianOccupation?: string;

  // Educational Background
  currentlyStudying: string;
  lastGradeCompleted: string;
  reasonForNotAttending: string;
  reasonForNotAttendingOther?: string;
  isBlp: boolean;
  occupationType: string;
  employmentStatus: string;
  monthlyIncome: string;
  interestedInALS: string;
  contactNumber: string;

  // Logistics
  distanceKm: number;
  travelTime: string;
  transportMode: string;
  preferredSessionTime: string;
  dateMapped: Date;
}

/**
 * Navigation param list for the stack navigator.
 */
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Analytics: undefined;
  LearnerList: undefined;
  LearnerForm: { learner?: Learner };
  LearnerDetail: { learner: Learner };
};

/**
 * Form data matches Learner but with optional/string fields for form state.
 */
export interface LearnerFormData {
  // Administrative (auto-filled)
  region: string;
  division: string;
  district: string;
  calendarYear: number;
  mappedBy: string;

  // Personal Information
  lastName: string;
  firstName: string;
  middleName: string;
  nameExtension: string;
  sex: 'Male' | 'Female' | '';
  civilStatus: string;
  birthdate: Date | null;
  age: number | null;
  motherTongue: string;
  isIP: string;
  ipTribe: string;
  religion: string;
  is4PsMember: string;

  // Address
  barangay: string;
  completeAddress: string;

  // Family
  roleInFamily: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianOccupation: string;

  // Educational Background
  currentlyStudying: string;
  lastGradeCompleted: string;
  reasonForNotAttending: string;
  reasonForNotAttendingOther: string;
  isBlp: string;
  occupationType: string;
  employmentStatus: string;
  monthlyIncome: string;
  interestedInALS: string;
  contactNumber: string;

  // Logistics
  distanceKm: string;
  travelTime: string;
  transportMode: string;
  preferredSessionTime: string;
  dateMapped: Date | null;
}

/**
 * Validation error map with field name → error message.
 */
export type ValidationErrors = Record<string, string>;

/**
 * Validation result.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
