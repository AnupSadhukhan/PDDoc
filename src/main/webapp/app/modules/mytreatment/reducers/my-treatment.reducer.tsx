import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { PatientUser, defaultPatientValue } from 'app/shared/model/patient.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { createUser } from 'app/modules/administration/user-management/user-management.reducer';
import { Program } from 'app/shared/model/program.model';
import { Treatment } from 'app/shared/model/treatment.model';

const initialState = {
  loading: false,
  errorMessage: null,
  treatmentDataList: [] as ReadonlyArray<Treatment>,
  treatmentData: null,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const url = 'http://localhost:8081/my-treatments';

export const saveTreatmentData = createAsyncThunk('my-treatment/save_treatment_data', async (treatmentData: any, thunkAPI) => {
  const requestUrl = url;

  const result = await axios.post<Treatment>(requestUrl, treatmentData);

  return result;
});

export const getLastSevenDaysTreatmentData = createAsyncThunk(
  'my-treatment/fetch_last_seven_days_treatment_data',
  async (patientId: string, thunkAPI) => {
    const requestUrl = url + '/filter/' + patientId;
    const result = await axios.get<Treatment[]>(requestUrl);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export type MyPDState = Readonly<typeof initialState>;

export const MyTreatmentSlice = createSlice({
  name: 'my-treatment',
  initialState: initialState as MyPDState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveTreatmentData.fulfilled, (state, action) => {
        state.treatmentData = action.payload.data;
      })
      .addCase(getLastSevenDaysTreatmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.treatmentDataList = action.payload.data;
      });
  },
});

export const { reset } = MyTreatmentSlice.actions;

// Reducer
export default MyTreatmentSlice.reducer;
