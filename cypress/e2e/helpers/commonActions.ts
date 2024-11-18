class CommonActions {
    elements = {
        searchBarInputField: () => cy.getElement('input-search_bar'),
        searchResultCount: () => cy.getElement('count-search_result'),
    }

    performSearch(searchValue: string, expectedValue: string): void{
        this.elements.searchBarInputField().clear().type(searchValue);
        this.elements.searchResultCount().should('contain', expectedValue)
    }
}

export default new CommonActions();
