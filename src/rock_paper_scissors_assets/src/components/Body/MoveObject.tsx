import React from "react";
import {Move} from "../../services/api";
import {MoveDefinitions} from "../../constants";
import Button from "../Controls/Button";
import {shallowEqualObjects} from "shallow-equal";
import Icon from "../Controls/Icon";

// props def
interface MoveObjectProps {
    move: Move; // the move we are currently submitting
    onClick?(): void; // click event
}

// this is lets us re-use the move object
const MoveObject: React.FC<MoveObjectProps> = props => {

    // expand props
    const { move, onClick } = props;

    // can't use switch cuz javascript and obj pass by ref and all that jazz

    if (shallowEqualObjects(move, MoveDefinitions.Rock))
        return <Button icon={<Icon color='white' icon='chevron-forward' />} color='red' onClick={onClick}>
            <strong>rock</strong>, the power move
        </Button>;

    if (shallowEqualObjects(move, MoveDefinitions.Paper))
        return <Button icon={<Icon color='black' icon='chevron-forward' />} color='green' onClick={onClick}>
            <strong>paper</strong>, the safe bet
        </Button>;

    if (shallowEqualObjects(move, MoveDefinitions.Scissors))
        return <Button icon={<Icon color='white' icon='chevron-forward' />} color='purple' onClick={onClick}>
            <strong>scissors</strong>, the wildcard
        </Button>;


    return <Button color='disabled'>
        <strong>unknown move!</strong> how did you even get this?
    </Button>;

};

export default MoveObject;
