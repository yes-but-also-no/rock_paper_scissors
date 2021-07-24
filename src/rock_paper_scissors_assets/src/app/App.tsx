import React from 'react';
import styled from "styled-components";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";

// Main column controls our width, and ensures we are using the full height of the screen
const MainContentArea = styled.div`
  // prevent hell on ultra-wides
  max-width: 768px;

  // fill the screen
  height: 100%;

  // center
  margin: auto;

  // weird flex, but okay
  display: flex;

  // layout all the pieces
  flex-direction: column;

  // space between to make it nice
  justify-content: space-between;
`;

// sections fill their contents
const Section = styled.div`
  flex: 0;
`;

// Main app component
const App: React.FC = () => {

    return (
        <MainContentArea>

            <Section>
                <Logo/>
            </Section>

            <Section>
                <Button></Button>
            </Section>

            <Section>
                <Footer />
            </Section>

        </MainContentArea>
    );
};

export default App;
