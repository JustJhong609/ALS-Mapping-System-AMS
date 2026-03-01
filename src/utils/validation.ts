import { LearnerFormData, ValidationResult } from '../types';

/**
 * Calculate age from a birthdate.
 */
export const calculateAge = (birthdate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * Generate a simple unique ID (no crypto dependency needed).
 */
export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

/**
 * Validate Section 1 – Personal Information.
 */
export const validatePersonalInfo = (
  data: LearnerFormData,
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!data.middleName.trim()) {
    errors.middleName = 'Middle name is required';
  }
  if (!data.sex) {
    errors.sex = 'Sex is required';
  }
  if (!data.civilStatus) {
    errors.civilStatus = 'Civil status is required';
  }
  if (!data.birthdate) {
    errors.birthdate = 'Birthdate is required';
  }
  if (!data.occupationType) {
    errors.occupationType = 'Occupation type is required';
  }
  if (data.occupationType !== 'None' && !data.employmentStatus) {
    errors.employmentStatus = 'Employment status is required';
  }
  if (!data.monthlyIncome.trim()) {
    errors.monthlyIncome = 'Monthly income is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Section 2 – Address.
 */
export const validateAddress = (data: LearnerFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.barangay) {
    errors.barangay = 'Barangay is required';
  }
  if (!data.completeAddress.trim()) {
    errors.completeAddress = 'Complete address is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Section 3 – Family Information.
 */
export const validateFamily = (data: LearnerFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.roleInFamily) {
    errors.roleInFamily = 'Role in the family is required';
  }
  if (data.isIP === 'Yes' && !data.ipTribe.trim()) {
    errors.ipTribe = 'Please specify the tribe / ethnic group';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Section 4 – Education Background.
 */
export const validateEducation = (data: LearnerFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.isBlp) {
    errors.isBlp = 'Please indicate if learner is for BLP';
  }

  // Reason for Not Attending is always required
  if (!data.reasonForNotAttending) {
    errors.reasonForNotAttending = 'Reason for not attending is required';
  }
  if (data.reasonForNotAttending === 'Others (Specify)' && !data.reasonForNotAttendingOther?.trim()) {
    errors.reasonForNotAttendingOther = 'Please specify the reason';
  }

  // Skip remaining education fields if BLP
  if (data.isBlp !== 'Yes') {
    if (!data.currentlyStudying) {
      errors.currentlyStudying = 'Please indicate if currently studying';
    }
    if (!data.lastGradeCompleted) {
      errors.lastGradeCompleted = 'Last grade completed is required';
    }
    if (!data.interestedInALS) {
      errors.interestedInALS = 'Please indicate interest in ALS A&E Program';
    }
  }
  if (!data.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate Section 5 – Logistics & Schedule.
 */
export const validateLogistics = (data: LearnerFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.distanceKm || parseFloat(data.distanceKm) <= 0) {
    errors.distanceKm = 'Valid distance is required';
  }
  if (!data.travelTime.trim()) {
    errors.travelTime = 'Travel time is required';
  }
  if (!data.transportMode) {
    errors.transportMode = 'Transport mode is required';
  }
  if (!data.preferredSessionTime) {
    errors.preferredSessionTime = 'Preferred session time is required';
  }
  if (!data.mappedBy.trim()) {
    errors.mappedBy = 'Mapper / facilitator name is required';
  }
  if (!data.dateMapped) {
    errors.dateMapped = 'Date mapped is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Run the validator for a specific form section (0-indexed).
 */
export const validateSection = (
  sectionIndex: number,
  data: LearnerFormData,
): ValidationResult => {
  switch (sectionIndex) {
    case 0:
      return validatePersonalInfo(data);
    case 1:
      return validateEducation(data);
    case 2:
      return validateAddress(data);
    case 3:
      return validateFamily(data);
    case 4:
      return validateLogistics(data);
    default:
      return { isValid: true, errors: {} };
  }
};

/**
 * Format a Date object as a readable string.
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
