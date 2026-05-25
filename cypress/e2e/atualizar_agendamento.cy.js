/// <reference types="cypress"/>

const agendamento_payload = require('../fixtures/agendamento_payload.json')
const login = require('../fixtures/login.json')


describe('Update agendamento', () => {

    let token = ''

    beforeEach(() => {
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: login
        }).then((result) => {
            token = result.body.token;

        })
    })

    const partial_payload_update = {
        ...agendamento_payload,
        firstname: "flavia",
        lastname: "boconcelo"

    }


    it('Update parcial com sucesso', () => {
        cy.request({
            method: "PATCH",
            url: "https://restful-booker.herokuapp.com/booking/12",
            body: partial_payload_update,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }

        }).then((result) => {
            expect(result.status).to.equal(200)
            expect(result.statusText).to.equal("OK")
            expect(result.body.firstname).to.equal(partial_payload_update.firstname)
            expect(result.body.lastname).to.equal(partial_payload_update.lastname)

        })
    })
})