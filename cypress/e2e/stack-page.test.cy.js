describe("successfully loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  describe("Test render Button ", () => {
    it("test button disabled", () => {
      cy.contains("Добавить").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("123");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка работы анимации изменения структуры данных", () =>{
    it("Корректно добавляет несколько элементов", () => {

      // Добавляем и смотрим за первым элементом
      cy.get("input").type("H");
      cy.contains("Добавить").click();

      cy.get("[class*=stack-page_list-elem]")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("H");
          expect($el).to.contain("0");
          expect($el).to.contain("top");
                
        });

      cy.get("[class*=circle_circle]")
      .should("have.length", 1)
      .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );

      })
      cy.wait(500);
    
      cy.get("[class*=circle_circle]")
      .should("have.length", 1)
      .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );

      })
      // cy.get("[class*=stack-page_list-elem]")
      //   .should("have.length", 1)
      //   .each(($el) => {
      //     expect($el).to.contain("new1");
      //     expect($el).to.contain("0");
      //     cy.wait(500);
      //     cy.wrap($el)
      //       .find("[class*=circle_circle]")
      //       .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      //   });

      // cy.wait(500);

      // cy.get("[class*=circle_content]")
      //   .should("have.length", 1)
      //   .each(($el) => {
      //     expect($el).to.contain("new1");
      //     cy.wrap($el)
      //       .find("[class*=circle_circle]")
      //       .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      //   });

     
    });
  });
});
