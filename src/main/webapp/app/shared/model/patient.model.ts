export interface PatientUser {
  id?: any;
  patID?: string;
  name?: string;
  email?: string;
  mobile?: number;
  glucoseLevel?: string;
  bp?: string;
  pulseRate?: string;
}

export const defaultPatientValue: Readonly<PatientUser> = {
  id: '',
  patID: '',
  name: '',
  email: '',
  mobile: 0,
  glucoseLevel: '',
  bp: '',
  pulseRate: '',
};
