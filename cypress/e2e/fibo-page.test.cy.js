
describe("successfully loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci")
  })

  describe("Test render Button ", () => {
    it("test button disabled", () => {
        cy.contains("Рассчитать").as("button")
        cy.get("@button").should("be.disabled")
        cy.get("input").type("5")
        cy.get("@button").should("not.be.disabled")
        cy.get("input").clear()
        cy.get("@button").should("be.disabled")
    })
  });
  describe("check animation of algorhytm ", () => {
    it("check output  ", () => {
      cy.get("input").type("5")
      cy.contains("Рассчитать").click()
      cy.get("[class*=circle_circle]")
      .should("have.length", 1)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
      });

      cy.wait(500)

      cy.get("[class*=circle_circle]")
      .should("have.length", 2)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
        if(index === 1) {
          expect($item).to.contain("1")  
        }
      });

      cy.wait(500)

      cy.get("[class*=circle_circle]")
      .should("have.length", 3)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
        if(index === 1) {
          expect($item).to.contain("1")  
        }
        if(index === 2) {
          expect($item).to.contain("2")  
        }
      });

      cy.wait(500)

      cy.get("[class*=circle_circle]")
      .should("have.length", 4)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
        if(index === 1) {
          expect($item).to.contain("1")  
        }
        if(index === 2) {
          expect($item).to.contain("2")  
        }
        if(index === 3) {
          expect($item).to.contain("3")  
        }
      });

      cy.wait(500)

      cy.get("[class*=circle_circle]")
      .should("have.length", 5)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
        if(index === 1) {
          expect($item).to.contain("1")  
        }
        if(index === 2) {
          expect($item).to.contain("2")  
        }
        if(index === 3) {
          expect($item).to.contain("3")  
        }
        if(index === 4) {
          expect($item).to.contain("5")  
        }
      });

      cy.wait(500)

      cy.get("[class*=circle_circle]")
      .should("have.length", 6)
      .each(($item, index) => {
        if(index === 0) {
          expect($item).to.contain("1")
        }
        if(index === 1) {
          expect($item).to.contain("1")  
        }
        if(index === 2) {
          expect($item).to.contain("2")  
        }
        if(index === 3) {
          expect($item).to.contain("3")  
        }
        if(index === 4) {
          expect($item).to.contain("5")  
        }
        if(index === 5) {
          expect($item).to.contain("8")  
        }
      });

    })

  });

})