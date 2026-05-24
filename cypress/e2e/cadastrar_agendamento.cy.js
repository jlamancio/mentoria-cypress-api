/// <reference types="cypress"/>

const agendamento_payload = require('../fixtures/agendamento_payload.json')

// arquitetura dos casos de testes

describe('Cadastrar agendamento_payload', () => {
    it('cadastrar agendamento_payload com sucesso', () => { v
        cy.request({
            method: "POST",                                                  
            url: "https://restful-booker.herokuapp.com/booking/",  
            body: agendamento_payload

        }).then((result) => {
            expect(result.status).to.equal(200)
            expect(result.body.bookingid).not.NaN
            expect(result.body.booking.firstname).to.equal(agendamento_payload.firstname)
            expect(result.body.booking.lastname).to.equal(agendamento_payload.lastname)
            expect(result.body.booking.totalprice).to.equal(agendamento_payload.totalprice)

        })
    })
})