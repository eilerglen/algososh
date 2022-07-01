describe("successfully loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  describe("Test render Button ", () => {
    it("test button disabled", () => {
        cy.contains("Добавить").as("button")
        cy.get("@button").should("be.disabled")
        cy.get("input").type("123")
        cy.get("@button").should("not.be.disabled")
        cy.get("input").clear()
        cy.get("@button").should("be.disabled")
    })
  });


});
