/// <reference types="Cypress" />

import { SERVER_URL } from '../constants';

let newExerciseData = {
    name: 'Totally New Exercise',
    target: 'Leg',
    calories: 100,
};
let exerciseResponseData = {
    data: {
        addExercise: {
            entity: {
                id: 6,
                calories: newExerciseData.calories,
                name: newExerciseData.name,
                target: newExerciseData.target,
                __typename: 'Exercise',
            },
            errors: null,
            __typename: 'ExerciseResponseType',
        },
    },
};
const updateExerciseData = {
    name: 'Updated exercise text',
    target: 'Core',
    calories: 150,
};
const updateExerciseResponse = {
    data: {
        updateExercise: {
            errors: null,
            entity: {
                id: 1,
                name: updateExerciseData.name,
                calories: updateExerciseData.calories,
                target: updateExerciseData.target,
                __typename: 'Exercise',
            },
            __typename: 'ExerciseResponseType',
        },
    },
};
const deleteExerciseResponse = {
    data: {
        deleteExercise: {
            id: 1,
            name: updateExerciseData.name,
            calories: updateExerciseData.calories,
            target: updateExerciseData.target,
            __typename: 'Exercise',
        },
    },
};

describe('Exercises', () => {
    it('Should load exercises', () => {
        cy.intercept(SERVER_URL, { fixture: 'exercise/exercises.json' }).as('exercises');
        cy.visit('http://localhost:3000/exercises');
        cy.wait('@exercises');
        cy.get('[data-cy=exercise]', { timeout: 10000 }).should('have.length', 5);
    });
    it('Should create new exercise', () => {
        cy.intercept('http://localhost:4000/graphql', exerciseResponseData).as('addExercise');
        cy.get('[data-cy=add]').click();
        cy.get('[data-cy=name]').type(newExerciseData.name);
        cy.get('[data-cy=target').select(newExerciseData.target);
        cy.get('[data-cy=calories]').type(newExerciseData.calories);
        cy.get('[data-cy=submit]').click();
        cy.wait('@addExercise');
        cy.get('[data-cy=exercise]', { timeout: 10000 }).should('have.length', 6);
    });
    it('Should update exercise', () => {
        cy.intercept('http://localhost:4000/graphql', updateExerciseResponse).as('updateExercise');
        cy.get('[data-cy=exercise]').eq(0).click();

        cy.get('[data-cy=name]').clear().type(updateExerciseData.name);
        cy.get('[data-cy=target').select(updateExerciseData.target);
        cy.get('[data-cy=calories]').clear().type(updateExerciseData.calories);
        cy.get('[data-cy=submit]').click();
        cy.wait('@updateExercise');
        cy.get('[data-cy=exercise-title]').eq(0).should('contain.text', updateExerciseData.name);
        cy.get('[data-cy=exercise-calories]')
            .eq(0)
            .should('contain.text', updateExerciseData.calories);
    });
    it('Should delete exercise', () => {
        cy.intercept('http://localhost:4000/graphql', deleteExerciseResponse).as('deleteExercise');
        cy.get('[data-cy=exercise]').eq(0).click();

        cy.get('[data-cy=delete]').click();
        cy.wait('@deleteExercise');
        cy.get('[data-cy=exercise]', { timeout: 10000 }).should('have.length', 5);
    });
    it('Should show errors for Invalid inputs', () => {
        cy.get('[data-cy=add]').click();
        cy.get('[data-cy=submit]').click();
        cy.contains('Exercise name is required');
        cy.contains('Calories is required');
        cy.get('[data-cy=calories]').type(0);
        cy.contains(`Calories can't be less than 1`);
        cy.get('[data-cy=cancel]').click();
        cy.contains('CANCEL').should('not.exist');
    });
});
