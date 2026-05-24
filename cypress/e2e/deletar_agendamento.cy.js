///<reference types="cypress" />

describe("Deletar agendamento", () => {

    it('Deletar agendamento com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth/',
            body: {
                "username": "admin",
                "password": "password123"
            }
        }).then((result) => {
            cy.request({
                method: 'DELETE',
                url: 'https://restful-booker.herokuapp.com/booking/10',
                headers: {
                    'Cookie': `token=${result.body.token}`
                }
            }).then((result) =>
                //
                // a API retorna 201 quando deleta e msg 'CREATED'
                //  
                expect(result.status).to.equal(201)
            )
        })
    })
})

