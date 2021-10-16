import React from 'react';
import Column from "./column";
import './styles/board.scss';
import {useDispatch, useSelector} from "react-redux";
import {addColumn, addNew} from "../redux/todo";

const Board = () => {
    const DIRECTION_LEFT = -1;
    const DIRECTION_RIGHT = 1;
    const session = useSelector(state => state.todo);
    const newCard = {name: "", description: ""};
    const dispatch = useDispatch();
    const handleAdd = columnIndex => {

    }
    const handleChange = (cardIndex, columnIndex) => {
        // const cards = [...session.columns[columnIndex].cards];
        console.log(cardIndex, columnIndex);
    }
    const handleMove = (columnIndex, cardIndex, direction) => {


    }
    const addCol = () => {
        dispatch(addColumn({}))
    }
    return (
        <div className='board'>
            {session.columns.map((column, columnIndex) => {
                return (
                    <Column columnIndex={columnIndex}
                            key={columnIndex}
                            onMoveLeft={cardIndex => handleMove(columnIndex, cardIndex, DIRECTION_LEFT)}
                            onMoveRight={cardIndex => handleMove(columnIndex, cardIndex, DIRECTION_RIGHT)}
                            onAddCard={() => handleAdd(columnIndex)}
                            onEdit={(cardIndex) => handleChange(cardIndex, columnIndex)}
                    />
                )
            })}
            <div className='addcol' onClick={addCol}>
                <i className="fa-solid fa-plus"/>
            </div>
        </div>
    )
};

export default Board;