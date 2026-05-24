/// <reference types="cypress"/>

// arquitetura dos casos de testes

describe('Buscar agendamento', () => {
    it('Buscar agendamento com sucesso', () => {
        // ações
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/12"
        }).then((result) => {
            // validações 
            expect(result.status).to.equal(200)
            expect(result.body.firstname).to.equal("Josh")
            expect(result.body.lastname).to.equal("Allen")
            expect(result.body.totalprice).to.equal(111)

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