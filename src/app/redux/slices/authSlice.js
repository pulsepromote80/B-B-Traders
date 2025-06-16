const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
import {
  doLogin,
  getRequest,
  postRequestWithToken,
  setToken,
  setUserId,postRequestWithLoginId
} from "../../api/auth";

const API_ENDPOINTS = {
  APP_LOGIN: "/Authentication/appLogin",
  USER_REGISTRATION:"/Authentication/userRegistration",
  GET_REFREAL_ID_BY_USER_EMAIL:"/Authentication/getRefreralIdByUserEmail",
  FORGOT_PASSWORD: "/Authentication/forgotPassword",
  UPDATE_USER_PROFILE: "/Authentication/updateUserProfile",
  SEND_OTP: "/Authentication/sendOtp",
  GET_USER_KYC_BY_LOGIN_ID: "/Authentication/GetUserKycByLoginId",
  UPDATE_PASSWORD: "/Authentication/changePassword"
};



export const appLogin = createAsyncThunk(
  "auth/appLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.APP_LOGIN,
        data
      );
      const token = response.token || response.data?.token;
      const UserId = response.data?.userId;
      setToken(token);
      setUserId(UserId);
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch auth data"
      );
    }
  }
);

export const userRegistration = createAsyncThunk(
  "auth/userRegistration",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.USER_REGISTRATION,
        data
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getRefreralIdByUserEmail = createAsyncThunk(
  "auth/getRefreralIdByUserEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        `${API_ENDPOINTS.GET_REFREAL_ID_BY_USER_EMAIL}?userEmail=${data}`
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(errorMessage);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.FORGOT_PASSWORD,
        data
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.UPDATE_USER_PROFILE,
        data
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to update password");
    }
  }
);

export const updatePassword = createAsyncThunk(

  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.UPDATE_PASSWORD,
        data
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to UPDATE password");
    }
  }
);

export const sendOtp = createAsyncThunk(

  "auth/sendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithToken(
        API_ENDPOINTS.SEND_OTP,
        data
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const getUserKycByLoginId = createAsyncThunk(
  "auth/getUserKycByLoginId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithLoginId(
        `${API_ENDPOINTS.GET_USER_KYC_BY_LOGIN_ID}?loginId=${data}`
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(errorMessage);
    }
  }
);

  const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    status: null,
    loading: false,
    error: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(appLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        doLogin(action.payload);
        state.error = null;
      })

      .addCase(appLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(userRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })

      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(getRefreralIdByUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefreralIdByUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })

      .addCase(getRefreralIdByUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })    
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(getUserKycByLoginId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserKycByLoginId.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })

      .addCase(getUserKycByLoginId.rejected, (state, action) => {
         state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
        state.error = null;
      })    
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
  }
);

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
