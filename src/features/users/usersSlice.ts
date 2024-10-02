import { getUsers } from "@/services/user/userService";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
  };
  email: string;
  login: {
    uuid: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: unknown, { rejectWithValue }) => {
    try {
      const users = await getUsers(params);
      return users;
    } catch (error: unknown) {
      return rejectWithValue(error?.message || "Error fetching users");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.login.uuid === action.payload.login.uuid
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.login.uuid !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { editUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
