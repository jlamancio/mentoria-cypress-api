///<reference types="cypress"/>

const agendamento_payload = require('../fixtures/agendamento_payload.json');
const login = require('../fixtures/login.json');

describe("Deletar agendamento", () => {
    let token = '';

    // hooks
    beforeEach(() => {
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: login
        }).then((result) => {
            token = result.body.token;
        });
    });

    it('Deletar agendamento com sucesso', () => {

        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking/",
            body: agendamento_payload

        }).then((result) => {
            cy.request({
                method: 'DELETE',
                url: `https://restful-booker.herokuapp.com/booking/${result.body.bookingid}}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`
                }
            }).then((result) => {
                expect(result.status).to.equal(201);

            });
        });
    });

    it('Deletar agendamento inexistente', () => {
        cy.request({
            method: "DELETE",
            url: "https://restful-booker.herokuapp.com/booking/inexistente",
            headers: {
                'Cookie': `token=${token}`
            },
            failOnStatusCode: false
        }).then((result) => {
            expect(result.status).to.equal(405);
            expect(result.statusText).to.equal("Method Not Allowed");
        });
    });
});

