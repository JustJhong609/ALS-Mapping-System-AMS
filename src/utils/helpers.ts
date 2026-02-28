import { LearnerFormData } from '../types';
import { REGION, DIVISION, DISTRICT } from './constants';

/**
 * Returns an empty LearnerFormData with administrative fields pre-filled.
 */
export const createEmptyFormData = (): LearnerFormData => ({
  // Administrative (auto-filled)
  region: REGION,
  division: DIVISION,
  district: DISTRICT,
  calendarYear: new Date().getFullYear(),
  mappedBy: '',

  // Personal Information
  lastName: '',
  firstName: '',
  middleName: '',
  nameExtension: '',
  sex: '',
  birthdate: null,
  age: null,
  motherTongue: '',
  ipEthnicGroup: '',
  religion: '',

  // Address
  barangay: '',
  completeAddress: '',

  // Family
  fatherName: '',
  motherName: '',
  guardianName: '',
  guardianOccupation: '',

  // Educational Background
  lastGradeCompleted: '',
  reasonForNotAttending: '',

  // Logistics
  distanceKm: '',
  travelTime: '',
  transportMode: '',
  preferredSessionTime: '',
});
