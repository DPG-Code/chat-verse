import { userDataType } from "../support/types"

describe('Profile Configuration',() => {
  let userData: userDataType

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.fixture('user.json').then((data) => userData = data)
  })

  it('Should rename correctly',() => {
    cy.login(userData.email,userData.password)

    cy.get('[data-test-id="settings-profile"]').click()
    cy.wait(1000)
    cy.get('header [data-test-id="settings-input-name"]').type('new username')
    cy.contains(userData.name)
    cy.get('[data-test-id="test-button-change-profile"]').click()

    cy.wait(6000)

    cy.get('[data-test-id="settings-profile"]').click()
    cy.wait(1000)
    cy.contains('new username')
    cy.get('[data-test-id="settings-input-name"]').type(userData.name)
    cy.get('[data-test-id="test-button-change-profile"]').click()
  })
})
