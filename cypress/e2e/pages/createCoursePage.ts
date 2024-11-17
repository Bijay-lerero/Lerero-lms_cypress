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
      searchBarInputField: () => cy.getElement('input-search_bar'),
      searchResultCount: () => cy.getElement('count-search_result'),
      searchResult: () => cy.getElement('text-get_course_title'),
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

  validateAdditionOfCourse(title: string): void {
    this.elements.searchBarInputField().type(title);
    this.elements.searchResultCount().should('contain','1 Courses')
    this.elements.searchResult()
      .invoke('text') // Get the truncated text
      .then((visibleText) => {
        console.log(visibleText)
        expect(title.startsWith(visibleText)).to.be.true;
      });
    this.elements.searchResult().click()
  }
}

  export default new CreateCoursePage();
  