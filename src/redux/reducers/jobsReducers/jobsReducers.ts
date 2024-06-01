import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createJob, getAllJobs } from '@/redux/actions/jobsActions';
import { JobsState, Jobs,JobsData } from './jobsTypes';

const initialState: JobsState = {
    allJobs: [],
    jobDetail: null,
    loading: false,
    error: null,
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllJobs.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(
                getAllJobs.fulfilled,
                (state, action: PayloadAction<Jobs>) => {
                    state.loading = false
                    state.allJobs = action.payload
                    state.error = null
                },
            )
            .addCase(getAllJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'An error occurred'
            })
            .addCase( createJob.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(
                createJob.fulfilled,
                (state, action: PayloadAction<JobsData>) => {
                    state.loading = false
                    state.allJobs.push(action.payload)
                    state.error = null
                },
            )
            .addCase( createJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'An error occurred'
            })
    },
});

export default jobsSlice.reducer;