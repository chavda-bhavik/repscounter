import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddExerciseType = {
  calories?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

export type Calory = {
  calories: Scalars['Float'];
  date: Scalars['String'];
};

export type Count = {
  date: Scalars['String'];
  exercise: Exercise;
  exerciseId: Scalars['String'];
  id: Scalars['String'];
  kg?: Maybe<Scalars['Float']>;
  reps?: Maybe<Scalars['Float']>;
  sets?: Maybe<Scalars['Float']>;
};

export type CountInput = {
  date?: InputMaybe<Scalars['String']>;
  exerciseId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  kg?: InputMaybe<Scalars['Float']>;
  reps?: InputMaybe<Scalars['Float']>;
  sets?: InputMaybe<Scalars['Float']>;
};

export type CountResponseType = {
  entity?: Maybe<Count>;
  errors?: Maybe<Array<FieldError>>;
};

export type Exercise = {
  calories: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
  target?: Maybe<Scalars['String']>;
};

export type ExerciseResponseType = {
  entity?: Maybe<Exercise>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  addCount: CountResponseType;
  addExercise: ExerciseResponseType;
  deleteCount: Count;
  deleteExercise: Exercise;
  updateCount: CountResponseType;
  updateExercise: ExerciseResponseType;
};


export type MutationAddCountArgs = {
  data: CountInput;
};


export type MutationAddExerciseArgs = {
  data: AddExerciseType;
};


export type MutationDeleteCountArgs = {
  id: Scalars['String'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCountArgs = {
  data: CountInput;
  id: Scalars['String'];
};


export type MutationUpdateExerciseArgs = {
  data: AddExerciseType;
  id: Scalars['String'];
};

export type Query = {
  calories: Array<Calory>;
  count: Count;
  counts: Array<Count>;
  exercise: Exercise;
  exercises: Array<Exercise>;
  targets: Array<Target>;
};


export type QueryCaloriesArgs = {
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
};


export type QueryCountArgs = {
  id: Scalars['String'];
};


export type QueryCountsArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  exerciseId?: InputMaybe<Scalars['String']>;
};


export type QueryExerciseArgs = {
  id: Scalars['String'];
};


export type QueryTargetsArgs = {
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
};

export type Target = {
  calories: Scalars['Float'];
  target: Scalars['String'];
};

export type CountFieldsFragment = { id: string, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: string };

export type ExerciseFieldsFragment = { id: string, name: string, target?: string | null | undefined, calories: number };

export type AddCountMutationVariables = Exact<{
  data: CountInput;
}>;


export type AddCountMutation = { addCount: { errors?: Array<{ message: string, field: string }> | null | undefined, entity?: { id: string, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: string } | null | undefined } };

export type AddExerciseMutationVariables = Exact<{
  data: AddExerciseType;
}>;


export type AddExerciseMutation = { addExercise: { entity?: { id: string, name: string, target?: string | null | undefined, calories: number } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type DeleteCountMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCountMutation = { deleteCount: { id: string, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: string } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExerciseMutation = { deleteExercise: { id: string, name: string, target?: string | null | undefined, calories: number } };

export type UpdateCountMutationVariables = Exact<{
  data: CountInput;
  id: Scalars['String'];
}>;


export type UpdateCountMutation = { updateCount: { entity?: { id: string, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: string } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type UpdateExerciseMutationVariables = Exact<{
  data: AddExerciseType;
  id: Scalars['String'];
}>;


export type UpdateExerciseMutation = { updateExercise: { errors?: Array<{ field: string, message: string }> | null | undefined, entity?: { id: string, name: string, target?: string | null | undefined, calories: number } | null | undefined } };

export type CaloriesQueryVariables = Exact<{
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
}>;


export type CaloriesQuery = { calories: Array<{ calories: number, date: string }> };

export type CountsQueryVariables = Exact<{
  exerciseId?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
}>;


export type CountsQuery = { counts: Array<{ id: string, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: string }> };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { exercises: Array<{ id: string, name: string, target?: string | null | undefined, calories: number }> };

export type TargetsQueryVariables = Exact<{
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
}>;


export type TargetsQuery = { targets: Array<{ target: string, calories: number }> };

export const CountFieldsFragmentDoc = gql`
    fragment CountFields on Count {
  id
  date
  sets
  reps
  kg
  exerciseId
}
    `;
export const ExerciseFieldsFragmentDoc = gql`
    fragment ExerciseFields on Exercise {
  id
  name
  target
  calories
}
    `;
export const AddCountDocument = gql`
    mutation addCount($data: CountInput!) {
  addCount(data: $data) {
    errors {
      message
      field
    }
    entity {
      ...CountFields
    }
  }
}
    ${CountFieldsFragmentDoc}`;
export const AddExerciseDocument = gql`
    mutation AddExercise($data: AddExerciseType!) {
  addExercise(data: $data) {
    entity {
      ...ExerciseFields
    }
    errors {
      field
      message
    }
  }
}
    ${ExerciseFieldsFragmentDoc}`;
export const DeleteCountDocument = gql`
    mutation DeleteCount($id: String!) {
  deleteCount(id: $id) {
    ...CountFields
  }
}
    ${CountFieldsFragmentDoc}`;
export const DeleteExerciseDocument = gql`
    mutation DeleteExercise($id: String!) {
  deleteExercise(id: $id) {
    ...ExerciseFields
  }
}
    ${ExerciseFieldsFragmentDoc}`;
export const UpdateCountDocument = gql`
    mutation updateCount($data: CountInput!, $id: String!) {
  updateCount(data: $data, id: $id) {
    entity {
      ...CountFields
    }
    errors {
      field
      message
    }
  }
}
    ${CountFieldsFragmentDoc}`;
export const UpdateExerciseDocument = gql`
    mutation UpdateExercise($data: AddExerciseType!, $id: String!) {
  updateExercise(data: $data, id: $id) {
    errors {
      field
      message
    }
    entity {
      ...ExerciseFields
    }
  }
}
    ${ExerciseFieldsFragmentDoc}`;
export const CaloriesDocument = gql`
    query calories($dateEnd: DateTime!, $dateStart: DateTime!) {
  calories(dateEnd: $dateEnd, dateStart: $dateStart) {
    calories
    date
  }
}
    `;
export const CountsDocument = gql`
    query counts($exerciseId: String, $date: DateTime) {
  counts(exerciseId: $exerciseId, date: $date) {
    ...CountFields
  }
}
    ${CountFieldsFragmentDoc}`;
export const ExercisesDocument = gql`
    query exercises {
  exercises {
    ...ExerciseFields
  }
}
    ${ExerciseFieldsFragmentDoc}`;
export const TargetsDocument = gql`
    query targets($dateEnd: DateTime!, $dateStart: DateTime!) {
  targets(dateEnd: $dateEnd, dateStart: $dateStart) {
    target
    calories
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addCount(variables: AddCountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCountMutation>(AddCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addCount');
    },
    AddExercise(variables: AddExerciseMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddExerciseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddExerciseMutation>(AddExerciseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddExercise');
    },
    DeleteCount(variables: DeleteCountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCountMutation>(DeleteCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteCount');
    },
    DeleteExercise(variables: DeleteExerciseMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteExerciseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExerciseMutation>(DeleteExerciseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteExercise');
    },
    updateCount(variables: UpdateCountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateCountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCountMutation>(UpdateCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateCount');
    },
    UpdateExercise(variables: UpdateExerciseMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateExerciseMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateExerciseMutation>(UpdateExerciseDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateExercise');
    },
    calories(variables: CaloriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CaloriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CaloriesQuery>(CaloriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'calories');
    },
    counts(variables?: CountsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CountsQuery>(CountsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'counts');
    },
    exercises(variables?: ExercisesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExercisesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExercisesQuery>(ExercisesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'exercises');
    },
    targets(variables: TargetsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TargetsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TargetsQuery>(TargetsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'targets');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;