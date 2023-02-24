describe('Dropdown', () => {
  it('Trigger button click open dropdown', () => {
    cy.visit('http://localhost:6006/iframe.html?path=/story/molecules-dropdown--as-select');
    cy.get('[data-testid="toggle-button"]').click();
    cy.get('.ui-dropdown-item').should('be.visible');
  });
});
