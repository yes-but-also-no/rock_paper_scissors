import React from 'react';
import styled from "styled-components";
import Logo from "../components/Logo";
import Footer from "../components/Footer/Footer";
import Body from "../components/Body/Body";
import {useAppSelector} from "../hooks";
import {selectInMatch} from "../store/gameState";

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

    // find out if we are in a match
    const isInMatch = useAppSelector(selectInMatch);

    return (
        <MainContentArea>
            <Section>
                {!isInMatch &&
                <Logo/>
                }
            </Section>


            <Section>
                <Body />
            </Section>

            <Section>
                {!isInMatch &&
                <Footer/>
                }
            </Section>

        </MainContentArea>
    );
};

export default App;
