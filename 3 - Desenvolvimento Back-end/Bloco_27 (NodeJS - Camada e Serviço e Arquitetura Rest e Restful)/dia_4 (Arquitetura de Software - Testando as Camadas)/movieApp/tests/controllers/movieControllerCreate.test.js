// NAME=movieControllerCreate npm test
const sinon = require('sinon');
const { expect } = require('chai');

const MoviesService = require('../../services/movieService');
const MoviesController = require('../../controllers/movieController');

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      /*
        Perceba que nosso stub também simula os comportamentos do `service`,
        dessa forma, conseguimos testar o comportamento do controller de
        maneira isolada.

        Aqui, todos os testes que requisitarem o serviço, devem receber
        retorno `false`.
      */
        sinon.stub(MoviesService, 'create')
        .resolves(false);
    });

    /* Restauraremos a função `create` original após os testes. */
    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await MoviesController.create(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        title: 'Example Movie',
        directedBy: 'Jane Dow',
        releaseYear: 1999,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      /*
      Aqui, todos os testes que requisitarem o serviço, devem receber
      retorno `true`.
      */
      sinon.stub(MoviesService, 'create')
      .resolves(true);
    })

    /* Restauraremos a função `create` original após os testes. */
    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
      await MoviesController.create(request, response);

      expect(response.json.calledWith({ message: 'Filme criado com sucesso!' })).to.be.equal(true);
    });

  });
});


// Verifica se o retorno contém um array, independente de estar vazio ou não
// expect(response.json.calledWith(sinon.match,array)).to.be.equal(true);