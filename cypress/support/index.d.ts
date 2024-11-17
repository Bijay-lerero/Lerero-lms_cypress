declare namespace Cypress{
    interface Chainable{
        login(username, password): Chainable<Element>;
        getElement(value): Chainable<Element>;
    }
}