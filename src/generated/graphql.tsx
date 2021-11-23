import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddExerciseType = {
  calories?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

export type Count = {
  date: Scalars['String'];
  id: Scalars['String'];
  reps: Scalars['Float'];
  sets: Scalars['Float'];
};

export type CountInput = {
  date?: InputMaybe<Scalars['String']>;
  exerciseId?: InputMaybe<Scalars['Float']>;
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
  exercies: Array<Exercise>;
  exercise: Exercise;
};


export type QueryCountArgs = {
  id: Scalars['Int'];
};


export type QueryCountsArgs = {
  exerciseId?: InputMaybe<Scalars['Float']>;
};


export type QueryExerciseArgs = {
  id: Scalars['Int'];
};

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { exercies: Array<{ calories: number, name: string, id: string, target?: string | null | undefined }> };


export const ExercisesDocument = gql`
    query Exercises {
  exercies {
    calories
    name
    id
    target
  }
}
    `;

/**
 * __useExercisesQuery__
 *
 * To run a query within a React component, call `useExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercisesQuery(baseOptions?: Apollo.QueryHookOptions<ExercisesQuery, ExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExercisesQuery, ExercisesQueryVariables>(ExercisesDocument, options);
      }
export function useExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExercisesQuery, ExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExercisesQuery, ExercisesQueryVariables>(ExercisesDocument, options);
        }
export type ExercisesQueryHookResult = ReturnType<typeof useExercisesQuery>;
export type ExercisesLazyQueryHookResult = ReturnType<typeof useExercisesLazyQuery>;
export type ExercisesQueryResult = Apollo.QueryResult<ExercisesQuery, ExercisesQueryVariables>;