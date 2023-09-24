import { userDataType } from "../support/types"

describe('Chat Functionalities',() => {
  let userData: userDataType

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.fixture('user.json').then((data) => {
      userData = data
      expect(userData).to.not.be.null
      cy.login(userData.email,userData.password)
    })
    cy.visit('http://localhost:3000/users')
  })

  it('Should send a message and delete conversation',() => {
    const message = 'test message'

    cy.contains('Daniel Prieto').click()
    cy.wait(60000)

    cy.get('[placeholder="Write a message"]').type(message)
    cy.get('[data-test-id="message-form-button"]').click()
    cy.wait(30000)
    cy.contains(message)

    cy.get('[data-test-id="options-conversation"]').click()
    cy.wait(2000)
    cy.get('[data-test-id="open-modal-delete-conversation"]').click()
    cy.wait(2000)
    cy.get('[data-test-id="test-button-delete"]').click()
    cy.wait(60000)
    cy.contains('People')
  })

  it('Should create a new group chat',() => {
    const groupName = 'test group'

    cy.get('[data-test-id="chat"]').click()
    cy.wait(6000)

    cy.get('[data-test-id="group-chat"]').click()
    cy.wait(2000)

    cy.get('[placeholder="Group name"]').type(groupName)
    cy.get('.css-qbdosj-Input')
      .type('Daniel Prieto{enter}')
      .type('Mirexo{enter}')

    cy.get('[data-test-id="test-button-create-group"]').click()
    cy.wait(6000)
    cy.contains(groupName)
  })
})
