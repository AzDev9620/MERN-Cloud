import React from 'react'
import { Outlet } from "react-router-dom";
import NavbarCustom from './navbar';
import Container from 'react-bootstrap/esm/Container';
export default function LayoutCustom() {
    return (
        <>
            <NavbarCustom />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}