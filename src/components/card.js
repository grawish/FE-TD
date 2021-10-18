import React, {useEffect, useState} from 'react';
import './styles/card.scss';
import {useDispatch, useSelector} from "react-redux";
import {editCard, moveCard, deleteCard, updateMd} from "../redux/todo";

const Card = ({cardIndex, columnIndex}) => {
    const todo = useSelector(state => state.todo);

    const card = todo.columns[columnIndex].cards[cardIndex];
    console.log(card);

    const dispatch = useDispatch();
    const [description, setDescription] = useState(card.description);
    const [title, setTitle] = useState(card.name);
    // const [descriptionMd,setDescriptionMd]=useState(card.descriptionMd);
    const [editor, setEditor] = useState(false);

    const setCard = () => {
        dispatch(editCard({cardIndex, columnIndex, title, description}));
        setEditor(false);
    }

    const delCard = () => {
        dispatch(deleteCard({cardIndex, columnIndex}));
    }

//TODO: mark it Down khud ka api banana hai
    const renderMd = desc => {
        if (!desc)
            return

        fetch("https://api.github.com/markdown", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
                text: desc,
            })
        }).then(response => {
            if (response.status.toString()[0] !== "2")
                return undefined;
            return response.text();
        })
            .then(data => {
                if (data) {
                    dispatch(updateMd({columnIndex, cardIndex, descriptionMd: data}));
                    // setDescriptionMd(data);
                } else {
                    dispatch(updateMd({columnIndex, cardIndex, descriptionMd: description}));
                    // setDescriptionMd(description);
                }
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    useEffect(() => {
        if (!title) {
            setEditor(true);
        }
    }, [title]);

    useEffect(() => {
        renderMd(description)
    }, [description])
    return (<div className='card' draggable={!editor} onDrag={e => {
            console.log(e);
        }} onDragEnd={event => {
            console.log(event);
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

            {!editor ?
                <div dangerouslySetInnerHTML={{
                    __html: card.descriptionMd,
                }}/> :
                <textarea placeholder='Edit your Markdown Here'
                          className='textarea'
                          rows='10'
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                />}
        </div>
    )
};

export default Card;