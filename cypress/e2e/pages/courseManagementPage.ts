class CourseManagementPage {
    elements = {
      courseManagementTab: () => cy.getElement('courseManagement'),
      coursePageHeader: () => cy.get('.library__header > .title'),
      createCourseButton: () => cy.get('.button-basic').first(),
    };
  
    navigateToCourseManagement(): void {
      this.elements.courseManagementTab().click();
      this.elements.coursePageHeader().should('contain', 'Courses');
    }
  
    clickCreateCourse(): void {
      this.elements.createCourseButton().click();
    }
  }
  
  export default new CourseManagementPage();
  