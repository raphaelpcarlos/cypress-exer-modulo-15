/// <reference types= "Cypress" />

describe('Login - Teste da API SrvRest', () => {
  it('Deve fazer Login com sucesso', () => {
    
    cy.request({
      method:"POST",
      url: "http://localhost:3000/login",
      body:{
          "email": "beltrano@teste2.com.br",
          "password": "teste"
      }
    }).then(response=>{
      
      expect(response.status).equal(200)
      expect(response.body.message).equal("Login realizado com sucesso")
      cy.log(response.body.authorization)
    })
  })
})