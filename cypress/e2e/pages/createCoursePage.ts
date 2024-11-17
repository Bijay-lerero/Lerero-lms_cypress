class CreateCoursePage {
    elements = {
      coverImageInput: () => cy.get(':nth-child(2) > .courses-file > input'),
      saveButton: () => cy.get('.discussions-create-form-button'),
      logoImageInput: () => cy.get(':nth-child(6) > .courses-file > input'),
      courseTitleInput: () => cy.get('#topic'),
      courseDescriptionEditor: () => cy.window().its('customEditor'),
      saveAndProceedButton: () => cy.get('[data-testid="button-saveAndProceed"]'),
      successModalTitle: () => cy.get('.modal__success--title'),
      successModalButton: () => cy.get('.modal__success--button'),
    };
  
    uploadCoverImage(imagePath: string): void {
      this.elements.coverImageInput().attachFile(imagePath);
      this.elements.saveButton().click();
    }
  
    uploadLogoImage(imagePath: string): void {
      this.elements.logoImageInput().attachFile(imagePath);
      this.elements.saveButton().click();
    }
  
    enterCourseDetails(title: string, description: string): void {
      this.elements.courseTitleInput().type(title);
      this.elements.courseDescriptionEditor().then((editor: any) => {
        editor.setData(`<p>${description}</p>`);
      });
    }
  
    saveAndProceed(): void {
      this.elements.saveAndProceedButton()
      .should('be.visible')
      .and('not.be.disabled')
      .click();      
      this.elements.successModalTitle().should('contain', 'Create course was successful.');
      this.elements.successModalButton().click();
    }
  }
  
  export default new CreateCoursePage();
  