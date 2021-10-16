import {createSlice} from "@reduxjs/toolkit";

const initialTodo = {
    columns: [
        {
            name: 'backlog',
            cards: [
                {name: 'card A', description: 'description of Card A'},
                {name: 'card D', description: 'description of Card D'},
                {name: 'card E', description: 'description of Card E'},
            ]
        },
        {
            name: 'In Progress',
            cards: [
                {name: 'Card B', description: 'description of Card B'}
            ]
        },
        {
            name: 'Done',
            cards: [
                {name: 'Card C', description: "Description of Card C"}
            ]
        },
        {
            name: 'Blockers',
            cards: [
                {name: 'Card F', description: "Description of Card F"}
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
            columns[columnIndex].cards.splice(cardIndex, 1)
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
        }

    }
})
export default todo.reducer;
export const {addNew, editCard, moveCard, deleteCard, deleteColumn, addColumn, editColumn} = todo.actions;