// /// <reference types="Cypress" />
import 'cypress-axe';

describe('a11y checks', () => {
  it(`should pass a11y tests on list page`, () => {
    cy.visit('/');
    cy.injectAxe();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.configureAxe();
    cy.checkA11y();
  });

  it(`should pass a11y tests on form page`, () => {
    cy.visit('/report');
    cy.injectAxe();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.configureAxe();
    cy.checkA11y();
  });
});
