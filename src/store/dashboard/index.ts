import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    loading: boolean;
    errorMessage?: string;
    calories: number[];
    fetched?: boolean;
}

const initialState: DashboardState = {
    loading: false,
    errorMessage: undefined,
    calories: [],
    fetched: false,
};

interface CaloriesSuccessType {
    calories: number[];
    fetched?: boolean;
}

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        calories: (state, action: PayloadAction<CaloriesSuccessType>) => {
            state.loading = false;
            state.calories = action.payload.calories;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, calories } = DashboardSlice.actions;

export default DashboardSlice.reducer;
