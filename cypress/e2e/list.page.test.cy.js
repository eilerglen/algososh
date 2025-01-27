describe("successfully loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  describe("check status Buttons", () => {
    it("Check status disabled for buttons add/remove", function () {
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.get('input[name="value"]').type("123");
      cy.contains("Добавить в head").should("not.be.disabled");
      cy.contains("Добавить в tail").should("not.be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.get('input[name="value"]').clear();
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
    });

    it("Check status disabled for buttons add/remove [index]", function () {
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
      cy.get('input[name="value"]').type("123");
      cy.get('input[name="index"]').type("3");
      cy.contains("Добавить по индексу").should("not.be.disabled");
      cy.contains("Удалить по индексу").should("not.be.disabled");
      cy.get('input[name="value"]').clear();
      cy.get('input[name="index"]').clear();
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
    });

  });

  describe("Check render animation", () => {
    it("Check render default linkedList", () => {
      cy.get("[class*=circle_content]")
        .should("have.length", 6)
        .each(($el, index) => {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          if (index === 0) {
            expect($el).to.contain("head");
          }
          if (index === 5) {
            expect($el).to.contain("tail");
          }
        });
    });

    it("Check add to head  for list", () => {
      cy.get('input[name="value"]').type("123");
      cy.contains("Добавить в head").click();

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "123");
        }
      });
    });

    it("Check add to tail for list", ()=> {
      cy.get('input[name="value"]').type("123");
      cy.contains("Добавить в tail").click();

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 6) {
          cy.wrap($el)
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 6) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "123");
          expect($el).to.contain("tail");
        }
      });
    });

    //Удаление элемента из начала

    it("Check remove head for list", () => {
      cy.contains("Удалить из head").click();

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 0) {
          expect($el).to.contain("head");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
    });

    //Удаление элемента из хвоста

    it("Check remove tail for list", () => {
      cy.contains("Удалить из tail").click();

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 5) {
          cy.wrap($el)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 5) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 5) {
          expect($el).to.contain("tail");
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
    });

    it("Check add node to index", () => {
      cy.get('input[name="value"]').type("123");
      cy.get('input[name="index"]').type("2");
      cy.contains("Добавить по индексу").click();

      for (let i = 0; i <= 2; i++) {
        cy.get("[class*=circle_content]").each(($el, index) => {
          let currentIdx = i;
          if (index < currentIdx)
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          if (index === currentIdx) {
            cy.wrap($el)
              .siblings()
              .find("[class*=circle_small]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .should("have.text", "123");
          }
        });

        cy.wait(500);
      }

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "123");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "123");
          expect($el).to.contain("2");
        }
      });
    });

    it("Check remove node to index", () =>  {
      cy.get('input[name="value"]').type("123");
      cy.get('input[name="index"]').type("2");
      cy.contains("Удалить по индексу").click();

      for (let i = 0; i <= 2; i++) {
        cy.get("[class*=circle_content]").each(($el, index) => {
          let currentIdx = i;
          if (index <= currentIdx)
            cy.wrap($el)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        });
        cy.wait(500);
      }
      cy.get("[class*=circle_content]").each(($el, index) => {
        if (index === 2) {
          cy.wrap($el)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(500);

      cy.get("[class*=circle_content]").each(($el, index) => {
        cy.wrap($el)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });
  });
});