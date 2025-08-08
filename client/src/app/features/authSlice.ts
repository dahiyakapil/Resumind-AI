import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import {
  getCurrentUser,
  updateProfile,
  updatePassword,
  updateAvatar,
} from "@/app/services/authApi";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

// 🟢 Fetch current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await getCurrentUser();
      dispatch(setCredentials({ user: response.user }));
      return response.user;
    } catch (err) {
      dispatch(setLoading(false));
      return rejectWithValue("Unauthorized");
    }
  }
);

// 🟢 Update profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    data: { firstName: string; lastName: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await updateProfile(data);
      return updatedUser;
    } catch (err) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

// 🟢 Update password
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (
    data: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await updatePassword(data);
    } catch (err) {
      return rejectWithValue("Failed to update password");
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (style: string, { rejectWithValue }) => {
    try {
      const response = await updateAvatar(style);
      return response.user;
    } catch (err) {
      return rejectWithValue("Failed to update avatar");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })
     .addCase(updateUserAvatar.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
