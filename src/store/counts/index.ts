import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
    loading: boolean;
    errorMessage?: string;
    counts: CountType[];
    date?: Date;
    fetched?: boolean;
}

const initialState: CountState = {
    loading: false,
    errorMessage: undefined,
    counts: [],
    date: undefined,
    fetched: false,
};

interface CountsSuccessType {
    counts: CountType[];
    fetched?: boolean;
}
interface AddCountType {
    count: CountType;
}
interface UpdateCountType {
    count: CountType;
}
interface RemoveCountType {
    countId: string;
}

export const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        counts: (state, action: PayloadAction<CountsSuccessType>) => {
            state.loading = false;
            state.counts = action.payload.counts;
            if (action.payload.fetched) state.fetched = action.payload.fetched;
        },
        add: (state, action: PayloadAction<AddCountType>) => {
            state.loading = false;
            state.counts.push({
                ...action.payload.count,
            });
        },
        update: (state, action: PayloadAction<UpdateCountType>) => {
            state.loading = false;
            state.counts = state.counts.map((count) => {
                if (count.id === action.payload.count.id) {
                    return {
                        ...action.payload.count,
                    };
                }
                return count;
            });
        },
        remove: (state, action: PayloadAction<RemoveCountType>) => {
            state.loading = false;
            state.counts = state.counts.filter((count) => {
                return count.id !== action.payload.countId;
            });
        },
        resetCounts: (state) => {
            state.counts = [];
        },
        error: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loading, error, resetCounts, counts, add, update, remove } = countSlice.actions;

export default countSlice.reducer;
