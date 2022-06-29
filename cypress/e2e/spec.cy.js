
describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('button should be disabled on start', () => {
    cy.get('input').clear()
    cy.get('button').should('be.disabled')
  })

  // it('button should be disabled on start', () => {
  //   cy.get('input').clear()
  //   cy.get('button').should('be.disabled')
  // })
})