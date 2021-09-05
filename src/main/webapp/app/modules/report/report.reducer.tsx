import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
};

// const apiUrl = 'api/users';
// const adminUrl = 'api/admin/users';
const url = 'http://localhost:8081/reports';

// // Async Actions

// export const getUsers = createAsyncThunk('userManagement/fetch_users', async ({ page, size, sort }: IQueryParams) => {
//   const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
//   return axios.get<IUser[]>(requestUrl);
// });

export const generateReportForAllPatient = createAsyncThunk('report/generate_report_for_all_patients', async () => {
  const result = axios.get<any>(url + '/all');

  return result;
});

// export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
//   return axios.get<any[]>(`api/authorities`);
// });

export const generateReportForSelectedPatient = createAsyncThunk(
  'report/generate_report_for_patients',
  async (ids: any) => {
    const result = axios.get<any>(url, {
      params: {
        id: ids,
      },
    });

    return result;
  },
  { serializeError: serializeAxiosError }
);

// export const createPatient = createAsyncThunk(
//   'patientManagement/create_patient',
//   async (patient: PatientUser, thunkAPI) => {
//     const result = await axios.post<PatientUser>(url, patient);
//     const words = result.data.name.split(" ");
//     const firstName = words.splice(0,1).join("");
//     const lastName = words.join(" ");
//     const userDetailsForNewAccount = {
//       login : result.data.patID,
//       firstName,
//       lastName,
//       email : patient.email,
//       activated : true,
//       authorities : ["ROLE_USER"],
//       langKey : "eu",
//       password : "password"
//     }
//     thunkAPI.dispatch(createUser(userDetailsForNewAccount));
//     thunkAPI.dispatch(getPatients());

//     return result;
//   },
//   { serializeError: serializeAxiosError }
// );

// export const updatePatient = createAsyncThunk(
//   'userManagement/update_user',
//   async (patient: PatientUser, thunkAPI) => {
//     const result = await axios.put<PatientUser>(url, patient);

//     return patient.id;
//   },
//   { serializeError: serializeAxiosError }
// );

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

export type ReportState = Readonly<typeof initialState>;

export const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(generateReportForAllPatient.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(generateReportForSelectedPatient.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = ReportSlice.actions;

// Reducer
export default ReportSlice.reducer;
