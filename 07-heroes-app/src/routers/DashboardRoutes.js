import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../components/ui/Navbar';

import { DcScreen } from '../components/dc/DcScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-2">
                <Routes>
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} />

                    <Route path="search" element={<SearchScreen />} />
                    <Route path="hero/:heroeId" element={<HeroScreen />} />

                    <Route path="/" element={<MarvelScreen />}/>
                </Routes>
            </div>
        </>
    )
}
