import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    loading: boolean;
    errorMessage?: string;
    calories: number[];

    targetsLoading: boolean;
    targetsErrorMessage?: string;
    targets: string[];
    targetCalories: number[];
}

const initialState: DashboardState = {
    loading: false,
    errorMessage: undefined,
    calories: [],

    targetsLoading: false,
    targetsErrorMessage: undefined,
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
            state.errorMessage = undefined;
            state.calories = [];
        },
        targetsLoading: (state) => {
            state.targetsLoading = true;
            state.targetsErrorMessage = undefined;
            state.targets = [];
            state.targetCalories = [];
        },
        calories: (state, action: PayloadAction<CaloriesSuccessType>) => {
            state.loading = false;
            state.calories = action.payload.calories;
        },
        targets: (state, action: PayloadAction<TargetsSuccessType>) => {
            state.targetsLoading = false;
            state.targets = action.payload.targets;
            state.targetCalories = action.payload.targetCalories;
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        targetsError: (state, action) => {
            state.targetsLoading = false;
            state.targetsErrorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, calories, targets, targetsLoading, targetsError } =
    DashboardSlice.actions;

export default DashboardSlice.reducer;
