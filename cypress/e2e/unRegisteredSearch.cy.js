describe('Search Listings', () => {
  it('Should allow an unregistered user to search listings by title', () => {
    // Visit the page
    cy.visit('http://127.0.0.1:5173/');

    cy.wait(2000); // Adjust the time as needed
    cy.get('.search-bar-container input').type('test');

    // Press the "Enter" key
    cy.get('.search-bar-container input').type('{enter}');

    // Ensure the search results are displayed
    cy.get('.listing-container').should('be.visible');

    // Check if the visible listings match the search query
    cy.get('.listing-container .listing-item h2').each(($title) => {
      expect($title.text().toLowerCase()).to.include('test');
    });
  });
});
