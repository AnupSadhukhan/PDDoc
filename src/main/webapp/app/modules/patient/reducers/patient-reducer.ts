import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { PatientUser, defaultPatientValue } from 'app/shared/model/patient.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { createUser } from 'app/modules/administration/user-management/user-management.reducer';

const initialState = {
  loading: false,
  errorMessage: null,
  patients: [] as ReadonlyArray<PatientUser>,
  authorities: [] as any[],
  patient: defaultPatientValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const url = 'http://localhost:8081/patients';

export const getPatients = createAsyncThunk('patientManagement/fetch_patients', async () => {
  const result = axios.get<PatientUser[]>(url);

  return result;
});

export const getPatient = createAsyncThunk(
  'userManagement/fetch_user',
  async (id: string) => {
    const requestUrl = url + '/' + id;
    const result = axios.get<PatientUser>(requestUrl);

    return result;
  },
  { serializeError: serializeAxiosError }
);

export const createPatient = createAsyncThunk(
  'patientManagement/create_patient',
  async (patient: PatientUser, thunkAPI) => {
    const result = await axios.post<PatientUser>(url, patient);
    const words = result.data.name.split(' ');
    const firstName = words.splice(0, 1).join('');
    const lastName = words.join(' ');
    const userDetailsForNewAccount = {
      login: result.data.patID,
      firstName,
      lastName,
      email: patient.email,
      activated: true,
      authorities: ['ROLE_USER'],
      langKey: 'eu',
      password: 'password',
    };
    thunkAPI.dispatch(createUser(userDetailsForNewAccount));
    thunkAPI.dispatch(getPatients());

    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updatePatient = createAsyncThunk(
  'userManagement/update_user',
  async (patient: PatientUser, thunkAPI) => {
    const result = await axios.put<PatientUser>(url, patient);

    return patient;
  },
  { serializeError: serializeAxiosError }
);

export type PatientManagementState = Readonly<typeof initialState>;

export const PatientManagementSlice = createSlice({
  name: 'patientManagement',
  initialState: initialState as PatientManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPatients.fulfilled, (state, action) => {
        state.patients = action.payload.data;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload.data;
      })
      .addMatcher(isFulfilled(createPatient), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.patients.push(action.payload.data);
      })
      .addMatcher(isFulfilled(updatePatient), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.patient = action.payload;
      });
  },
});

export const { reset } = PatientManagementSlice.actions;

// Reducer
export default PatientManagementSlice.reducer;
