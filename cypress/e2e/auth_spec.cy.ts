import { userDataType } from "../support/types"

describe('Authentication and Registration',() => {
  let userData: userDataType

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.fixture('user.json').then((data) => {
      userData = data
      expect(userData).to.not.be.null
    })
  })

  it('Should display correct information and render auth forms',() => {
    cy.contains('Start talking to your friends!')
    cy.contains('Sign In')
    cy.contains('Create an account').click()
    cy.contains('Login')
    cy.contains('Register')
  })

  it('Register',() => {
    cy.register(userData.name,userData.email,userData.password)

    cy.url().should('include','/users')
    cy.get('[data-test-id="test-user-list"] h3').contains('People').should('be.visible')
  })

  it('Login and Logout',() => {
    cy.login(userData.email,userData.password)

    cy.url().should('include','/users')
    cy.get('[data-test-id="test-user-list"] h3').contains('People').should('be.visible')

    cy.get('[data-test-id="logout"]').click()
    cy.wait(6000)

    cy.contains('Start talking to your friends!')
    cy.contains('Sign In')
  })
})
