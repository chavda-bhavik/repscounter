import { SERVER_URL } from '../constants';

describe('Counts', () => {
    it('Should load counts', () => {
        cy.intercept(SERVER_URL, (req) => {
            if (req.body.operationName === 'Exercises') {
                req.reply({ fixture: 'exercise/exercises.json' });
            }
        }).as('exercises');
        cy.intercept(SERVER_URL, (req) => {
            if (req.body.operationName === 'counts') {
                req.reply({ fixture: 'count/counts.json' });
            }
        }).as('counts');
        cy.visit('http://localhost:3000');
        cy.wait(['@exercises', '@counts']);
        cy.get('[data-cy=countsList]', { timeout: 10000 }).should('be.visible');
    });
    // it('Should add new count', () => {
    //     cy.intercept('http://localhost:4000/graphql', exerciseResponseData).as('addExercise');
    //     cy.get('[data-cy=add]').click();
    //     cy.get('[data-cy=name]').type(newExerciseData.name);
    //     cy.get('[data-cy=target').select(newExerciseData.target);
    //     cy.get('[data-cy=calories]').type(newExerciseData.calories);
    //     cy.get('[data-cy=submit]').click();
    //     cy.wait('@addExercise');
    //     cy.contains(newExerciseData.name, { timeout: 10000 });
    // });
});
