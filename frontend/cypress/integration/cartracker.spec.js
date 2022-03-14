describe('cartracker', () => {

  const username = 'admin';
  const password = 'admin1';
  const cypressTestInputUsername1 = 'aCypressB';
  const cypressTestInputPassword1 = 'acPasswordB';
  const cypressTestInputZoneName1 = 'acZNameB';
  const cypressTestInputZoneRadius1 = '20';
  const cypressTestInputUsername2 = 'aCypressA';
  const cypressTestInputPassword2 = 'acPasswordA';
  const cypressTestInputZoneName2 = 'acZNameA';
  const cypressTestInputZoneRadius2 = '10';

  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
    cy.get('#mat-input-0').type(username);
    cy.get('.mat-card').type(password);
    cy.get('.btn-block').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from failing the test
      return false
    });
  });

  it('should reach log in/homepage', () => {
    cy.visit('http://localhost:4200/');
    cy.contains('cartracker');
    cy.contains('Log in');
  });

  it('should log in', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('#mat-input-0').type(username);
    cy.get('.mat-card').type(password);
    cy.get('.btn-block').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from failing the test
      return false
    });
    cy.url().should('contain', '/map');
  });

  it('should navigate to user screen', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('ID');
    cy.contains('Name');
    cy.contains('Password');
    cy.contains('Zone');
    cy.contains('Status');
    cy.contains('Position');
    cy.contains('Created');
  });

  it('should add user', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('library_add').click();
    cy.wait(500);
    cy.get('input').first().type(cypressTestInputUsername2);
    cy.wait(500);
    cy.get('*[type="password"]').type(cypressTestInputPassword2);
    cy.get('*[id="mat-select-value-3"]').click();
    cy.get('*[class="mat-option-text"]').contains('Gießen').click();
    cy.wait(500);
    cy.contains(/^Create$/).click();
    cy.contains(cypressTestInputUsername2);
  })

  it('should zoom at user on map', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('open_in_new').click();
    cy.contains('Add CircleZone');
  })

  it('should edit user', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('Name').click().click();
    cy.contains('edit').click();
    cy.wait(500);
    cy.get('input').first().type(cypressTestInputUsername1);
    cy.wait(500);
    cy.get('*[type="password"]').type(cypressTestInputPassword1);
    cy.get('*[id="mat-select-value-3"]').click();
    cy.get('*[class="mat-option-text"]').contains('Gießen').click();
    cy.wait(500);
    cy.contains(/^Update$/).click();
    cy.wait(2000);
    cy.contains(cypressTestInputUsername1);
  })

  it('should turn visibility on and off', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('Name').click().click();
    cy.contains('visibility_off').click();
    cy.contains(cypressTestInputPassword1);
    cy.contains('visibility').click();
    cy.contains(cypressTestInputPassword1).should('not.exist');
  })

  it('should delete user', () => {
    cy.get('span:nth-child(5)').click();
    cy.contains('Name').click().click();
    cy.contains('delete_outline').click();
    cy.contains(/^Delete$/).click();
    cy.contains(cypressTestInputUsername1).should('not.exist');
  })

  it('should navigate to zones screen', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('ID');
    cy.contains('Name');
    cy.contains('Type');
    cy.contains('Complexity');
    cy.contains('Radius (in km)');
  });

  it('should create circle zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('library_add').click();
    cy.get('*[class="mat-radio-inner-circle"]').first().click();
    cy.contains(/^Create$/).click();
    cy.get('#map').click().click(500,500);
    cy.get('input[type="number"]').last().type('20').trigger('change');
    cy.get('input[type="text"]').first().type(cypressTestInputZoneName2);
    cy.contains('check').click();
    cy.get('span:nth-child(7)').click();
    cy.contains(cypressTestInputZoneName2);
  });

  it('should zoom at circle zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('Name').click().click();
    cy.contains('open_in_new').click();
    cy.contains('Add CircleZone');
  })

  it('should edit circle zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('Name').click().click();
    cy.contains('edit').click();
    cy.wait(250);
    cy.get('input').first().type(cypressTestInputZoneName1);
    cy.wait(250);
    cy.get('input').last().type(cypressTestInputZoneRadius1);
    cy.contains(/^Update$/).click();
    cy.contains(cypressTestInputZoneName1);
  });

  it('should delete circle zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('Name').click().click();
    cy.contains('delete_outline').click();
    cy.contains(/^Delete$/).click();
    cy.contains(cypressTestInputZoneName1).should('not.exist');
  });

  it('should create polygon zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('library_add').click();
    cy.get('*[class="mat-radio-inner-circle"]').last().click();
    cy.contains(/^Create$/).click();
    cy.get('#map').click().click(250,250).click(500,250).click(250,500);
    cy.get('input[type="text"]').last().type(cypressTestInputZoneName2);
    cy.get('mat-icon[class="mat-icon notranslate material-icons mat-icon-no-color"]').last().click();
    // cy.contains('check').last().click();
    cy.get('span:nth-child(7)').click();
    cy.contains(cypressTestInputZoneName2);
  });

  it('should zoom at polygon zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('Name').click().click();
    cy.contains('open_in_new').click();
    cy.contains('Add CircleZone');
  })

  it('should delete polygon zone', () => {
    cy.get('span:nth-child(7)').click();
    cy.contains('Name').click().click();
    cy.contains('delete_outline').click();
    cy.contains(/^Delete$/).click();
    cy.contains(cypressTestInputZoneName1).should('not.exist');
  });

  it('should navigate to impressum', () => {
    cy.contains('help').click();
    cy.contains('Impressum');
  })

  it('should log out', () => {
    cy.contains('logout').click();
    cy.contains('cartracker');
    cy.contains('Log in');
  })
});
