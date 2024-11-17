class MarketplaceManagementPage {
  elements = {
    sideMenu: () => cy.get('[data-testid="sidemenu-marketplaceManagement"]'),
  };

  navigateToMarketplaceManagement(): void {
    this.elements.sideMenu().click();
  }
}

export default new MarketplaceManagementPage();
