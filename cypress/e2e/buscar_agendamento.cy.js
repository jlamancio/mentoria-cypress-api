/// <reference types="cypress"/>

const agendamento_payload = require('../fixtures/agendamento_payload.json')

describe('Buscar agendamento', () => {
    it('Buscar agendamento com sucesso', () => {

        // cadastrar agendamento 
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking/",
            body: agendamento_payload

        }).then((result) => {
            expect(result.status).to.equal(200)

            const id = result.body.bookingid;

            cy.request({
                method: "GET",
                url: `https://restful-booker.herokuapp.com/booking/${id}`,

            }).then((result) => {
                expect(result.status).to.equal(200)
                expect(result.body.firstname).to.equal(agendamento_payload.firstname);
                expect(result.body.lastname).to.equal(agendamento_payload.lastname);
                expect(result.body.totalprice).to.equal(agendamento_payload.totalprice);

            });
        });
    });

    it('Buscar agendamento inexistente', () => {
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/inexistente",
            failOnStatusCode: false

        }).then((result) => {
            expect(result.status).to.equal(404)
            expect(result.statusText).to.equal("Not Found")

        });
    });
})