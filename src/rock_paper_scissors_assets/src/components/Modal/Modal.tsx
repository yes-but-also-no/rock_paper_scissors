import React from "react";
import styled from "styled-components";
import Note from "../Controls/Note";
import {Col, Grid, Row} from "react-flexbox-grid";
import Button from "../Controls/Button";

// this is the nice modal text for the title
const ModalTitle = styled.span`
  // don't want to brag or anything
  font-size: xx-large;

  // center align best align
  text-align: center;

  // space to breathe
  padding-bottom: 10px;

  // cool, comic book white
  color: white;

  // logo font or sans
  font-family: 'Bangers', sans-serif;

  // outline effect
  -webkit-text-stroke: 1px black;

  // no flex zone
  flex: 0;

  // no comment for this one...
  display: inline-block;
`;

// this is the base modal, very similar to the note component
const ModalBase = styled.div<{ color: string, height: number }>`
  // pick a theme color
  background-color: var(--color-${props => props.color});

  // padding makes it look good
  padding: 15px;

  // prevent hell on ultra-wides
  max-width: 768px;

  // text color contrasts
  color: var(--color-${props => props.color}-contrast);

  // cool border right?
  border: 2px solid black;

  // cool shadow... right?
  box-shadow: var(--standard-shadow);

  // the usual, slightly less annoying font
  font-family: 'Montserrat', sans-serif;

  // in the usual, slightly less annoying weight
  font-weight: 400;

  // he's a thicc boy
  width: 80%;

  // oh lawd, he's a T H I C C B O Y
  height: ${props => props.height}%;

  // absolutely
  position: absolute;

  // center stage
  top: 50%;
  left: 50%;

  // get dat new stacking context boi
  transform: translate(-50%, -50%);

  // cover it ALL up
  z-index: 2;

  // weird flex, but okay
  display: flex;

  // layout all the pieces
  flex-direction: column;

  // space between to make it nice
  justify-content: space-between;

  // note to self
  & > ${Note} {
    // flex harder
    flex: 1;

    // scroll it
    overflow-y: scroll;
  }
`;

// footer for the modal
const ModalFooter = styled.div`
  flex: 0;
`;

// footer col with padding
const ModalFooterCol = styled(Col)`
  padding-top: 10px;
`;

// this is the modal backdrop, covers everything up
const ModalBackdrop = styled.div`
  // full size
  width: 100vw;

  // still full size
  height: 100vh;

  // this is where the "block" in "block, paper, scissors" comes from. 
  display: block;

  // don't mess other stuff up
  position: absolute;

  // cover it (almost) all up
  z-index: 1;

  // throw some shade
  background-color: rgba(0, 0, 0, 0.6);

  // top of his class
  top: 0;

  // but left too soon
  left: 0;
`;

// props for the modal
interface ModalProps {
    color?: string; // default is white, like sourdough bread
    height?: number; // height, in percent. Don't go above 90, or weird stuff happens.
    title: string; // title of the modal
    extraButton?: React.ReactNode; // optional additional button

    close(): void; // close button / background touch
}

// this is the modal container. it can be used to show various alerts or pages
const Modal: React.FC<ModalProps> = props => {

    // expand props
    const {color, children, height, title, close, extraButton} = props;

    return <>
        <ModalBackdrop onClick={close}/>

        <ModalBase height={height || 90} color={color || 'white'}>

            <ModalTitle>
                {title}
            </ModalTitle>

            <Note color='white'>
                {children}
            </Note>

            <ModalFooter>
                <Grid fluid>
                    <Row center='xs'>
                        <ModalFooterCol xs={12} md>
                            <Button onClick={close} color='red'>
                                Close
                            </Button>
                        </ModalFooterCol>

                        {extraButton &&
                        <ModalFooterCol xs={12} md>
                            {extraButton}
                        </ModalFooterCol>
                        }

                    </Row>
                </Grid>
            </ModalFooter>
        </ModalBase>
    </>

};

export default Modal;
