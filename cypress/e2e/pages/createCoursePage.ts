class CreateCoursePage {
    elements = {
      coverImageInput: () => cy.get(':nth-child(2) > .courses-file > input'),
      saveButton: () => cy.get('.discussions-create-form-button'),
      logoImageInput: () => cy.get(':nth-child(6) > .courses-file > input'),
      courseTitleInput: () => cy.get('#topic'),
      courseTitleView: () => cy.getElement('view-course_title'),
      courseDescriptionEditor: () => cy.window().its('customEditor'),
      courseDescriptionView: () => cy.getElement('view-course_description'),
      saveAndProceedButton: () => cy.getElement('button-saveAndProceed'),
      successModalTitle: () => cy.get('.modal__success--title'),
      successModalButton: () => cy.get('.modal__success--button'),
      searchBarInputField: () => cy.getElement('input-search_bar'),
      searchResultCount: () => cy.getElement('count-search_result'),
      searchResult: () => cy.getElement('text-get_course_title'),
      previewButton: () => cy.getElement('button-preview'),
      goToDiscussionButton: () => cy.getElement('button-goToDiscussions'),
      startCourseButton: () => cy.getElement('button-startCourse'),
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
      cy.intercept('POST', 'https://api-dev.lms.lerero.com/courses').as('postData');
      this.elements.saveAndProceedButton()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
      cy.wait('@postData').its('response.statusCode').should('eq', 201);
      this.elements.successModalTitle().should('contain', 'Create course was successful.');
      this.elements.successModalButton().click();
    }

    validatePreviewOfCourse(title: string, description: string):void{
      this.elements.previewButton()
      .should('be.visible')
      .click()
      this.elements.courseTitleView()
      .should('be.visible')
      .should('contain',title)
      this.elements.courseDescriptionView()
        .invoke('text') // Get the truncated text
        .then((visibleText) => {
          expect(description.startsWith(visibleText)).to.be.true;
        });
        this.elements.goToDiscussionButton()
        .should('be.visible')     
        .and('not.be.disabled')
        this.elements.startCourseButton()
        .should('be.visible')     
        .and('be.disabled')
      }

    validateAdditionOfCourse(title: string): void {
      this.elements.searchBarInputField().type(title);
      this.elements.searchResultCount().should('contain','1 Courses')
      this.elements.searchResult()
        .invoke('text') // Get the truncated text
        .then((visibleText) => {
          expect(title.startsWith(visibleText)).to.be.true;
        });
      this.elements.searchResult().click()
    }
}

  export default new CreateCoursePage();
  