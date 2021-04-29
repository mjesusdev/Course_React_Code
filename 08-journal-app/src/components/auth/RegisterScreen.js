import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Swal from 'sweetalert2';

import { setError, removeError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startRegisterUser } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    /* const { msgError } = useSelector( state => state.ui ); */

    const [ formValues, handleInputChange ] = useForm({
        name: 'Prueba',
        email: 'prueba@gmail.com',
        password: '123456',
        password2: '123456'
    });

    // Get Values
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ) {
            dispatch(startRegisterUser( email, password, name ) );
        }
    }

    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch(setError('Name is required'));
            Swal.fire('Error', 'Name is required', 'error');
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch(setError('Email is not valid'));
            Swal.fire('Error', 'Email is not valid', 'error');
            return false;
        } else if ( password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            Swal.fire('Error', 'Password should be at least 6 characters and match each other', 'error');
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {/* {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                } */}

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <hr />

                <Link 
                    to="/auth/login"
                    className="link mt-5"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
