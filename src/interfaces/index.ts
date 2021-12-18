export type IconsType = 'anchor' | 'dashboard' | 'taskList' | 'trophy' | 'plus' | 'close';

export type IconsSizesType = 'sm' | 'md' | 'lg';

export type TagType = {
    color: string;
    name: string;
};

export type ExerciseType = {
    id?: number;
    name: string;
    target?: string | null;
    calories: number;
};

export type CountType = {
    id?: number;
    date: string;
    reps?: number | null;
    sets?: number | null;
    kg?: number | null;
    exerciseId?: number;
    exercise?: Partial<ExerciseType>;
};
