export interface Treatment {
  id?: any;
  date: string;
  startTime: string;
  endTime: string;
  fillAmount: number;
  drainAmount: number;
  uf?: number;
  patientPatId: string;
  progarmId: number;
}

export const defaultProgramValue: Readonly<Treatment> = {
  id: '',
  date: '',
  startTime: '',
  endTime: '',
  fillAmount: null,
  drainAmount: null,
  uf: null,
  patientPatId: '',
  progarmId: null,
};
