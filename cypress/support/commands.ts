/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string,password: string): Chainable<void>,
    register(name: string,email: string,password: string): Chainable<void>
  }
}

Cypress.Commands.add('login',(email,password) => {
  cy.session(
    email,
    () => {
      cy.get('[placeholder="Email"]').type(email)
      cy.get('[placeholder="Password"]').type(password)
      cy.contains('Sign In').click()
      cy.wait(12000)
    },
    {
      validate: () => {
        cy.getCookie('next-auth.session-token').should('exist')
      }
    }
  )
})

Cypress.Commands.add('register',(name,email,password) => {
  cy.contains('Create an account').click()
  cy.get('[placeholder="Name"]').type(name)
  cy.get('[placeholder="Email"]').type(email)
  cy.get('[placeholder="Password"]').type(password)
  cy.contains('Register').click()
  cy.wait(12000)
})
