import { userDataType } from "../support/types"

describe('Chatverse Tests e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Home page should show the correct information and render auth forms', () => {
    cy.contains('Start talking to your friends!')
    cy.contains('Sign In')
    cy.contains('Create an account').click()
    cy.contains('Login')
    cy.contains('Register')
  })

  describe('Should be register, login and logout correctly', () => {
    let userData: userDataType

    beforeEach(() => {
      cy.fixture('user.json').then((data) => userData = data)
    })

    it('Register', () => {
      cy.contains('Create an account').click()

      cy.get('[placeholder="Name"]').type(userData.name)
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)

      cy.contains('Register').click()
      cy.wait(16000)

      cy.url().should('include', '/users')
      cy.get('[data-test-id="test-user-list"] h3').contains('People').should('be.visible')
    })

    it('Login and Logout', () => {
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)

      cy.contains('Sign In').click()
      cy.wait(16000)
      
      cy.url().should('include', '/users')
      cy.get('[data-test-id="test-user-list"] h3').contains('People').should('be.visible')
      
      cy.get('[data-test-id="logout"]').click()
      cy.wait(6000)
  
      cy.contains('Start talking to your friends!')
      cy.contains('Sign In')
    })
  })

  describe('Should be able do chat functionalities', () => {
    let userData: userDataType
    const message = 'test message'

    beforeEach(() => {
      cy.fixture('user.json').then((data) => userData = data)
    })
    
    it('Should be send an message', () => {
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)

      cy.contains('Sign In').click()
      cy.wait(16000)
      
      cy.contains('Daniel Prieto').click()
      cy.wait(40000)

      cy.get('[placeholder="Write a message"]').type(message)
      cy.get('[data-test-id="message-form-button"]').click()
      cy.wait(12000)
      cy.contains(message)
    })

    it('Should be delete the conversation and render conversations page', () => {
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)

      cy.contains('Sign In').click()
      cy.wait(16000)
      
      cy.contains('Daniel Prieto').click()
      cy.wait(40000)

      cy.get('[data-test-id="options-conversation"]').click()
      cy.wait(2000)
      cy.get('[data-test-id="open-modal-delete-conversation"]').click()
      cy.wait(2000)
      cy.get('[data-test-id="test-button-delete"]').click()
      cy.wait(40000)
      cy.contains('People')
    })

    it('Should be create a new group chat and delete it', () => {
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)
  
      cy.contains('Sign In').click()
      cy.wait(16000)
      
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

  describe.skip('Configuration profile should work correctly', () => {
    let userData: userDataType

    beforeEach(() => {
      cy.fixture('user.json').then((data) => userData = data)
    })
    
    it('Should rename correctly', () => {
      cy.get('[placeholder="Email"]').type(userData.email)
      cy.get('[placeholder="Password"]').type(userData.password)

      cy.contains('Sign In').click()
      cy.wait(12000)
      
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
})
