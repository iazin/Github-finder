import { configureStore } from '@reduxjs/toolkit';
import githubReducer from './githubSlice';

export default configureStore({
    reducer: {
        github: githubReducer,
    },
});