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
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

export type Count = {
  date: Scalars['String'];
  exercise: Exercise;
  exerciseId: Scalars['Float'];
  id: Scalars['Float'];
  kg?: Maybe<Scalars['Float']>;
  reps?: Maybe<Scalars['Float']>;
  sets?: Maybe<Scalars['Float']>;
};

export type CountInput = {
  date?: InputMaybe<Scalars['String']>;
  exerciseId?: InputMaybe<Scalars['Float']>;
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
  id: Scalars['Float'];
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
  id: Scalars['Int'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCountArgs = {
  data: CountInput;
  id: Scalars['Int'];
};


export type MutationUpdateExerciseArgs = {
  data: AddExerciseType;
  id: Scalars['Int'];
};

export type Query = {
  count: Count;
  counts: Array<Count>;
  exercise: Exercise;
  exercises: Array<Exercise>;
};


export type QueryCountArgs = {
  id: Scalars['Int'];
};


export type QueryCountsArgs = {
  date?: InputMaybe<Scalars['DateTime']>;
  exerciseId?: InputMaybe<Scalars['Int']>;
};


export type QueryExerciseArgs = {
  id: Scalars['Int'];
};

export type CountFieldsFragment = { id: number, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: number, exercise: { id: number, name: string } };

export type ExerciseFieldsFragment = { id: number, name: string, target?: string | null | undefined, calories: number };

export type AddCountMutationVariables = Exact<{
  data: CountInput;
}>;


export type AddCountMutation = { addCount: { errors?: Array<{ message: string, field: string }> | null | undefined, entity?: { id: number, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: number, exercise: { id: number, name: string } } | null | undefined } };

export type AddExerciseMutationVariables = Exact<{
  data: AddExerciseType;
}>;


export type AddExerciseMutation = { addExercise: { entity?: { id: number, name: string, target?: string | null | undefined, calories: number } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type DeleteCountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCountMutation = { deleteCount: { id: number, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: number, exercise: { id: number, name: string } } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExerciseMutation = { deleteExercise: { id: number, name: string, target?: string | null | undefined, calories: number } };

export type UpdateCountMutationVariables = Exact<{
  data: CountInput;
  id: Scalars['Int'];
}>;


export type UpdateCountMutation = { updateCount: { entity?: { id: number, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: number, exercise: { id: number, name: string } } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type UpdateExerciseMutationVariables = Exact<{
  data: AddExerciseType;
  id: Scalars['Int'];
}>;


export type UpdateExerciseMutation = { updateExercise: { errors?: Array<{ field: string, message: string }> | null | undefined, entity?: { id: number, name: string, target?: string | null | undefined, calories: number } | null | undefined } };

export type CountsQueryVariables = Exact<{
  exerciseId?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['DateTime']>;
}>;


export type CountsQuery = { counts: Array<{ id: number, date: string, sets?: number | null | undefined, reps?: number | null | undefined, kg?: number | null | undefined, exerciseId: number, exercise: { id: number, name: string } }> };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { exercises: Array<{ id: number, name: string, target?: string | null | undefined, calories: number }> };

export const CountFieldsFragmentDoc = gql`
    fragment CountFields on Count {
  id
  date
  sets
  reps
  kg
  exerciseId
  exercise {
    id
    name
  }
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
    mutation DeleteCount($id: Int!) {
  deleteCount(id: $id) {
    ...CountFields
  }
}
    ${CountFieldsFragmentDoc}`;
export const DeleteExerciseDocument = gql`
    mutation DeleteExercise($id: Int!) {
  deleteExercise(id: $id) {
    ...ExerciseFields
  }
}
    ${ExerciseFieldsFragmentDoc}`;
export const UpdateCountDocument = gql`
    mutation updateCount($data: CountInput!, $id: Int!) {
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
    mutation UpdateExercise($data: AddExerciseType!, $id: Int!) {
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
export const CountsDocument = gql`
    query counts($exerciseId: Int, $date: DateTime) {
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
    counts(variables?: CountsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CountsQuery>(CountsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'counts');
    },
    exercises(variables?: ExercisesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExercisesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExercisesQuery>(ExercisesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'exercises');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;