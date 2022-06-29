
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('button should be disabled on start', () => {
    cy.get('input').clear()
    cy.get('button').should('be.disabled')
  })

  it('button should be disabled on start', () => {
    cy.get('input').type('123')
    cy.get('button').eq(1).click()

    cy.get("[class*=string_list-elem]")
    .should("have.length", 3)
    .each((item, index) => {
      if(index === 0) cy.wrap().contains('1')
      if(index === 1) cy.wrap().contains('2')
      if(index === 2) cy.wrap().contains('3')

      if(index === 0 || index === 2) {
        cy.wrap(item).should(
          'have.css',
          "border",
          
        )
      }

    })
     
  })
})