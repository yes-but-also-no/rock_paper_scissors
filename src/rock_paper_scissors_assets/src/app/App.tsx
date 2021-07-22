import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from "styled-components";
import Logo from "../components/Logo";

const TestCol = styled(Col)`
    border: 1px solid red;
    max-width: 800px;
`

const App: React.FC = () => {

    return (
        <Grid fluid>
            <Row center='xs'>
                <TestCol xs={12} md={8} lg={8}>
                    <Logo />
                </TestCol>
            </Row>
        </Grid>
    );
};

export default App;
