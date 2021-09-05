import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { PatientUser, defaultPatientValue } from 'app/shared/model/patient.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { createUser } from 'app/modules/administration/user-management/user-management.reducer';
import { Program } from 'app/shared/model/program.model';

const initialState = {
  loading: false,
  errorMessage: null,
  programs: [] as ReadonlyArray<Program>,
  program: null,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const url = 'http://localhost:8081/mypd';

export const getProgramsForPatient = createAsyncThunk('mypd/fetch_programs', async (patientId: string, thunkAPI) => {
  const requestUrl = url + '/patients/' + patientId;

  const result = axios.get<Program[]>(requestUrl);

  return result;
});

export const getActiveProgramForTreatment = createAsyncThunk('mypd/fetch_active_program_for_today', async (patientId: any, thunkAPI) => {
  const requestUrl = url + '/patients/' + patientId + '/active';

  const result = axios.get<Program>(requestUrl);

  return result;
});

// export const getPatient = createAsyncThunk(
//   'userManagement/fetch_user',
//   async (id: string) => {
//     const requestUrl = url + "/" +id;
//    const result = axios.get<PatientUser>(requestUrl);

//     return result;
//   },
//   { serializeError: serializeAxiosError }
// );

export const createProgram = createAsyncThunk(
  'mypd/create_program',
  async (program: Program, thunkAPI) => {
    const result = await axios.post<Program>(url, program);
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateProgram = createAsyncThunk(
  'mypd/update_program',
  async (program: Program, thunkAPI) => {
    const result = await axios.put<Program>(url, program);

    //return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteProgram = createAsyncThunk(
  'mypd/delete_program',
  async (programId: any, thunkAPI) => {
    const requestUrl = url + '/' + programId;
    const result = await axios.delete<Program>(requestUrl);

    //return result;
  },
  { serializeError: serializeAxiosError }
);

// export const deleteUser = createAsyncThunk(
//   'userManagement/delete_user',
//   async (id: string, thunkAPI) => {
//     const requestUrl = `${adminUrl}/${id}`;
//     const result = await axios.delete<IUser>(requestUrl);
//     thunkAPI.dispatch(getUsersAsAdmin({}));
//     return result;
//   },
//   { serializeError: serializeAxiosError }
// );

export type MyPDState = Readonly<typeof initialState>;

export const MyPDSlice = createSlice({
  name: 'mypd',
  initialState: initialState as MyPDState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProgramsForPatient.fulfilled, (state, action) => {
        state.programs = action.payload.data;
      })
      .addCase(getActiveProgramForTreatment.fulfilled, (state, action) => {
        state.loading = false;

        state.program = action.payload.data;
      })
      .addMatcher(isFulfilled(createProgram), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.programs.push(action.payload.data);
      })
      .addMatcher(isFulfilled(updateProgram), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.patient = action.payload;
      })
      .addMatcher(isFulfilled(deleteProgram), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.patient = action.payload;
      });
  },
});

export const { reset } = MyPDSlice.actions;

// Reducer
export default MyPDSlice.reducer;
