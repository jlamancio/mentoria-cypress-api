/// <reference types="cypress"/>

const cadastro_payload = require('../fixtures/gerar_dados.js')

describe('Cadastrar agendamento', () => {

    let payload 

    beforeEach(() => {
        payload = cadastro_payload.gerarPayloadCadastro()

    })

    it('cadastrar agendamento com sucesso - dados aleatorios (Faker-js)', () => {

        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking/",
            body: payload,

        }).then((result) => {
            expect(result.status).to.equal(200)
            expect(result.body.bookingid).not.NaN
            expect(result.body.booking.firstname).to.equal(payload.firstname)
            expect(result.body.booking.lastname).to.equal(payload.lastname)
            expect(result.body.booking.totalprice).to.equal(payload.totalprice)

        })
    })

    it('cadastrar agendamento com campo inválido', () => {

        const payload_invalido = {
            ...payload,
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