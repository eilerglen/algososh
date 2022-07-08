describe("successfully loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });
  // Тест кнопки
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
  // Тест рендера анимации
  describe("Check render animation", () => {
    it("Check add elements of queue", () => {
      cy.get("input").type("H");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_circle]")
        .should("have.length", 7)
        .each(($item, index) => {
          if (index === 0) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        });
      cy.wait(500);
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("H");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(500);

      //Добавляем второй элемент

      cy.get("input").type("E");
      cy.contains("Добавить").click();
      cy.get("[class*=circle_circle]")
        .should("have.length", 7)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("0");
          expect($el).to.contain("H");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("E");
          expect($el).to.contain("1");
          expect($el).to.contain("tail");
          cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(500);

    

     
    });
      // Удаляем элементы: 
    it("Check remove some elements in queue", () => {

      // Добавляем 2 элемента

      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(1000)
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(500)
  
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("1");
          expect($el).to.contain("0");
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
        if (index === 1) {
          expect($el).to.contain("2");
          expect($el).to.contain("1");
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      //Удаляем первый

      cy.contains("Удалить").click();
      cy.wait(1500)
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.not.contain("1");
          expect($el).to.not.contain("head");
          expect($el).to.not.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      //Удаляем второй
      cy.contains("Удалить").click();
      cy.wait(1500);
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 1) {
          expect($el).to.not.contain("2");
          expect($el).to.not.contain("head");
          expect($el).to.not.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      })
    });
    it("Check clear of queue'", function () {
      // Добавляем 3 элемента
      cy.get("input").type("8");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("8");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("8");
      cy.contains("Добавить").click();

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("8");
          expect($el).to.contain("head");
        }
        if (index === 1) {
          expect($el).to.contain("8");
        
        }
        if (index === 2) {
          expect($el).to.contain("8");
          expect($el).to.contain("2");
          expect($el).to.contain("tail");
        }
      });
      cy.wait(1500);
      cy.contains("Очистить").click();
      cy.get("[class*=circle_content]").each(($el) => {
        expect($el).to.not.contain("8");
        expect($el).to.not.contain("8");
        expect($el).to.not.contain("8");
        expect($el).to.not.contain("head");
        expect($el).to.not.contain("tail");

      });
    });
  });
});
