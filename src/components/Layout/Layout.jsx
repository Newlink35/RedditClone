import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Route } from 'react-router-dom';
import Footer from '../../Footer/Footer';

export function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}
