// ./index.js PARA RODAR, ALETERE O NOME P/ index.js

// function setApproved(students) {
//   const studentsWithLetterGrade = students.map((student) => {
//     const disciplinesWithLetterGrade = student.disciplines.map((discipline) => {
//       if (discipline.grade >= 0.9) discipline.letterGrade = 'A';
//       else if (discipline.grade >= 0.8) discipline.letterGrade = 'B';
//       else if (discipline.grade >= 0.7) discipline.letterGrade = 'C';
//       else if (discipline.grade >= 0.6) discipline.letterGrade = 'D';
//       else if (discipline.grade >= 0.1) discipline.letterGrade = 'E';
//       else discipline.letterGrade = 'F';

//       return discipline;
//     });

//     return {
//       name: student.name,
//       disciplines: disciplinesWithLetterGrade,
//     };
//   });

//   const approvedStudents = studentsWithLetterGrade.filter(({ disciplines }) =>
//     disciplines.every((discipline) => discipline.grade > 0.7));

//   /* Finja que o console.log é algo que atualiza uma base de dados */
//   approvedStudents.map(({ name, disciplines }) => {
//     console.log(`A pessoa com nome ${name} foi aprovada!`);
//     disciplines.map(({ name, letterGrade }) =>
//       console.log(`${name}: ${letterGrade}`));
//   });
// }

// /* Abaixo temos um exemplo de execução */
// const students = [
//   {
//     name: 'Lee',
//     disciplines: [
//       { name: 'matemática', grade: 0.8 },
//       { name: 'história', grade: 0.6 },
//     ],
//   },
//   {
//     name: 'Clementine',
//     disciplines: [
//       { name: 'matemática', grade: 0.8 },
//       { name: 'história', grade: 0.9 },
//     ],
//   },
// ];

// setApproved(students);

// REFATORANDO PARA ATENDER AO SINGLE RESPONSABILITY PRINCIPLE, SEPARANDO AS RESPONSABILIDADES

// TAMBÉM ACIONA ESTA PARTE EXTRA PARA DIMINUIR A COMPLEXIDADE ACUSADA PELO LINT
// EXTRA
/* Apoio para a função `getGradeLetter`, lembraremos disso mais a frente */
const GRADE_DICT = {
  0.9: 'A',
  0.8: 'B',
  0.7: 'C',
  0.6: 'D',
  0.1: 'E',
};

const gradeKeys = Object.keys(GRADE_DICT);

/* Função menor para remover o uso excessivo de `if{}else`s */
const getGradeLetter = (gradeNumber) => {
  let letterGrade = 'F';

  for (let i = 0; i < gradeKeys.length; i += 1) {
    if (gradeNumber >= gradeKeys[i]) {
      letterGrade = GRADE_DICT[gradeKeys[i]];
      break;
    }
  }

  return letterGrade;
};

/* Coletar notas */
const getLetterGrades = ({ name, grade }) => ({
  name,
  grade,
  letterGrade: getGradeLetter(grade) });
// FIM DO EXTRA

/* "Converter" */
const percentageGradesIntoLetters = ({ name, disciplines, school }) => ({
  name,
  school,
  disciplines: disciplines.map(getLetterGrades) });

/* "Converter COM COMPLEXIDADE" */
// const percentageGradesIntoLetters = ({ name, disciplines }) => ({
//   name,
//   disciplines: disciplines.map(({ name, grade }) => {
//     let letterGrade;

//     if (grade >= 0.9) letterGrade = 'A';
//     else if (grade >= 0.8) letterGrade = 'B';
//     else if (grade >= 0.7) letterGrade = 'C';
//     else if (grade >= 0.6) letterGrade = 'D';
//     else if (grade >= 0.1) letterGrade = 'E';
//     else letterGrade = 'F';

//     return { name, grade, letterGrade };
//   })});

/* "Determinar" */
const approvedStudents = ({ disciplines }) =>
  disciplines.every(({ grade }) => grade > 0.7);

/* "Atualizar" */
const updateApprovalData = ({ name: studentName, disciplines }) => {
  console.log(`A pessoa com nome ${studentName} foi aprovada!`);

  disciplines.map(({ name, letterGrade }) =>
    console.log(`${name}: ${letterGrade}`));
};

function setApproved(students) {
  students
    .map(percentageGradesIntoLetters)
    .filter(approvedStudents)
    .map(updateApprovalData);
}

/* Exemplo de execução */
const students = [
  {
    name: 'Lee',
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.6 },
    ],
  },
  {
    name: 'Clementine',
    disciplines: [
      { name: 'matemática', grade: 0.8 },
      { name: 'história', grade: 0.9 },
    ],
  },
];

setApproved(students);

/*
  Não se esqueça que é necessário exportar ao final as
  funções para que você possa testa-las de forma unitária
*/
module.exports = {
  percentageGradesIntoLetters,
  approvedStudents,
  updateApprovalData,
  setApproved,
  getLetterGrades,
};