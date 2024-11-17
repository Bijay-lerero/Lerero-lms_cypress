//The error below is not an issue
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/');
    cy.get('[data-testid="input-email"]').type(email)
    cy.get('[data-testid="input-password"]').type(password);
    cy.get('[data-testid="signIn"]').click();
    cy.get('.active-menu > .title').should('contain', 'Dashboard');
});
  
Cypress.Commands.add("getElement",(value) =>{
    return cy.get(`[data-testid="${value}"]`);
})