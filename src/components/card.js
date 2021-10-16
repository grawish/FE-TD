import React, {useEffect, useState} from 'react';
import './styles/card.scss';
import {useDispatch, useSelector} from "react-redux";
import {editCard,moveCard,deleteCard} from "../redux/todo";

const Card = ({cardIndex, onMoveLeft, onMoveRight, columnIndex}) => {
    const card = useSelector(state => state.todo.columns[columnIndex].cards[cardIndex]);
    const columns = useSelector(state => state.todo.columns);

    const canMoveLeft = columnIndex !== 0;
    const canMoveRight = columnIndex !== columns.length - 1;

    const dispatch = useDispatch();
    const [description, setDescription] = useState(card.description);
    const [title, setTitle] = useState(card.name);
    const [editor, setEditor] = useState(false);

    const setCard = () => {
        dispatch(editCard({cardIndex,columnIndex,title,description}));
        setEditor(false);
    }
    const delCard = () => {
      dispatch(deleteCard({cardIndex, columnIndex}));
    }
    useEffect(() => {
        if (!title) {
            setEditor(true);
        }
    }, [title]);
    return (<div className='card' draggable={!editor} onDrag={e=>{
            console.log(e);
        }}>
            <div className='cardhead'>
                {!editor ? <button onClick={() => setEditor(true)}><i className="fa-regular fa-pen"/></button> :
                    <button onClick={setCard}><i className="fa-regular fa-check"/></button>
                }
                {!editor ? <h4>{card.name}</h4> :
                    <input name='title' type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                }
                {!editor ? <button onClick={delCard}><i className="fa-regular fa-trash"/></button> :
                    <button onClick={() => setEditor(false)}><i className="fa-regular fa-times"/></button>
                }

            </div>
            <br/>
            <p className='description'>{!editor ?
                card.description :
                <textarea placeholder='Edit your Markdown Here'
                          className='textarea'
                          rows='10'
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                />}
            </p>
        </div>
    )
};

export default Card;