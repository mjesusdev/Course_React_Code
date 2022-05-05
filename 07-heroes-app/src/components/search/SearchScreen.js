import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../heroes/HeroCard';

export const SearchScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { query = '' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm({
        searchText: query
    });

    const { searchText } = formValues;
    const heroesFiltered = useMemo( () => getHeroesByName( query ), [query])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?query=${ searchText }`);
    }

    return (
        <>
            <h1>Search Screen</h1>
            <hr />
            
            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            className="btn mt-2 btn-block btn-outline-primary"
                            type="submit"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                        ( query === '' )
                            ? <div className="alert alert-info"> Search a hero </div>
                            : ( heroesFiltered.length === 0 ) && 
                                <div className="alert alert-danger"> 
                                    There is no a hero with { query } 
                                </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}