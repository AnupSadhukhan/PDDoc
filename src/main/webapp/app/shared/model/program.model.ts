export interface Program {
  id?: any;
  name?: string;
  fillAmount?: number;
  patientId?: number;
  isActive?: boolean;
}

export const defaultProgramValue: Readonly<Program> = {
  id: '',
  name: '',
  fillAmount: null,
  patientId: null,
  isActive: false,
};
