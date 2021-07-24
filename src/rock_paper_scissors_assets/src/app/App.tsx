import React from 'react';
import styled from "styled-components";
import Logo from "../components/Logo";
import InfoFooter from "../components/Footer/InfoFooter";
import Button from "../components/Controls/Button";
import Footer from "../components/Footer/Footer";
import Body from "../components/Body/Body";

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
                <Body />
            </Section>

            <Section>
                <Footer />
            </Section>

        </MainContentArea>
    );
};

export default App;
