import { SERVER_URL } from '../constants';
import countsData from '../fixtures/count/counts.json';

let newCountData = {
    exercise: 'Barbell Pull Up',
    exerciseId: 'c3aa9252-7d27-45cf-b111-a38d3b876d58',
};
let addCountResponseData = {
    data: {
        addCount: {
            entity: {
                id: 'a21ab5f8-de95-4243-b4fd-631cce784415',
                date: '2021-12-12',
                sets: '',
                reps: '',
                kg: '',
                exerciseId: '7e478f73-86ca-4bb9-abaf-e4cae63024d1',
            },
            errors: null,
        },
    },
};
let updateCountData = {
    date: '2021-10-16',
    exercise: 'Bench Press',
    exerciseId: 'c3aa9252-7d27-45cf-b111-a38d3b876d58',
    sets: 9,
    reps: 15,
    kg: 7.5,
};
let updateCountResponse1 = {
    data: {
        updateCount: {
            entity: {
                id: 'aaa712db-7da2-4ed8-a8e6-a7dd1a2ecd1c',
                date: updateCountData.date,
                sets: updateCountData.sets,
                reps: '',
                kg: '',
                exerciseId: '7e478f73-86ca-4bb9-abaf-e4cae63024d1',
            },
            errors: null,
        },
    },
};
let updateCountResponse2 = {
    data: {
        updateCount: {
            entity: {
                id: 'aaa712db-7da2-4ed8-a8e6-a7dd1a2ecd1c',
                date: updateCountData.date,
                sets: updateCountData.sets,
                reps: updateCountData.reps,
                kg: '',
                exerciseId: '7e478f73-86ca-4bb9-abaf-e4cae63024d1',
            },
            errors: null,
        },
    },
};
let updateCountResponse3 = {
    data: {
        updateCount: {
            entity: {
                id: 'aaa712db-7da2-4ed8-a8e6-a7dd1a2ecd1c',
                date: updateCountData.date,
                sets: updateCountData.sets,
                reps: updateCountData.reps,
                kg: updateCountData.kg,
                exerciseId: '7e478f73-86ca-4bb9-abaf-e4cae63024d1',
            },
            errors: null,
        },
    },
};
let updateCountResponse4 = {
    data: {
        updateCount: {
            entity: {
                id: 'aaa712db-7da2-4ed8-a8e6-a7dd1a2ecd1c',
                date: updateCountData.date,
                sets: updateCountData.sets,
                reps: updateCountData.reps,
                kg: updateCountData.kg,
                exerciseId: updateCountData.exerciseId,
            },
            errors: null,
        },
    },
};
let deleteCountResponse = {
    data: {
        deleteCount: {
            entity: {
                id: 'aaa712db-7da2-4ed8-a8e6-a7dd1a2ecd1c',
                date: '2021-10-16',
                sets: 9,
                reps: 15,
                kg: 7.5,
                exerciseId: 'c3aa9252-7d27-45cf-b111-a38d3b876d58',
            },
            errors: null,
        },
    },
};

describe('Counts', () => {
    it('Should load counts', () => {
        cy.intercept(SERVER_URL, (req) => {
            if (req.body.operationName === 'exercises') {
                req.reply({ fixture: 'exercise/exercises.json' });
            }
        }).as('exercises');
        cy.intercept(SERVER_URL, (req) => {
            if (req.body.operationName === 'counts') {
                req.reply(countsData);
            }
        }).as('counts');
        cy.visit('http://localhost:3000');
        cy.wait(['@exercises', '@counts']);
        cy.get('[data-cy=count]', { timeout: 10000 }).should(
            'have.length',
            countsData.data.counts.length
        );
    });
    it('Should add new count', () => {
        cy.intercept('http://localhost:4000/graphql', addCountResponseData).as('addCount');
        cy.get('[data-cy=add]').click();
        cy.get('[data-cy=exercise-item]').eq(0).click();
        cy.wait('@addCount');
        cy.get('[data-cy=count]', { timeout: 10000 }).should(
            'have.length',
            countsData.data.counts.length + 1
        );
    });
    it('Should update sets', () => {
        cy.intercept('http://localhost:4000/graphql', updateCountResponse1).as('updateCount1');

        // updating sets
        cy.get('[data-cy=count-sets]').eq(0).click().clear().type(updateCountData.sets).blur();
        cy.wait('@updateCount1');
        cy.get('[data-cy=count-sets]').eq(0).should('contain.text', updateCountData.sets);
    });
    it('Should update reps', () => {
        cy.intercept('http://localhost:4000/graphql', updateCountResponse2).as('updateCount2');

        // updating reps
        cy.get('[data-cy=count-reps]').eq(0).click().clear().type(updateCountData.reps).blur();
        cy.wait('@updateCount2');
        cy.get('[data-cy=count-reps]').eq(0).should('contain.text', updateCountData.reps);
    });
    it('Should update kg', () => {
        cy.intercept('http://localhost:4000/graphql', updateCountResponse3).as('updateCount3');

        // updating kg
        cy.get('[data-cy=count-kg]').eq(0).click().clear().type(updateCountData.kg).blur();
        cy.wait('@updateCount3');
        cy.get('[data-cy=count-kg]').eq(0).should('contain.text', updateCountData.kg);
    });
    it('Should update count', () => {
        cy.intercept('http://localhost:4000/graphql', updateCountResponse4).as('updateCount4');

        // updating kg
        cy.get('[data-cy=count-exercise]').eq(0).click();
        cy.get('[data-cy=exercise-item]').eq(1).click();
        cy.wait('@updateCount4');
        cy.get('[data-cy=count-exercise]').eq(0).should('contain.text', updateCountData.exercise);
    });
    it('should delete count', () => {
        cy.intercept('http://localhost:4000/graphql', deleteCountResponse).as('deleteCount');

        cy.get('[data-cy=delete-count]').eq(0).click();
        cy.wait('@deleteCount');
        cy.get('[data-cy=count]', { timeout: 10000 }).should(
            'have.length',
            countsData.data.counts.length
        );
    });
});
