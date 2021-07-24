import React from 'react';
import styled from "styled-components";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

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
  
  // who doesn't love a sexy background
  // totally lifted this from https://cssgradient.io/gradient-backgrounds/
  background-color: var(--color-blue-dark);
  background-image: linear-gradient(62deg, var(--color-blue-dark) 0%, var(--color-blue) 100%);
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

            </Section>

            <Section>
                <Footer />
            </Section>

        </MainContentArea>
    );
};

export default App;
