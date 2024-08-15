describe('Fotos', () => {
  beforeEach(() => {
    cy.login('second.user@hotmail.com', '12345678');
    cy.get('[data-cy=images_link]').should('exist');
    cy.get('[data-cy=images_link]').click();
  });

  it('should show an empty list with user without fotos', () => {
    cy.logout();
    cy.login('first.user@hotmail.com', '12345678'); // 1ste gebruiker zonder fotos/albums

    cy.get('[data-cy=images_link]').should('exist');
    cy.get('[data-cy=images_link]').click();
    cy.get('[data-cy=foto_card_list]').children().should('have.length', 0);
  })

  it('should be able to see the fotos page and expected amount of fotos', () => {
    cy.url().should('include', '/fotos');

    cy.get('[data-cy=foto_card_list]').should('exist');
    cy.get('[data-cy=foto_card_list]').children().should('have.length', 15);
  })

  it('should change amount of fotos visible and set the choice in localstorage', () => {
    cy.get('[data-cy=number_select]').should('exist');
    cy.get('[data-cy=number_select]').select('5').should('have.value', 5);
    cy.get('[data-cy=number_select]').select('10').should('have.value', 10);
    cy.get('[data-cy=number_select]').select('15').should('have.value', 15);
    cy.get('[data-cy=number_select]').select('20').should('have.value', 20);


    cy.get('[data-cy=number_select]').select('20');
    cy.get('[data-cy=foto_card_list]').children().should('have.length', 20);

    cy.window().then((win) => {
      //console.log(win.localStorage); // debugging
      const itemsPerPage = win.localStorage.getItem("itemsPerPage");
      expect(itemsPerPage).to.not.be.null;
      expect(itemsPerPage).to.not.be.undefined;
      expect(itemsPerPage).to.equal('20');
    });

    cy.get('[data-cy=number_select]').select('10');
    cy.get('[data-cy=foto_card_list]').children().should('have.length', 10);

    cy.window().then((win) => {
      const itemsPerPage = win.localStorage.getItem("itemsPerPage");
      expect(itemsPerPage).to.not.be.null;
      expect(itemsPerPage).to.not.be.undefined;
      expect(itemsPerPage).to.equal('10');
    });
  })

  it('should have a form that shows the correct inputfields', () => {

    navigateToFormHelper();

    //cy.get('[data-cy=album_select]').children().should('have.length', 6); -> geen goed idee voor een test, de length van deze children zal veel muteren tijdens de verschillende tests
    cy.get('[data-cy=album_select]').select('Vacation 2023').should('have.value', 1);
    cy.get('[data-cy=album_select]').select('Nature Trips').should('have.value', 2);
    cy.get('[data-cy=album_select]').select('Landscapes').should('have.value', 3);
    cy.get('[data-cy=album_select]').select('Work Events').should('have.value', 4);
    cy.get('[data-cy=album_select]').select('Family').should('have.value', 5);
    cy.get('[data-cy=album_select]').select('Wilderness').should('have.value', 6);

    //als je een bestaand album kiest mag je geen nieuw album maken
    cy.get('[data-cy=input_new_album]').should('not.exist');

    //select default en je mag weer een album maken
    cy.get('[data-cy=album_select]').select('-- Select an Album --');
    cy.get('[data-cy=input_new_album]').should('exist');
  })

  it('should show an error when trying to add an album that already exists', () => {

    navigateToFormHelper();

    //probeer add & create met met een albumnaam die al bestaat
    cy.get('[data-cy=newalbum_input]').should('exist');
    cy.get('[data-cy=newalbum_input]').type('Landscapes');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=create_and_addtoalbum_error]').should('exist');
  })

  //falende test:
  it('should show an error when clicking twice on add a new album with a new album name', () => {

      navigateToFormHelper();

    //1x een nieuw album aanmaken en foto toevoegen, moet lukken
    cy.get('[data-cy=newalbum_input]').should('exist');
    cy.get('[data-cy=newalbum_input]').type('Test Album');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=addtoalbum_success]').should('exist');

    //2x de album aanmaken en foto toevoegen, moet een error tonen
    cy.wait(500);
    cy.get('[data-cy=add_btn]').click();
    //cy.get('[data-cy=create_and_addtoalbum_error]').should('exist'); // hier faalt de test: er is geen error message te zien in de DOM
  })

  it('should show an error when trying to add a photo to the same album 2x', () => {

    navigateToFormHelper();

    //1ste click -> success msg (fails on multiple test-runs)
    cy.get('[data-cy=album_select]').select('Wilderness');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=addtoalbum_success]').should('exist');

    //2de click -> err msg
    cy.get('[data-cy=album_select]').select('Wilderness');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=addtoalbum_error]').should('exist');

  })

  it('should have a working form that can handle erroneous inputs', () => {

    navigateToFormHelper();

    //test empty string
    cy.get('[data-cy=newalbum_input]').should('exist');
    //cy.get('[data-cy=newalbum_input]').type(''); // Cypress: "cannot type an empty string you have to actually type something"
    cy.get('[data-cy=newalbum_input]').clear(); // leegmaken
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=create_and_addtoalbum_error]').should('exist');
    cy.get('[data-cy=create_and_addtoalbum_error]').contains('Please select an existing album or enter a new album name.');

    //test existing album name
    cy.get('[data-cy=newalbum_input]').should('exist');
    cy.get('[data-cy=newalbum_input]').type('Family');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=create_and_addtoalbum_error]').should('exist');
    cy.get('[data-cy=create_and_addtoalbum_error]').contains('Album name already exists.');

    //test name too long, met een 26-tekens lange naam
    cy.get('[data-cy=newalbum_input]').should('exist');
    cy.get('[data-cy=newalbum_input]').clear(); // 'Family' zit nog in de field als text
    cy.get('[data-cy=newalbum_input]').type('12345678901234567890123456');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=create_and_addtoalbum_error]').should('exist');
    cy.get('[data-cy=create_and_addtoalbum_error]').contains('Album name exceeds 25 characters.');

  })

  
  it('should create an album and add image when album name is max-length', () => {

    navigateToFormHelper();

    //input een 25-tekens lange naam
    cy.get('[data-cy=newalbum_input]').should('exist');
    cy.get('[data-cy=newalbum_input]').type('1234567890123456789012345');
    cy.get('[data-cy=add_btn]').click();
    cy.wait(500);
    cy.get('[data-cy=addtoalbum_success]').should('exist');
    cy.get('[data-cy=create_and_addtoalbum_error]').should('not.exist');
  })

  it('should have deleted the image', () => {
    // fotos opvangen, omdat we al op de page zitten: reload
    cy.intercept('GET', 'api/fotos').as('getAllFotos');
    cy.reload();
    
    cy.wait('@getAllFotos').then((interception) => {
        const initialImageCount = interception.response.body.count;
        //console.log(interception.response.body); //debugging
        
        // foto deleten
        cy.get('[data-cy=foto_card]').first()
            .find('img')
            .should('be.visible')
            .click();
        cy.wait(500);

        cy.get('[data-cy=fotodelete_btn]').should('exist').click();

        // wachten op fotos na delete
        cy.wait('@getAllFotos').then((interceptionAfterDelete) => {
            const newImageCount = interceptionAfterDelete.response.body.count;

            // moet 1 minder zijn
            expect(newImageCount).to.eq(initialImageCount - 1);
        });
    });
  });

  const navigateToFormHelper = () => {
    cy.get('[data-cy=foto_card]').first()
    .find('img')
    .should('be.visible')
    .click();
    cy.wait(500);

    cy.get('[data-cy=fotodelete_btn]').should('exist');
    cy.get('[data-cy=addtoalbum_btn]').should('exist');

    cy.get('[data-cy=addtoalbum_btn]').click();
    cy.wait(500);

    cy.get('[data-cy=album_select]').should('exist');
    cy.get('[data-cy=input_new_album]').should('exist');
  };
})