
describe("reverse string ", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
})


  describe("check status button", () => {
    it("check button disabled", () => {
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("test");
      cy.get("@button").should("not.be.disabled")
      cy.get("input").clear()
      cy.get("@button").should("be.disabled")
    })
  })

  describe("check animation of algorhytms", () => {
    it("correct reverse string", () => {
      cy.get("input", )
    })
  })

  it('button should be disabled on start', () => {
    cy.get('input').type('123')
    cy.get('button').eq(1).click()

    cy.get("[class*=circle_circle]")
    .should("have.length", 3)
    .each(($item, index) => {
      if(index === 0) cy.wrap().contains('1')
      if(index === 1) cy.wrap().contains('2')
      if(index === 2) cy.wrap().contains('3')

      if(index === 0 || index === 2) {
        cy.wrap($item).should(
          "have.css",
          "border",
          "4px solid rgb(0, 50, 255)"
        )
      }

    })

    cy.wait(5000)

    cy.get("[class*=circle_circle]").each(($el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap($el).should(
          "have.css",
          "border",
          "4px solid rgb(127, 224, 81)"
        );
        if (index === 0) expect($el).to.contain(2);
        if (index === 2) expect($el).to.contain(0);
      }
    });

    cy.wait(500);

     
  })
})