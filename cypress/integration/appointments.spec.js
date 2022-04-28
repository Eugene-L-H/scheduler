describe('Appointments', () => {
  beforeEach(() => {
    // Reset database values
    cy.request('http://localhost:8001/api/debug/reset');
    // Visit root of web server
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should visit root', () => {});

  it('should book an interview', () => {
    cy.contains('Monday');
    // Click Add button in second appointment
    cy.get('[alt=Add]').first().click();

    // Enter name
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones', {
      delay: 100,
    });

    // Select interviewer
    cy.get('[alt="Sylvia Palmer"]').click();

    // Click save button
    cy.contains('Save').click();

    // Booked appointment present
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    // Click edit button for appointment
    cy.get('[alt="Edit"]').first().click({ force: true });
    // Change name and interviewer
    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Eugene Helland', { delay: 100 });

    cy.get('[alt="Tori Malcolm"]').click();

    // Click the save button
    cy.contains('Save').click();

    // Edit button present
    cy.contains('.appointment__card--show', 'Eugene Helland');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    // Click the delete button for appointment
    cy.get('[alt=Delete]').click({ force: true });
    // Click confirm button
    cy.get('.button').contains('Confirm').click();
    // Appointment slot empty
    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
