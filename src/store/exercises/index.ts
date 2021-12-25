import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExercisesState {
    loading: boolean;
    errorMessage?: string;
    exercises: ExerciseType[];
    fetched?: boolean;
}

const initialState: ExercisesState = {
    loading: false,
    errorMessage: undefined,
    exercises: [],
    fetched: false,
};

interface ExercisesSuccessType {
    exercises: ExerciseType[];
    fetched?: boolean;
}
interface AddExerciseType {
    exercise: ExerciseType;
}
interface UpdateExerciseType {
    exercise: ExerciseType;
}
interface RemoveExerciseType {
    exerciseId: number;
}

export const exerciseSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        exercises: (state, action: PayloadAction<ExercisesSuccessType>) => {
            state.loading = false;
            state.exercises = action.payload.exercises;
            if (action.payload.fetched) state.fetched = action.payload.fetched;
        },
        add: (state, action: PayloadAction<AddExerciseType>) => {
            state.loading = false;
            state.exercises.push({
                ...action.payload.exercise,
            });
        },
        update: (state, action: PayloadAction<UpdateExerciseType>) => {
            state.loading = false;
            state.exercises = state.exercises.map((exercise) => {
                if (exercise.id === action.payload.exercise.id) {
                    return {
                        ...action.payload.exercise,
                    };
                }
                return exercise;
            });
        },
        remove: (state, action: PayloadAction<RemoveExerciseType>) => {
            state.loading = false;
            state.exercises = state.exercises.filter((exercise) => {
                return exercise.id !== action.payload.exerciseId;
            });
        },
        resetExercises: (state) => {
            state.exercises = [];
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, resetExercises, exercises, add, update, remove } =
    exerciseSlice.actions;

export default exerciseSlice.reducer;
