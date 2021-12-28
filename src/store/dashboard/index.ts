import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    loading: boolean;
    errorMessage?: string;
    calories: number[];
    targets: string[];
    targetCalories: number[];
}

const initialState: DashboardState = {
    loading: false,
    errorMessage: undefined,
    calories: [],
    targets: [],
    targetCalories: [],
};

interface CaloriesSuccessType {
    calories: number[];
    fetched?: boolean;
}

interface TargetsSuccessType {
    targets: string[];
    targetCalories: number[];
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
        targets: (state, action: PayloadAction<TargetsSuccessType>) => {
            state.loading = false;
            state.targets = action.payload.targets;
            state.targetCalories = action.payload.targetCalories;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, calories, targets } = DashboardSlice.actions;

export default DashboardSlice.reducer;
