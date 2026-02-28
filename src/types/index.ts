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
  birthdate: Date;
  age: number;
  motherTongue: string;
  ipEthnicGroup?: string;
  religion?: string;

  // Address
  barangay: string;
  completeAddress: string;

  // Family
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  guardianOccupation?: string;

  // Educational Background
  lastGradeCompleted: string;
  reasonForNotAttending: string;

  // Logistics
  distanceKm: number;
  travelTime: string;
  transportMode: string;
  preferredSessionTime: string;
}

/**
 * Navigation param list for the stack navigator.
 */
export type RootStackParamList = {
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
  birthdate: Date | null;
  age: number | null;
  motherTongue: string;
  ipEthnicGroup: string;
  religion: string;

  // Address
  barangay: string;
  completeAddress: string;

  // Family
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianOccupation: string;

  // Educational Background
  lastGradeCompleted: string;
  reasonForNotAttending: string;

  // Logistics
  distanceKm: string;
  travelTime: string;
  transportMode: string;
  preferredSessionTime: string;
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
