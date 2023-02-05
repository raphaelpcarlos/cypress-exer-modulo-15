
Cypress.Commands.add('token', (email, password) => {
  cy.request({
    method: "POST",
    url: "login",
    body: {
      "email": email,
      "password": password
    }
  }).then(response => {

    expect(response.status).equal(200)
    return response.body.authorization
  })
})


Cypress.Commands.add('cadastrarProduto', (token, produto,preco,descricao,quantidade) => {
  cy.request({
    method: "POST",
    url: "produtos",
    headers: {
      authorization: token
    },
    failOnStatusCode: false,
    body: {
      "nome": produto,
      "preco": preco,
      "descricao": descricao,
      "quantidade": quantidade
    }
  })
})