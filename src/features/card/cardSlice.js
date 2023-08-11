import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    contents: {},
    isLoading: false,
    error: null,
};

export const fetchGame = createAsyncThunk(
    'game/fetchGame',
    async (id) => {
        try {
          const response = await fetch(`https://api.rawg.io/api/games/${id}?key=455a12d11cd1428aa4233ceb7ddb317f`);
          const data = await response.json();
          return data
        } catch (error) {
          return;
        }
      }
  )

export const cardSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchGame.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(fetchGame.fulfilled, (state, action) => {
        state.isLoading = false
        state.contents = action.payload
      })
      builder.addCase(fetchGame.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
    },
});

export default cardSlice.reducer;