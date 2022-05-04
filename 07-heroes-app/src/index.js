import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HeroesApp } from './HeroesApp';

ReactDOM.render(
  <BrowserRouter>
    <HeroesApp />
  </BrowserRouter>,
  document.getElementById('root')
);
