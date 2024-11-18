import CommonActions from "../helpers/commonActions";

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
      activateButton: () => cy.get('[data-testid="button-activate"]'),
      confirmationMessage: () => cy.get('[data-testid="messaget-activation_confirmation"]'),
      yesButton: () => cy.get('[data-testid="button-yes"]'),
      successMessage: () => cy.get('[data-testid="message-successful"]'),
      okayButton: () => cy.get('[data-testid="button-okay"]'),
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
      cy.wait('@postData').then((interception) => {
        if (!interception.response) {
          // If response is undefined, log an error and fail the test
          cy.log('No response received for the intercepted request!');
          throw new Error('interception.response is undefined. Check the network request.');
        }
        if(!expect(interception.response.statusCode).to.eq(201)){
          cy.log('Assertion Failed! Logging details...');
          cy.log('Response Status Code:', interception.response.statusCode);
          cy.log('Response Body:', JSON.stringify(interception.response.body, null, 2));
          cy.log('Response Headers:', JSON.stringify(interception.response.headers, null, 2));
          cy.log('Request URL:', interception.request.url);
          cy.log('Request Body:', JSON.stringify(interception.request.body, null, 2));
          throw new Error('unable to add the course');
        }
      });
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
        
      this.elements.goToDiscussionButton()
        .should('be.visible')     
        .and('not.be.disabled')
      this.elements.startCourseButton()
        .should('be.visible')     
        .and('have.css', 'pointer-events', 'none');
      }

    validateAdditionOfCourse(title: string): void {
      CommonActions.performSearch(title, '1 Courses');
      this.elements.searchResult()
        .invoke('text') // Get the truncated text
        .then((visibleText) => {
          expect(title.startsWith(visibleText)).to.be.true;
        });
      this.elements.searchResult().click()
    }

    createCourse(courseCover: string, courseLogo: string, courseTitle: string, courseDescription: string): void{
      this.uploadCoverImage(courseCover);
      this.uploadLogoImage(courseLogo);
      this.enterCourseDetails(courseTitle, courseDescription);
      this.saveAndProceed();
    }

    activateCourse(): void {
      this.elements.activateButton().click();
      this.elements.confirmationMessage().should('contain', 'Are you sure want to activate this course?');
      this.elements.yesButton().click();
      this.elements.successMessage().should('contain', 'Activate course was successful.');
      this.elements.okayButton().click();
    }
}

  export default new CreateCoursePage();
  