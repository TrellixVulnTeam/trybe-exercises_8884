// // FALSOS POSITIVOS
// // COM TIMEOUT, O TESTE NÃO ESPERA A FUNÇÃO TERMINAR E PASSA NO TESTE ERRONEAMENTE
test("Não deveria passar!", () => {
  setTimeout(() => {
    expect(10).toBe(5);
    console.log('Deveria falhar!')
  }, 500);
});

// SOLUÇÃO: DONE()
test("Não deveria passar!", done => {
  setTimeout(() => {
    expect(10).toBe(10);
    console.log('Deveria falhar!')
    done();
  }, 500);
});

// OUTRO EXEMPLO DE TESTE BEM SUCEDIDO
const SumNumbers = (a, b, callback) => {
  setTimeout(() => {
    const result = a + b;
    callback(result);
  }, 500)
}

test('Testando SumNumbers, soma 5 mais 10', done => {
  SumNumbers(5, 10, (result) => {
    console.log('teste')
    expect(result).toBe(15);
    done();
  });
})

