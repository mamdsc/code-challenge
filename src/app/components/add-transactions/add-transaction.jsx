import React from 'react';
import logo from '../../assets/logo.svg';
import './add-transaction.css';
import PropTypes from 'prop-types';

const AddTransaction = (props) => (
    <div id='add-container'>
        <form onSubmit={props.submitTransaction}>
            <img src={logo} alt='' />
            <h1>{ 'Nova transação' }</h1>
            <input
                placeholder='Descrição'
                value={props.description}
                onChange={props.setDescription}
                maxLength={15}
                />
            <input
                placeholder='Valor'
                value={props.value}
                onChange={props.setValue}
                type={'number'}
            />
            <button type='submit'>Enviar</button>
        </form>
    </div>
);

AddTransaction.propTypes = {
    description: PropTypes.string.isRequired,
    value: PropTypes.number,
    setDescription: PropTypes.func,
    setValue: PropTypes.func,
    submitTransaction: PropTypes.func
}

export { AddTransaction };
