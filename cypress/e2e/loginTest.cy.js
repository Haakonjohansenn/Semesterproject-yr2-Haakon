// cypress/integration/login.spec.js

describe('Login Page', () => {
  it('should successfully log in with valid credentials', () => {
    // Visit the login page
    cy.visit('http://127.0.0.1:5173/login');

    // Type valid email and password
    cy.get('#email').type('Haakon@stud.noroff.no');
    cy.get('#password').type('Hei123123');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the login success message
    cy.contains('Login successful!').should('exist');

    // Validate the redirection to the home page after successful login
    cy.url().should('eq', `http://127.0.0.1:5173/`);

    // Optionally, you can add assertions to check the user's status after login
    cy.window().its('localStorage').invoke('getItem', 'accessToken').should('exist');
    cy.window().its('localStorage').invoke('getItem', 'user').should('not.be.null');
  });

  // You can add more test cases for invalid credentials, error messages, etc.
});
