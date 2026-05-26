/// <reference types="cypress"/>

import { faker } from '@faker-js/faker'

describe('Cadastrar agendamento', () => {

        const payload = {
            "firstname": faker.person.firstName(),
            "lastname": faker.person.lastName(),
            "totalprice": faker.number.int({ min: 100, max: 1000}),
            "depositpaid": true,
            "bookingdates": {
                "checkin": faker.date.anytime(),
                "checkout": faker.date.anytime(),
            },
            "additionalneeds": faker.lorem.word()
        }
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