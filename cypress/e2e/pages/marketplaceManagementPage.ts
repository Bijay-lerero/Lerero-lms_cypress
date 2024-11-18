import CommonActions from "../helpers/commonActions";

class MarketplaceManagementPage {
  elements = {
    sideMenu: () => cy.getElement('sidemenu-marketplaceManagement'),
    courseTitle: () => cy.getElement('view-course_title'),
    courseDescription: () => cy.getElement('view-course_description'),
    priceValue: () => cy.getElement('price-value'),
    courseTypeValue: () => cy.getElement('courseType-value'),
    mainCategoryValue: () => cy.getElement('mainCategory-value'),
    subCategoryValue: () => cy.getElement('subCategory-value'),
    courseLevelValue: () => cy.getElement('courseLevel-value'),
    deliveryMethodValue: () => cy.getElement('deliveryMethod-value'),
    certificationValue: () => cy.getElement('certification-value'),
    languageValue: () => cy.getElement('language-value'),
    marketplacePreviewButton: () => cy.getElement('button-marketplacePreview'),
    marketeplacePreviewBackButton: () => cy.getElement('button-back'),
  };

  navigateToMarketplaceManagement(): void {
    cy.intercept('GET', 'https://api-dev.lms.lerero.com/marketplace-courses*', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('getCourses');
    this.elements.sideMenu().click();
    //wait for the available course to load
    cy.wait('@getCourses');
  }
  validateAdditionOfCourse(searchValue: string): void {
    CommonActions.performSearch(searchValue, "1 Courses")
  }
  openCourseDetails(): void{
    this.elements.marketplacePreviewButton().click()
  }
  validateDetailsOfAddedCourse(expectedDetails: Record<string, string>): void{
    this.elements.marketplacePreviewButton().click()
    this.elements.courseTitle().should('contain.text', expectedDetails.courseTitle);
    this.elements.courseDescription().should('contain.text', expectedDetails.courseDescription);
    this.elements.priceValue().should('contain.text', expectedDetails.price);
    this.elements.courseTypeValue().should('contain.text', expectedDetails.courseType);
    this.elements.mainCategoryValue().should('contain.text', expectedDetails.mainCategory);
    this.elements.subCategoryValue().should('contain.text', expectedDetails.subCategory);
    this.elements.courseLevelValue().should('contain.text', expectedDetails.courseLevel);
    this.elements.deliveryMethodValue().should('contain.text', expectedDetails.deliveryMethod);
    this.elements.certificationValue().should('contain.text', expectedDetails.certification);
    this.elements.languageValue().should('contain.text', expectedDetails.language);
    this.elements.marketeplacePreviewBackButton().click()
  }
  
}

export default new MarketplaceManagementPage();
