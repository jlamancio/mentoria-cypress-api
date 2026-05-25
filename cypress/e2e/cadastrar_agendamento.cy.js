/// <reference types="cypress"/>

const agendamento_payload = require('../fixtures/agendamento_payload.json')


// arquitetura dos casos de testes

describe('Cadastrar agendamento', () => {
    it('cadastrar agendamento com sucesso', () => {
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

    it('cadastrar agendamento com campo inválido', () => {

        const payload_invalido = {
            ...agendamento_payload,
            firstname: 123456
        }

        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking/",
            body: payload_invalido,
            failOnStatusCode: false
        }).then((result) => {
            expect(result.status).to.be.oneOf([400, 500])

        })
    })
})