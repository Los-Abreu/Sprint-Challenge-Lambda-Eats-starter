describe('Testing pizza and submitting form', function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/");
    });
    it("add test and submit form", function() {
        cy.get("button")
        .click()
        cy.get("input[name='name']")
        .type('Carlos Abreu')
        .should("have.value", 'Carlos Abreu')
        cy.get("select[name='size']")
        .select('medium')
        .should("have.value", 'medium')
        cy.get("[type=checkbox]")
        .check()
        .should("be.checked")
        cy.get("textarea[name='SpecialIns']")
        .type('Well done please')
        .should("have.value", 'Well done please')
        cy.get("button")
        .click()

    })
})