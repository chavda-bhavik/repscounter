import { SERVER_URL } from '../constants';

let newCountData = {
    date: '2021-10-15',
    exercise: 'Bench Press',
    exerciseId: 2,
    sets: 7,
    reps: 15,
};
let countResponseData = {
    data: {
        addCount: {
            entity: {
                id: 6,
                date: newCountData.date,
                sets: newCountData.sets,
                reps: newCountData.reps,
                exerciseId: newCountData.exerciseId,
                exercise: {
                    name: newCountData.exercise,
                    __typename: 'Exercise',
                },
                __typename: 'Count',
            },
            errors: null,
            __typename: 'CountResponseType',
        },
    },
};
let updateCountData = {
    date: '2021-10-16',
    exercise: 'Sholder Press',
    exerciseId: 3,
    sets: 9,
    reps: 15,
};
let updateCountResponse = {
    data: {
        updateCount: {
            entity: {
                id: 6,
                date: updateCountData.date,
                sets: updateCountData.sets,
                reps: updateCountData.reps,
                exerciseId: updateCountData.exerciseId,
                exercise: {
                    name: updateCountData.exercise,
                    __typename: 'Exercise',
                },
                __typename: 'Count',
            },
            errors: null,
            __typename: 'CountResponseType',
        },
    },
};
let data = {
    data: {
        updateCount: {
            entity: { date: '2021-12-03', id: 8, reps: 5, sets: 5, __typename: 'Count' },
            errors: null,
            __typename: 'CountResponseType',
        },
    },
};

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
    it('Should add new count', () => {
        cy.intercept('http://localhost:4000/graphql', countResponseData).as('addCount');
        cy.get('[data-cy=add]').click();

        cy.get('[data-cy=date]').type(newCountData.date);
        cy.get('[data-cy=exercise').select(newCountData.exercise);
        cy.get('[data-cy=sets]').type(newCountData.sets);
        cy.get('[data-cy=reps]').type(newCountData.reps);
        cy.get('[data-cy=submit]').click();
        cy.wait('@addCount');
        cy.contains('7 Sets x 15 Reps', { timeout: 10000 });
    });
    it('Should update count', () => {
        cy.intercept('http://localhost:4000/graphql', updateCountResponse).as('updateCount');
        cy.get('p').contains('7 Sets x 15 Reps').click();

        cy.get('[data-cy=date]').type(updateCountData.date);
        cy.get('[data-cy=exercise').select(updateCountData.exercise);
        cy.get('[data-cy=sets]').clear().type(updateCountData.sets);
        cy.get('[data-cy=reps]').clear().type(updateCountData.reps);
        cy.get('[data-cy=submit]').click();
        cy.wait('@updateCount');
        cy.contains('9 Sets x 15 Reps', { timeout: 10000 });
    });
});
