import React from "react";
import {useAppSelector} from "../../hooks";
import {selectHasPickedName} from "../../store/playerInfo";
import ChooseName from "./ChooseName";

// this is main body. it will render the correct contents based on game state
const Body : React.FC = () => {

    // find out if we have a name or not
    const hasPickedName = useAppSelector(selectHasPickedName);

    // if they don't have a name, we get the choose name screen
    if (!hasPickedName)
        return <ChooseName />

    return <>
        stub
    </>

};

export default Body;
