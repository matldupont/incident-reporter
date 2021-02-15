import '@testing-library/cypress/add-commands';

describe('incident list and reporting', () => {
  beforeEach(function () {
    cy.request('DELETE', 'http://localhost:4000/incidents').as('reset');
    cy.reload();
  });

  it(`should load the incidents page`, () => {
    cy.visit('/');
    cy.findAllByText(/incidents/i).should('exist');
  });

  it(`should fail at adding a new incident with invalid form`, () => {
    cy.visit('/');
    cy.findByLabelText(/report an incident/i).click();
    cy.findByText(/report a new incident/i).should('exist');

    const date = new Date();
    date.setDate(date.getDate() + 2);

    cy.findByLabelText(/date/i).clear().type(date.toLocaleDateString('en-US'));

    cy.findByText(/submit incident/i).click();

    cy.findByText(/VIN must be valid/i).should('exist');

    cy.findByText(/Date must be in the past/i).should('exist');

    cy.findByText(/Note cannot be left empty/i).should('exist');
  });

  it(`should show error message with invalid VIN`, () => {
    cy.visit('/');
    cy.findByLabelText(/report an incident/i).click();
    cy.findByText(/report a new incident/i).should('exist');

    cy.findByLabelText(/vin/i).type('3A7BC63H75H632197');

    cy.findByLabelText(/note/i).type('A test report');
    cy.findByText(/submit incident/i).click();

    cy.findByText(/Could not decode VIN/i, { timeout: 5000 }).should('exist');
  });

  it(`should add a new incident to the list`, () => {
    cy.visit('/');
    cy.findByLabelText(/report an incident/i).click();
    cy.findByText(/report a new incident/i).should('exist');

    cy.findByText(/submit incident/i).click();

    cy.findByLabelText(/vin/i).type('2C3AA63H75H632197');

    cy.findByLabelText(/note/i).type('A test report');

    cy.findByText(/submit incident/i).click();

    cy.findByText(/incident has been successfully added/i).should('exist');

    cy.findByText(/Back to Incident List/i).click();
    cy.findAllByText(/incidents/i).should('exist');

    cy.findAllByText(/A test report/i).should('exist');
  });
});
