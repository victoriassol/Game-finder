import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    contents: {},
    screenshots: {},
    clip: {},
    isLoading: {
        game: true,
        screenshots: true
    },
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
          return error;
        }
      }
  )
  export const fetchClip = createAsyncThunk(
    'game/fetchClip',
    async (id) => {
        try {
          const response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=455a12d11cd1428aa4233ceb7ddb317f`);
          const data = await response.json();
          return data
        } catch (error) {
          return error;
        }
      }
  );
  export const fetchScreenshots = createAsyncThunk(
    'game/fetchScreenshots',
    async (id) => {
        try {
          const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=455a12d11cd1428aa4233ceb7ddb317f`);
          const data = await response.json();
          return data
        } catch (error) {
          return error;
        }
      }
  );

export const cardSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchGame.pending, (state) => {
        state.isLoading.game = true
      })
      builder.addCase(fetchGame.fulfilled, (state, action) => {
        state.isLoading.game = false
        state.contents = action.payload
      })
      builder.addCase(fetchGame.rejected, (state, action) => {
        state.isLoading.game = false
        state.error = action.error.message
      })

      builder.addCase(fetchClip.pending, (state) => {
        state.isLoading = true
      })
      builder.addCase(fetchClip.fulfilled, (state, action) => {
        state.isLoading = false
        state.clip = action.payload
      })
      builder.addCase(fetchClip.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      builder.addCase(fetchScreenshots.pending, (state) => {
        state.isLoading.screenshots = true
      })
      builder.addCase(fetchScreenshots.fulfilled, (state, action) => {
        state.isLoading.screenshots = false
        state.screenshots = action.payload
        state.contents = {...state.contents}
      })
      builder.addCase(fetchScreenshots.rejected, (state, action) => {
        state.isLoading.screenshots = false
        state.error = action.error.message
      })
    },
});

export default cardSlice.reducer;