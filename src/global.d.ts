declare module 'chartist-plugin-tooltips-updated';

type IconsType = 'anchor' | 'dashboard' | 'taskList' | 'trophy' | 'plus' | 'close' | 'calendarF';

type IconsSizesType = 'sm' | 'md' | 'lg';

type TagType = {
    color: string;
    name: string;
};

type ExerciseType = {
    id?: number;
    name: string;
    target?: string | null;
    calories: number;
};

type CountType = {
    id?: number;
    date: string;
    reps?: number | null;
    sets?: number | null;
    kg?: number | null;
    exerciseId?: number;
    exercise?: Partial<ExerciseType>;
};
