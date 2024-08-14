describe('Login', () => {
  // before(() => {
  //   cy.visit('http://example.com');
  // });

  it('logging in with existing credentials should show the expected page', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy=login_h1]').should('exist');

    cy.login('second.user@hotmail.com', '12345678');

    cy.get('[data-cy=main_h1]').should('exist');
    cy.get('[data-cy=foto_card_list]').should('not.exist');
    cy.get('[data-cy=album_list]').should('not.exist');
  })

  it('logging in with nonexisting credentials should show an error', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy=login_h1]').should('exist');

    cy.login('eighth.user@hotmail.com', '12345678');
    cy.get('[data-cy=axios_error_message]').should('exist');
  })

  it('logging out shows expected feedback', () => {
    cy.login('second.user@hotmail.com', '12345678');
    cy.get('[data-cy=main_h1]').should('exist');

    cy.logout();
    cy.get('[data-cy=logout_feedback]').should('exist');
  })
})