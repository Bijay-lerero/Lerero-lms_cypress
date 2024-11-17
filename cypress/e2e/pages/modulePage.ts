class ModulePage {
  elements = {
    addModuleButton: () => cy.getElement('button-addModule'),
    standardModuleCard: () => cy.getElement('card-standard_module_title'),
    learningJourneyCard: () => cy.getElement('card-learning_journey_title'),
    standardModuleCardDesc: () => cy.getElement('card-standard_module_description'),
    learningJourneyCardDesc: () =>cy.getElement('card-learning_journey_description'),
    existingModuleCard: () => cy.getElement('Onboarding_title'),
    moduleTitleInput: () => cy.getElement('text-module_title'),
    moduleDescriptionInput: () => cy.getElement('text-module_description'),
    thumbnailInput: () => cy.getElement('uploadfile-thumbnail'),
    saveAndProceedButton: () => cy.getElement('button-saveAndProceed'),
    successMessage: () => cy.getElement('message-module_created_successfully'),
    successButton: () => cy.getElement('button-okay'),

  };

  addLearningJourneyModule(title: string, description: string, thumbnail: string): void {
    this.elements.addModuleButton().click();
    this.elements.standardModuleCard().should('contain','Standard Module');
    this.elements.learningJourneyCard().should('contain','Learning Journey');
    this.elements.learningJourneyCardDesc().click();
    this.elements.existingModuleCard().click();
    this.elements.moduleTitleInput().type(title);
    this.elements.moduleDescriptionInput().type(description);
    this.elements.thumbnailInput().attachFile(thumbnail);
    this.elements.saveAndProceedButton().click();
    this.elements.successMessage().should('contain', 'Module Created Successfully!');
    this.elements.successButton().click();
  }
}

export default new ModulePage();
