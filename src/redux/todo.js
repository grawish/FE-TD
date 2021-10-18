import {createSlice} from "@reduxjs/toolkit";

const initialTodo = {
    columns: [
        {
            name: 'backlog',
            cards: [
                {name: 'card A', description: 'description of Card A', descriptionMd: '<p>description of Card A</p>'},
                {name: 'card D', description: 'description of Card D', descriptionMd: '<p>description of Card A</p>'},
                {name: 'card E', description: 'description of Card E', descriptionMd: '<p>description of Card A</p>'},
            ]
        },
        {
            name: 'In Progress',
            cards: [
                {name: 'Card B', description: 'description of Card B', descriptionMd: '<p>description of Card A</p>'}
            ]
        },
        {
            name: 'Done',
            cards: [
                {name: 'Card C', description: "Description of Card C", descriptionMd: '<p>description of Card A</p>'}
            ]
        },
        {
            name: 'Blockers',
            cards: [
                {name: 'Card F', description: "Description of Card F", descriptionMd: '<p>description of Card A</p>'}
            ]
        }
    ]
};
JSON.stringify(initialTodo)
const todo = createSlice({
    name: "todo",
    initialState: initialTodo,
    reducers: {
        addNew: (prevState, actions) => {
            prevState.columns[actions.payload.columnIndex].cards.push({name: "", description: ""});
            // return {
            //     ...prevState,
            //     columns: [
            //         ...prevState.columns.slice(0,columnIndex),
            //         {
            //             ...prevState.columns[columnIndex],
            //             cards: [
            //                 ...prevState.columns[columnIndex].cards,
            //                 {name: "", description: ""}
            //             ]
            //         },
            //         ...prevState.columns.slice(columnIndex+1,prevState.columns.length)
            //     ]
            // }
        },
        moveCard: (prevState, actions) => {
            const columns = [...prevState.columns];
            const {columnIndex, cardIndex, moveToColumn} = actions.payload;
            const [card] = columns[columnIndex].cards.splice(cardIndex, 1);
            columns[moveToColumn].cards.push(card);
        },
        editCard: (prevState, actions) => {
            const columns = [...prevState.columns];
            const {columnIndex, cardIndex, title, description} = actions.payload;
            columns[columnIndex].cards[cardIndex] = {
                ...columns[columnIndex].cards[cardIndex],
                name: title,
                description
            };
        },
        deleteCard: (prevState, actions) => {
            const columns = [...prevState.columns];
            const {columnIndex, cardIndex} = actions.payload;
            columns[columnIndex].cards.splice(cardIndex, 1);
            console.log(cardIndex,columnIndex,columns[columnIndex].cards);
        },
        deleteColumn: (prevState, actions) => {
            prevState.columns.splice(actions.payload.columnIndex, 1)
        },
        addColumn: (prevState, actions) => {
            prevState.columns.push({
                name: 'column',
                cards: []
            })
        },
        editColumn: (prevState, actions) => {
            prevState.columns[actions.payload.columnIndex] = {
                ...prevState.columns[actions.payload.columnIndex],
                name: actions.payload.name
            }
        },
        updateMd: (prevState, actions) => {
            prevState.columns[actions.payload.columnIndex].cards[actions.payload.cardIndex] = {
                ...prevState.columns[actions.payload.columnIndex].cards[actions.payload.cardIndex],
                descriptionMd: actions.payload.descriptionMd
            }
        }

    }
})
export default todo.reducer;
export const {addNew, editCard, moveCard, deleteCard, deleteColumn, addColumn, editColumn, updateMd} = todo.actions;