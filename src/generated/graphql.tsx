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
  calories?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
};

export type Count = {
  date: Scalars['String'];
  exercise: Exercise;
  exerciseId: Scalars['Float'];
  id: Scalars['Float'];
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
  exerciseId?: InputMaybe<Scalars['Int']>;
};


export type QueryExerciseArgs = {
  id: Scalars['Int'];
};

export type AddCountMutationVariables = Exact<{
  data: CountInput;
}>;


export type AddCountMutation = { addCount: { errors?: Array<{ message: string, field: string }> | null | undefined, entity?: { id: number, date: string, sets: number, reps: number, exerciseId: number, exercise: { name: string } } | null | undefined } };

export type AddExerciseMutationVariables = Exact<{
  data: AddExerciseType;
}>;


export type AddExerciseMutation = { addExercise: { entity?: { calories: number, id: number, name: string, target?: string | null | undefined } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type DeleteCountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCountMutation = { deleteCount: { id: number, date: string, sets: number, reps: number, exerciseId: number, exercise: { name: string } } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExerciseMutation = { deleteExercise: { id: number, name: string, calories: number, target?: string | null | undefined } };

export type UpdateCountMutationVariables = Exact<{
  data: CountInput;
  id: Scalars['Int'];
}>;


export type UpdateCountMutation = { updateCount: { entity?: { id: number, date: string, sets: number, reps: number, exerciseId: number, exercise: { name: string } } | null | undefined, errors?: Array<{ field: string, message: string }> | null | undefined } };

export type UpdateExerciseMutationVariables = Exact<{
  data: AddExerciseType;
  id: Scalars['Int'];
}>;


export type UpdateExerciseMutation = { updateExercise: { errors?: Array<{ field: string, message: string }> | null | undefined, entity?: { id: number, name: string, calories: number, target?: string | null | undefined } | null | undefined } };

export type CountsQueryVariables = Exact<{
  exerciseId?: InputMaybe<Scalars['Int']>;
}>;


export type CountsQuery = { counts: Array<{ id: number, date: string, sets: number, reps: number, exerciseId: number, exercise: { name: string } }> };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { exercises: Array<{ calories: number, name: string, id: number, target?: string | null | undefined }> };


export const AddCountDocument = gql`
    mutation addCount($data: CountInput!) {
  addCount(data: $data) {
    errors {
      message
      field
    }
    entity {
      id
      date
      sets
      reps
      exerciseId
      exercise {
        name
      }
    }
  }
}
    `;
export type AddCountMutationFn = Apollo.MutationFunction<AddCountMutation, AddCountMutationVariables>;

/**
 * __useAddCountMutation__
 *
 * To run a mutation, you first call `useAddCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCountMutation, { data, loading, error }] = useAddCountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddCountMutation(baseOptions?: Apollo.MutationHookOptions<AddCountMutation, AddCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCountMutation, AddCountMutationVariables>(AddCountDocument, options);
      }
export type AddCountMutationHookResult = ReturnType<typeof useAddCountMutation>;
export type AddCountMutationResult = Apollo.MutationResult<AddCountMutation>;
export type AddCountMutationOptions = Apollo.BaseMutationOptions<AddCountMutation, AddCountMutationVariables>;
export const AddExerciseDocument = gql`
    mutation AddExercise($data: AddExerciseType!) {
  addExercise(data: $data) {
    entity {
      calories
      id
      name
      target
    }
    errors {
      field
      message
    }
  }
}
    `;
export type AddExerciseMutationFn = Apollo.MutationFunction<AddExerciseMutation, AddExerciseMutationVariables>;

/**
 * __useAddExerciseMutation__
 *
 * To run a mutation, you first call `useAddExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseMutation, { data, loading, error }] = useAddExerciseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddExerciseMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseMutation, AddExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseMutation, AddExerciseMutationVariables>(AddExerciseDocument, options);
      }
export type AddExerciseMutationHookResult = ReturnType<typeof useAddExerciseMutation>;
export type AddExerciseMutationResult = Apollo.MutationResult<AddExerciseMutation>;
export type AddExerciseMutationOptions = Apollo.BaseMutationOptions<AddExerciseMutation, AddExerciseMutationVariables>;
export const DeleteCountDocument = gql`
    mutation DeleteCount($id: Int!) {
  deleteCount(id: $id) {
    id
    date
    sets
    reps
    exerciseId
    exercise {
      name
    }
  }
}
    `;
export type DeleteCountMutationFn = Apollo.MutationFunction<DeleteCountMutation, DeleteCountMutationVariables>;

/**
 * __useDeleteCountMutation__
 *
 * To run a mutation, you first call `useDeleteCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCountMutation, { data, loading, error }] = useDeleteCountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCountMutation, DeleteCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCountMutation, DeleteCountMutationVariables>(DeleteCountDocument, options);
      }
export type DeleteCountMutationHookResult = ReturnType<typeof useDeleteCountMutation>;
export type DeleteCountMutationResult = Apollo.MutationResult<DeleteCountMutation>;
export type DeleteCountMutationOptions = Apollo.BaseMutationOptions<DeleteCountMutation, DeleteCountMutationVariables>;
export const DeleteExerciseDocument = gql`
    mutation DeleteExercise($id: Int!) {
  deleteExercise(id: $id) {
    id
    name
    calories
    target
  }
}
    `;
export type DeleteExerciseMutationFn = Apollo.MutationFunction<DeleteExerciseMutation, DeleteExerciseMutationVariables>;

/**
 * __useDeleteExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseMutation, { data, loading, error }] = useDeleteExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, options);
      }
export type DeleteExerciseMutationHookResult = ReturnType<typeof useDeleteExerciseMutation>;
export type DeleteExerciseMutationResult = Apollo.MutationResult<DeleteExerciseMutation>;
export type DeleteExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>;
export const UpdateCountDocument = gql`
    mutation updateCount($data: CountInput!, $id: Int!) {
  updateCount(data: $data, id: $id) {
    entity {
      id
      date
      sets
      reps
      exerciseId
      exercise {
        name
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateCountMutationFn = Apollo.MutationFunction<UpdateCountMutation, UpdateCountMutationVariables>;

/**
 * __useUpdateCountMutation__
 *
 * To run a mutation, you first call `useUpdateCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountMutation, { data, loading, error }] = useUpdateCountMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateCountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCountMutation, UpdateCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCountMutation, UpdateCountMutationVariables>(UpdateCountDocument, options);
      }
export type UpdateCountMutationHookResult = ReturnType<typeof useUpdateCountMutation>;
export type UpdateCountMutationResult = Apollo.MutationResult<UpdateCountMutation>;
export type UpdateCountMutationOptions = Apollo.BaseMutationOptions<UpdateCountMutation, UpdateCountMutationVariables>;
export const UpdateExerciseDocument = gql`
    mutation UpdateExercise($data: AddExerciseType!, $id: Int!) {
  updateExercise(data: $data, id: $id) {
    errors {
      field
      message
    }
    entity {
      id
      name
      calories
      target
    }
  }
}
    `;
export type UpdateExerciseMutationFn = Apollo.MutationFunction<UpdateExerciseMutation, UpdateExerciseMutationVariables>;

/**
 * __useUpdateExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseMutation, { data, loading, error }] = useUpdateExerciseMutation({
 *   variables: {
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>(UpdateExerciseDocument, options);
      }
export type UpdateExerciseMutationHookResult = ReturnType<typeof useUpdateExerciseMutation>;
export type UpdateExerciseMutationResult = Apollo.MutationResult<UpdateExerciseMutation>;
export type UpdateExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>;
export const CountsDocument = gql`
    query counts($exerciseId: Int) {
  counts(exerciseId: $exerciseId) {
    id
    date
    sets
    reps
    exerciseId
    exercise {
      name
    }
  }
}
    `;

/**
 * __useCountsQuery__
 *
 * To run a query within a React component, call `useCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountsQuery({
 *   variables: {
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useCountsQuery(baseOptions?: Apollo.QueryHookOptions<CountsQuery, CountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountsQuery, CountsQueryVariables>(CountsDocument, options);
      }
export function useCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountsQuery, CountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountsQuery, CountsQueryVariables>(CountsDocument, options);
        }
export type CountsQueryHookResult = ReturnType<typeof useCountsQuery>;
export type CountsLazyQueryHookResult = ReturnType<typeof useCountsLazyQuery>;
export type CountsQueryResult = Apollo.QueryResult<CountsQuery, CountsQueryVariables>;
export const ExercisesDocument = gql`
    query Exercises {
  exercises {
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