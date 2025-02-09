const connection = require('./connection');

// Transforma para o padrão CamelCase
const serialize = (authorData) => {
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name
  }
};

// Adiciona o fully name
const getNewAuthor = ({ id, firstName, middleName, lastName }) => {
  const fullName = [firstName, middleName, lastName].filter((name) => name).join()
  return {
    id,
    firstName,
    middleName,
    lastName,
    fullName,
  }
}

const getAll = async () => {
  // Caso não fosse desconstruído, seria retornado um outro elemento no array com informarções da req
  const [authors] = await connection.execute('SELECT id, first_name, middle_name, last_name FROM authors');

  return authors.map(serialize).map(getNewAuthor);
};

module.exports = {
  getAll,
};