// import {
//   createAsyncThunk,
//   createSlice,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import type { User } from "@/types/User";
// import {
//   getCurrentUser,
//   updateProfile,
//   updatePassword,
//   updateAvatar,
// } from "@/app/services/authApi";

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isLoading: true,
// };

// // 🟢 Fetch current user
// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getCurrentUser();
//       return response.user; // Return user for fulfilled action
//     } catch (err) {
//       return rejectWithValue("Unauthorized");
//     }
//   }
// );

// // 🟢 Update profile
// export const updateUserProfile = createAsyncThunk(
//   "auth/updateUserProfile",
//   async (
//     data: { firstName: string; lastName: string; email: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const updatedUser = await updateProfile(data);
//       return updatedUser;
//     } catch (err) {
//       return rejectWithValue("Failed to update profile");
//     }
//   }
// );

// // 🟢 Update password
// export const updateUserPassword = createAsyncThunk(
//   "auth/updateUserPassword",
//   async (
//     data: { currentPassword: string; newPassword: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await updatePassword(data);
//     } catch (err) {
//       return rejectWithValue("Failed to update password");
//     }
//   }
// );

// export const updateUserAvatar = createAsyncThunk(
//   "auth/updateUserAvatar",
//   async (style: string, { rejectWithValue }) => {
//     try {
//       const response = await updateAvatar(style);
//       return response.user;
//     } catch (err) {
//       return rejectWithValue("Failed to update avatar");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ user: User }>) => {
//       state.user = action.payload.user;
//       state.isLoading = false;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isLoading = false;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.isLoading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(updateUserAvatar.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         fetchCurrentUser.fulfilled,
//         (state, action: PayloadAction<User>) => {
//           state.user = action.payload;
//           state.isLoading = false;
//         }
//       )
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       });
//   },
// });

// export const { setCredentials, logout, setLoading } = authSlice.actions;
// export default authSlice.reducer;







// Working but bugs
// import {
//   createAsyncThunk,
//   createSlice,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import type { User } from "@/types/User";
// import {
//   getCurrentUser,
//   updateProfile,
//   updatePassword,
//   updateAvatar,
//   logoutUser,
// } from "@/app/services/authApi";

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isLoading: true,
// };

// export const logoutThunk = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutUser();
//       return;
//     } catch (err) {
//       return rejectWithValue("Failed to logout");
//     }
//   }
// );

// // Fetch current user
// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getCurrentUser();
//       console.log("fetchCurrentUser response:", response);
//       return response.user;
//     } catch (err) {
//       console.error("fetchCurrentUser error:", err);
//       return rejectWithValue("Unauthorized");
//     }
//   }
// );

// // Update profile
// export const updateUserProfile = createAsyncThunk(
//   "auth/updateUserProfile",
//   async (
//     data: { firstName: string; lastName: string; email: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const updatedUser = await updateProfile(data);
//       return updatedUser;
//     } catch (err) {
//       return rejectWithValue("Failed to update profile");
//     }
//   }
// );

// // Update password
// export const updateUserPassword = createAsyncThunk(
//   "auth/updateUserPassword",
//   async (
//     data: { currentPassword: string; newPassword: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await updatePassword(data);
//     } catch (err) {
//       return rejectWithValue("Failed to update password");
//     }
//   }
// );

// // Update avatar
// export const updateUserAvatar = createAsyncThunk(
//   "auth/updateUserAvatar",
//   async (style: string, { rejectWithValue }) => {
//     try {
//       const response = await updateAvatar(style);
//       return response.user;
//     } catch (err) {
//       return rejectWithValue("Failed to update avatar");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutThunk.pending, (state) => {
//         state.isLoading = true; // optional: show loading on logout
//       })
//       .addCase(logoutThunk.fulfilled, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(logoutThunk.rejected, (state) => {
//         state.isLoading = false;
//         // you may want to keep user or clear it here depending on your logic
//       })
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(updateUserAvatar.fulfilled, (state, action) => {
//         state.user = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;




// import {
//   createAsyncThunk,
//   createSlice,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import type { User } from "@/types/User";
// import {
//   getCurrentUser,
//   updateProfile,
//   updatePassword,
//   updateAvatar,
//   logoutUser,
// } from "@/app/services/authApi";

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isLoading: true,
// };

// export const logoutThunk = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutUser();
//       return;
//     } catch {
//       return rejectWithValue("Failed to logout");
//     }
//   }
// );

// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getCurrentUser();
//       return response.user;
//     } catch {
//       return rejectWithValue("Unauthorized");
//     }
//   }
// );


// export const updateUserPassword = createAsyncThunk(
//   "auth/updateUserPassword",
//   async (data: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
//     try {
//       await updatePassword(data);
//     } catch {
//       return rejectWithValue("Failed to update password");
//     }
//   }
// );

// export const updateUserAvatar = createAsyncThunk(
//   "auth/updateUserAvatar",
//   async (style: string, { rejectWithValue }) => {
//     try {
//       const response = await updateAvatar(style);
//       return response.user;
//     } catch {
//       return rejectWithValue("Failed to update avatar");
//     }
//   }
// );


// export const updateUserProfile = createAsyncThunk(
//   "auth/updateUserProfile",
//   async (data: { firstName: string; lastName: string; email: string }, { rejectWithValue }) => {
//     try {
//       return await updateProfile(data);
//     } catch {
//       return rejectWithValue("Failed to update profile");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action: PayloadAction<{ user: User }>) => {
//       state.user = action.payload.user;
//       state.isLoading = false;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(logoutThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logoutThunk.fulfilled, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(logoutThunk.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchCurrentUser.rejected, (state) => {
//         state.user = null;
//         state.isLoading = false;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.user = action.payload;
//       })
//       .addCase(updateUserAvatar.fulfilled, (state, action) => {
//         state.user = action.payload;
//       });
//   },
// });

// export const { logout, setCredentials } = authSlice.actions;
// export default authSlice.reducer;






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
  logoutUser,
} from "@/app/services/authApi";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

// ✅ Logout
export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return;
    } catch {
      return rejectWithValue("Failed to logout");
    }
  }
);

// ✅ Fetch Current User
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.user as User;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

// ✅ Update Profile
export const updateUserProfile = createAsyncThunk<
  User,
  { firstName: string; lastName: string; email: string },
  { rejectValue: string }
>(
  "auth/updateUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      return (await updateProfile(data)) as User;
    } catch {
      return rejectWithValue("Failed to update profile");
    }
  }
);

// ✅ Update Password
export const updateUserPassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>(
  "auth/updateUserPassword",
  async (data, { rejectWithValue }) => {
    try {
      await updatePassword(data);
    } catch {
      return rejectWithValue("Failed to update password");
    }
  }
);

// ✅ Update Avatar
export const updateUserAvatar = createAsyncThunk<User, string, { rejectValue: string }>(
  "auth/updateUserAvatar",
  async (style, { rejectWithValue }) => {
    try {
      const response = await updateAvatar(style);
      return response.user as User;
    } catch {
      return rejectWithValue("Failed to update avatar");
    }
  }
);

// ✅ Slice
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
  },
  extraReducers: (builder) => {
    builder
      // Logout
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      })

      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      })

      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })

      // Update Avatar
      .addCase(updateUserAvatar.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
