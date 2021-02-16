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

  it(`should filter incidents by VIN and Date Range`, () => {
    // 4T1BG12K9TU955820 2009 TOYOTA Camry
    // 1FUJA6CK46LN98840 2006 FREIGHTLINER Columbia

    cy.visit('/');
    cy.findByLabelText(/report an incident/i).click();
    cy.findByText(/report a new incident/i).should('exist');

    cy.findByText(/submit incident/i).click();

    cy.findByLabelText(/vin/i).clear().type('4T1BG12K9TU955820');
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    cy.findByLabelText(/date/i).clear().type(firstDate.toLocaleDateString('en-US'));
    cy.findByLabelText(/note/i).type('A test report');
    cy.findByText(/submit incident/i).click();
    cy.findByText(/incident has been successfully added/i).should('exist');

    cy.findByLabelText(/vin/i).clear().type('4T1BG12K9TU955821');
    cy.findByLabelText(/date/i).clear().type(firstDate.toLocaleDateString('en-US'));
    cy.findByLabelText(/note/i).type('A test report');
    cy.findByText(/submit incident/i).click();
    cy.findByText(/incident has been successfully added/i).should('exist');

    cy.findByLabelText(/vin/i).clear().type('1FUJA6CK46LN98840');
    const secondDate = new Date();
    secondDate.setDate(secondDate.getDate() - 10);
    cy.findByLabelText(/date/i).clear().type(secondDate.toLocaleDateString('en-US'));
    cy.findByText(/submit incident/i).click();
    cy.findByText(/incident has been successfully added/i).should('exist');

    cy.findByText(/Back to Incident List/i).click();
    cy.findAllByText(/incidents/i).should('exist');

    //all exist in the list
    cy.findAllByText(/TOYOTA/i).should('have.length', 2);
    cy.findByText(/FREIGHTLINER/i).should('exist');

    // filter for TOYOTA
    cy.findByLabelText(/Filter by VIN/i).type('582');
    cy.findByText(/FREIGHTLINER/i).should('not.exist');
    cy.findAllByText(/TOYOTA/i).should('have.length', 2);
    cy.findByLabelText(/Filter by VIN/i).type('0');
    cy.findByText(/FREIGHTLINER/i).should('not.exist');
    cy.findAllByText(/TOYOTA/i).should('have.length', 1);

    cy.findByLabelText(/Filter by VIN/i).clear();

    // filter for FREIGHTLINER
    cy.findByLabelText(/Filter by VIN/i).type('6c');
    cy.findByText(/FREIGHTLINER/i).should('exist');
    cy.findAllByText(/TOYOTA/i).should('not.exist');

    cy.findByLabelText(/Filter by VIN/i).clear();

    // Filter by dates
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 11);

    cy.findByLabelText(/start date/i)
      .clear()
      .type(startDate.toLocaleDateString('en-US'));

    //both exist in the list
    cy.findAllByText(/TOYOTA/i).should('have.length', 2);
    cy.findByText(/FREIGHTLINER/i).should('exist');

    // move up start date
    startDate.setDate(startDate.getDate() + 5);
    cy.findByLabelText(/start date/i)
      .clear()
      .type(startDate.toLocaleDateString('en-US'));

    //only toyota shows
    cy.findAllByText(/TOYOTA/i).should('have.length', 2);
    cy.findByText(/FREIGHTLINER/i).should('not.exist');

    // move back start and set end date
    startDate.setDate(startDate.getDate() - 5);
    cy.findByLabelText(/start date/i)
      .clear()
      .type(startDate.toLocaleDateString('en-US'));

    // close date picker
    cy.findByLabelText(/Filter by VIN/i).click();

    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 6);
    cy.findByLabelText(/end date/i)
      .clear()
      .type(endDate.toLocaleDateString('en-US'));

    //only freightliner shows
    cy.findAllByText(/TOYOTA/i).should('not.exist');
    cy.findAllByText(/FREIGHTLINER/i).should('exist');
    // close date picker
    cy.findByText(/FREIGHTLINER/i).click();

    // filter by vin and range
    cy.findByLabelText(/Filter by VIN/i)
      .clear()
      .type('ja6');
    cy.findAllByText(/FREIGHTLINER/i).should('exist');
    cy.findByLabelText(/Filter by VIN/i).type('d');
    cy.findByText(/No incidents to show/i).should('exist');

    cy.findByLabelText(/Filter by VIN/i).clear();
    cy.findByLabelText(/start date/i).clear();
    // close date picker
    cy.findByLabelText(/Filter by VIN/i).click();
    cy.findByLabelText(/end date/i).clear();
    // close date picker
    cy.findByLabelText(/Filter by VIN/i).click();
  });
});
