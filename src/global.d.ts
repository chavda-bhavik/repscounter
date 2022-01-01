declare module 'chartist-plugin-tooltips-updated';

type IconsType = | 'anchor'
    | 'dashboard'
    | 'taskList'
    | 'trophy'
    | 'plus'
    | 'close'
    | 'calendarF'
    | 'alert';

type IconsSizesType = 'sm' | 'md' | 'lg';

type TagType = {
    color: string;
    name: string;
};

type ExerciseType = {
    id?: string;
    name: string;
    target?: string | null;
    calories: number;
};

type CountType = {
    id?: string;
    date: string;
    reps?: number | null;
    sets?: number | null;
    kg?: number | null;
    exerciseId?: string;
    exercise?: Partial<ExerciseType>;
};
