import React, { Component } from 'react';

class InputComp extends Component {
  render() { 
    const { keyName, ask, value, func, type, className, placeholder, maxC, noSpecialC } = this.props
    let error = undefined
    // Validação por tipo
    // if(value && validation && typeof value ==! validation) error = 'Dado inválido'
    if(value && maxC && value.length > maxC) error = 'Ultrapassou o limite'
    if(value && noSpecialC) {
      const specialC = /[!@#$º`%^&~*()_+\-=[\]{};':"\\|,.<>/?]+/;
      if(specialC.test(value)){
        error = 'Caractere inválido'
      }
    }
    if(value && type === 'email') {
      const expected = /^[a-z0-9.]+@[a-z0-9]+\.com+$/
      if(expected.test(value)){
      } else {
        error = 'Email inválido'
      }
    }
    if(value && keyName === 'CPF') {
      const specialCAndLetters = /^-?[\d.]+(?:e-?\d+)?$/;
      if(specialCAndLetters.test(value)){
      } else {
        error = 'Apenas 11 números'
      }
      if(value.length < 11) error= 'CPF Inválido'
    }

    return (
      <label name={keyName}>{ask}
        <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        name={keyName}
        onChange={func}
        required
        />
        <br/>
        <span className="error">{(error? error : '')}</span>
      </label>
    );
  }
}
 
export default InputComp;
