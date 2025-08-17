
// import apiClient from "@/lib/axios";
// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

// interface NewUsersState {
//   count: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: NewUsersState = {
//   count: 0,
//   loading: false,
//   error: null,
// };

// // ✅ Thunk to fetch new users count
// export const fetchNewUsers = createAsyncThunk<number>(
//   "newUsers/fetchNewUsers",
//   async () => {
//     const response = await apiClient.get<{ count: number }>(`/admin/new-users`);
//     return response.data.count;
//   }
// );

// const newUsersSlice = createSlice({
//   name: "newUsers",
//   initialState,
//   reducers: {
//     setNewUsersCount: (state, action: PayloadAction<number>) => {
//       state.count = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNewUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNewUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.count = action.payload;
//       })
//       .addCase(fetchNewUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? "Failed to fetch new users";
//       });
//   },
// });

// export const { setNewUsersCount } = newUsersSlice.actions;
// export default newUsersSlice.reducer;





import apiClient from "@/lib/axios";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

// -------------------- State Types --------------------
interface AnalyticsState {
  newUsers: {
    count: number;
    loading: boolean;
    error: string | null;
  };
  resumesAnalyzed: {
    data: { month: string; year: number; count: number }[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: AnalyticsState = {
  newUsers: {
    count: 0,
    loading: false,
    error: null,
  },
  resumesAnalyzed: {
    data: [],
    loading: false,
    error: null,
  },
};

// -------------------- Thunks --------------------

// ✅ Fetch new users count
export const fetchNewUsers = createAsyncThunk<number>(
  "analytics/fetchNewUsers",
  async () => {
    const response = await apiClient.get<{ count: number }>(`/admin/new-users`);
    return response.data.count;
  }
);

// ✅ Fetch resumes analyzed count grouped by month
export const fetchResumesAnalyzed = createAsyncThunk<
  { month: string; year: number; count: number }[]
>("analytics/fetchResumesAnalyzed", async () => {
  const response = await apiClient.get<{
    success: boolean;
    data: { month: string; year: number; count: number }[];
  }>(`/admin/resumes-analyzed`);
  return response.data.data;
});

// -------------------- Slice --------------------
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setNewUsersCount: (state, action: PayloadAction<number>) => {
      state.newUsers.count = action.payload;
    },
    setResumesAnalyzed: (
      state,
      action: PayloadAction<{ month: string; year: number; count: number }[]>
    ) => {
      state.resumesAnalyzed.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ----- New Users -----
    builder
      .addCase(fetchNewUsers.pending, (state) => {
        state.newUsers.loading = true;
        state.newUsers.error = null;
      })
      .addCase(fetchNewUsers.fulfilled, (state, action) => {
        state.newUsers.loading = false;
        state.newUsers.count = action.payload;
      })
      .addCase(fetchNewUsers.rejected, (state, action) => {
        state.newUsers.loading = false;
        state.newUsers.error = action.error.message ?? "Failed to fetch new users";
      });

    // ----- Resumes Analyzed -----
    builder
      .addCase(fetchResumesAnalyzed.pending, (state) => {
        state.resumesAnalyzed.loading = true;
        state.resumesAnalyzed.error = null;
      })
      .addCase(fetchResumesAnalyzed.fulfilled, (state, action) => {
        state.resumesAnalyzed.loading = false;
        state.resumesAnalyzed.data = action.payload;
      })
      .addCase(fetchResumesAnalyzed.rejected, (state, action) => {
        state.resumesAnalyzed.loading = false;
        state.resumesAnalyzed.error =
          action.error.message ?? "Failed to fetch resumes analyzed";
      });
  },
});

// -------------------- Exports --------------------
export const { setNewUsersCount, setResumesAnalyzed } = analyticsSlice.actions;
export default analyticsSlice.reducer;
