
import { faker } from '@faker-js/faker'

export function gerarPayloadCadastro() {

    return {
        "firstname": faker.person.firstName(),
        "lastname": faker.person.lastName(),
        "totalprice": faker.number.int({ min: 100, max: 1000 }),
        "depositpaid": true,
        "bookingdates": {
            "checkin": faker.date.anytime(),
            "checkout": faker.date.anytime(),
        },
        "additionalneeds": faker.lorem.word()
    }
    return
}