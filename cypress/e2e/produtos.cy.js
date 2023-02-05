/// <reference types= "Cypress" />
import contrato from '../contracts/produtos.contract'

describe('Teste da Funcionalidade Produtos - Teste da API SrvRest', () => {

    let token

    beforeEach(() => {
        cy.token("beltrano@teste2.com.br", "teste").then(tkn => {
            token = tkn
        })
    })

    it.only('Deve validar contrato de produto',()=>{
        cy.request('produtos').then(response=>{
            return contrato.validateAsync(response.body)
        })
    })

    it('Listar produtos', () => {

        cy.request({
            method: "GET",
            url: "produtos",
        }).then(response => {
            //expect(response.body.produtos[3].nome).to.equal("Logitech teste teste")
            expect(response.status).equal(200)
            expect(response.body).have.property('produtos')
            expect(response.duration).to.be.lessThan(15)
        })
    })

    it("Cadastrar produto", () => {
        let produto = `Produtos teste ${Math.floor(Math.random() * 1000)}`
        cy.cadastrarProduto(token, produto, 470, 'Mouse', 300).then(response => {
            expect(response.status).equal(201)
            expect(response.body.message).equal("Cadastro realizado com sucesso")
        })
    })

    it("Deve validar mensagem de erro ao cadastrar produto repetido", () => {
        cy.cadastrarProduto(token, 'Logitech', 470, 'Mouse', 300).then(response => {
            expect(response.status).equal(400)
            expect(response.body.message).equal("Já existe produto com esse nome")
        })
    })

    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {
                    authorization: token
                },
                body: {
                    "nome": 'produto3',
                    "preco": 100,
                    "descricao": 'descricao',
                    "quantidade": 100

                }
            }).then(response => {
                expect(response.body.message).equal("Registro alterado com sucesso")
            })
        })
    })

    it('Deve editar um produto cadastrado previamente', () => {

        let produto = `Produtos teste ${Math.floor(Math.random() * 1000)}`
        cy.cadastrarProduto(token, produto, 470, 'Mouse', 300).then(response => {
            let id = response.body._id
            expect(response.body.message).equal("Cadastro realizado com sucesso")
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {
                    authorization: token
                },
                body: {
                    "nome": produto,
                    "preco": 100,
                    "descricao": 'descricao',
                    "quantidade": 100

                }
            }).then(response => {
                expect(response.body.message).equal("Registro alterado com sucesso")
            })
        })
    })

    it('Deve deletar um produto previamente cadastrado', () => {

        let produto = `Produtos teste ${Math.floor(Math.random() * 1000)}`
        cy.cadastrarProduto(token, produto, 470, 'Mouse', 300).then(response => {
            let id = response.body._id
            expect(response.body.message).equal("Cadastro realizado com sucesso")
            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {
                    authorization: token
                }
            }).then(response => {
                expect(response.body.message).equal("Registro excluído com sucesso")
            })
        })

    })

})


