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

    // Wait for the homepage to load completely
    cy.wait(2000); // Adjust the wait time as needed or replace with more specific waits

    // Optionally, you can add assertions to check the user's status after login
    cy.window().its('localStorage').invoke('getItem', 'accessToken').should('exist');
    cy.window().its('localStorage').invoke('getItem', 'user').should('not.be.null');

    // Use an alias to wait for network requests related to the homepage
    cy.intercept('POST', 'http://127.0.0.1:5173/auction/listings/*/bids').as('bidPlacementRequest');
    
    // Example: Click on the first "View Listing" button
    cy.get('.listing-item-button').first().click();

    // Wait for the listing page to load
    cy.url().should('include', '/listingitem/');

    // Place a bid (assuming there's an input field and a submit button on the listing page)
    cy.get('button:contains("Place Bid")').click();


    cy.wait(2000)
    cy.get('input[type="number"]').type('100'); // Replace with your bid amount
    cy.get('button:contains("Submit Bid")').click();

    cy.wait('@bidPlacementRequest');

    // Wait for the bid to be placed successfully
    cy.contains('Bid placed successfully').should('exist');
  });

  // You can add more test cases for invalid credentials, error messages, etc.
});
