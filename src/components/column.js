import React, {useState, useRef, useEffect} from 'react';
import Card from "./card";
import './styles/column.scss';
import {addNew, deleteColumn, editColumn} from "../redux/todo";
import {useDispatch, useSelector} from "react-redux";

const Column = ({columnIndex, onMoveLeft, onMoveRight, onEdit}) => {
    const column = useSelector(state => state.todo.columns[columnIndex]);
    const [titleEditor, setTitleEditor] = useState(false);
    const [colName, setColName] = useState(column.name);
    const refColName = useRef(null);
    const dispatch = useDispatch();
    const setColTitle = () => {
        dispatch(editColumn({columnIndex, name: colName}));
    }
    const clickOutside = e => {
        if (refColName.current && !refColName.current.contains(e.target)) {
            setTitleEditor(false);
        }
    }
    const delcol = () => {
        dispatch(deleteColumn({columnIndex}))
    }
    useEffect(() => {
        if (titleEditor)
            document.addEventListener('mousedown', clickOutside);

        return ()=>{
            document.removeEventListener('mousedown',clickOutside);
        }
    }, [titleEditor]);
    return (
        <div className='column'>
            <div className='colheader'>
                <button onClick={delcol}><i className="fa-regular fa-trash"/></button>
                {!titleEditor ? <h1 onClick={() => setTitleEditor(true)}>{column.name}</h1> :
                    <input ref={refColName} type='text' value={column.name} onChange={e => {
                        dispatch(editColumn({columnIndex,name: colName}));
                        setColName(e.target.value);
                    }}/>
                }
                <button onClick={() => dispatch(addNew({columnIndex}))}><i className="fa-solid fa-plus"/></button>
            </div>
            <div className='cards'>
                {
                    column.cards.map((card, cardIndex) => {
                        return (
                            <Card
                                cardIndex={cardIndex}
                                key={cardIndex}
                                onMoveLeft={onMoveLeft}
                                onMoveRight={onMoveRight}
                                onEdit={onEdit}
                                columnIndex={columnIndex}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Column;