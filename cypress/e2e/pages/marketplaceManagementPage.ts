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
    threeDotMenu: () => cy.getElement('three-dot-menu'),
    editButton: () => cy.getElement('button-edit'),
    courseTypeDropdown: () => cy.getElement('dropdown-courseType'),
    courseTitleField: () => cy.getElement('textfield-title'),
    courseDescriptionField: () => cy.window().its('customEditor'),
    mainCategoryDropdown: () => cy.getElement('dropdown-mainCategory'),
    subCategoryDropdown: () => cy.getElement('dropdown-subCategory'),
    courseLevelDropdown: () => cy.getElement('dropdown-courseLevel'),
    languageDrodown: () => cy.getElement('dropdown-language'),
    deliveryMethodDropdown: () => cy.getElement('dropdown-deliveryMethod'),
    certificationDropdown: () => cy.getElement('dropdown-certification'),
    researcherFacilitatorName : () => cy.getElement('text-researcherFacilitatorName'),
    researcherFacilitatorEmail : () => cy.getElement('text-researcherFacilitatorEmail'),
    courseProviderInformation: () => cy.window().its('customEditor'),
    usdPriceField: () => cy.getElement('text-usdPrice'),
    prriceAfterDiscountField: () => cy.getElement('text-afterDiscountPrice'),
    courseDurationFieldOne: () => cy.getElement('text-durationValueOne'),
    courseDurationFieldTwo: () => cy.getElement('text-durationValueTwo'),
    courseDurationFieldOneDropdown: () => cy.getElement('dropdown-durationValueOne'),
    courseDurationFieldTwoDropdown: () => cy.getElement('dropdown-durationValueTwo'),
    nextButton: () => cy.getElement('button-next'),
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
  
  validateCourseWhenAddingPrice(searchValue: string): void{
    this.validateAdditionOfCourse(searchValue)
    this.elements.threeDotMenu().click()
    this.elements.editButton().click()
    this.elements.courseTitleField().should('be.disabled');
    this.elements.courseTypeDropdown().should('be.disabled');
    this.elements.subCategoryDropdown().should('be.disabled');
    this.elements.courseLevelDropdown().should('be.disabled');
    this.elements.deliveryMethodDropdown().should('be.disabled');
    this.elements.nextButton().should('be.disabled');
    this.elements.mainCategoryDropdown().should('be.disabled');
  }

  addPriceToCourse(courseDetails: {
    researcherName: string;
    researcherEmail: string;
    originalPrice: string;
    discountedPrice: string;
    duration: { value: string; type: 'minutes' | 'hours' | 'days' | 'weeks' | 'months' }[];
  }): void {
    const { researcherName, researcherEmail, originalPrice, discountedPrice, duration } = courseDetails;
  
    this.elements.researcherFacilitatorName().type(researcherName);
    this.elements.researcherFacilitatorEmail().type(researcherEmail);
    this.elements.usdPriceField().type(originalPrice);
    this.elements.prriceAfterDiscountField().type(discountedPrice);
  
    duration.forEach((dur, index) => {
      if (index === 0) {
        this.elements.courseDurationFieldOne().type(dur.value);
        this.elements.courseDurationFieldOneDropdown().select(dur.type); // Use select() for dropdowns
      } else {
        this.elements.courseDurationFieldTwo().type(dur.value);
        this.elements.courseDurationFieldTwoDropdown().select(dur.type); // Use select() for dropdowns
      }
    });
  }
  
}

export default new MarketplaceManagementPage();
