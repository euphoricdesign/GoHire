import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JobsPostData, JobsData, FetchError } from '../reducers/jobsReducers/jobsTypes';

export const createJob = createAsyncThunk<JobsData, JobsPostData, { rejectValue: FetchError }>(
    'jobs/createJob',
    async (newJob: JobsPostData, { rejectWithValue }) => {
        try {
            const response = await axios.post('jobs/createJob', newJob);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = 'Error creating job: ' + error.message;
                return rejectWithValue({ message: errorMessage });
            }
            throw error;
        }
    }
);

export const getAllJobs = createAsyncThunk<JobsData[], void, { rejectValue: FetchError }>(
    'jobs/getAllJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("")
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = 'Error getting all jobs: ' + error.message;
                return rejectWithValue({ message: errorMessage });
            }
            throw error;
        }
    }
);

// export const cancelarTurno = createAsyncThunk(
//     'appointment/cancelarTurno',
//     async (id) => {
//         try {

//             await axios.put(`http://localhost:3001/appointments/cancel/${id}`);
//             return id;
//         } catch (error) {
//             throw new Error('Error al cancelar el turno: ' + error.message);
//         }
//     }
// );