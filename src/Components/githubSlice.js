import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('github/fetchUser', async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
});

export const fetchRepos = createAsyncThunk('github/fetchRepos', async (username) => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
});

const githubSlice = createSlice({
    name: 'github',
    initialState: {
        user: null,
        repos: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(fetchRepos.fulfilled, (state, action) => {
            state.repos = action.payload;
        });
    },
});

export default githubSlice.reducer;