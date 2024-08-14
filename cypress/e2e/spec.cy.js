// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

//BDD: behavior driven development (chai framework)

describe('basic testsuite', () => {
  it('should show the webpage', () => {
    cy.visit('http://localhost:5173/');

    cy.get('h1').should('exist');
  })
})