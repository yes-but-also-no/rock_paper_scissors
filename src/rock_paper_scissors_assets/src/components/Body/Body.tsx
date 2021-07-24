import React from "react";
import {useAppSelector} from "../../hooks";
import {selectHasPickedName} from "../../store/playerInfo";
import ChooseName from "./ChooseName";
import GamePlay from "./GamePlay";

// this is main body. it will render the correct contents based on game state
const Body : React.FC = () => {

    // find out if we have a name or not
    const hasPickedName = useAppSelector(selectHasPickedName);

    return hasPickedName
        ? <GamePlay/>
        : <ChooseName/>

};

export default Body;
