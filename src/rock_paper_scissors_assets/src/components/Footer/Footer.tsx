import React from "react";
import {useAppSelector} from "../../hooks";
import {selectHasPickedName} from "../../store/playerInfo";
import InfoFooter from "./InfoFooter";
import GameFooter from "./GameFooter";

// this is the base footer. it will render a correct footer based on game state
const Footer : React.FC = () => {

    // find out if we have a name or not
    const hasPickedName = useAppSelector(selectHasPickedName);

    return hasPickedName
        ? <GameFooter />
        : <InfoFooter />

};

export default Footer;
