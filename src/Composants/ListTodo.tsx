import { useState } from "react";
import List from "./List";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";


const card = {
    id: 1,
    title: "Card title",
    description: "Card description",
    priority: "medium",
    assignedTo: "Bernard",
    idList: '1',
    complete: false,
};

const list = {
    id: 1,
    title: "List title",
    cards: [card],
}

const defaulValue = [list];
const defaultListName = "List title";


export default function ListTodo() {
    const [listTodo, setListTodo] = useState(defaulValue);
    const [openModalList, setOpenModalList] = React.useState(false);
    const [openModalCard, setOpenModalCard] = React.useState(false) ;
    const [newListName, setNewListName] = useState(defaultListName);
    const [newCard, setNewCard] = useState(card);

    const handleCloseModalList = () => {
        setOpenModalList(false);
      };

    const handleCloseModalCard = () => {
        setOpenModalCard(false);
    };

    const handleConfirmModalList = () => {
        setOpenModalList(false);
        setListTodo(listTodo => [...listTodo, { id: listTodo.length + 1, title: newListName, cards: [] }]); 
    };

    const handleConfirmModalCard = () => {
        setOpenModalCard(false);
        const newTodo = [...listTodo];
        newTodo[parseInt(newCard.idList) - 1].cards.push(newCard);
        setListTodo(newTodo);
    };

    const getNameList = (e: { target: { value: any; }; }) => {
        setNewListName(e.target.value);
    }

    function AddTodoList(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setOpenModalList(true); 
    }

    
    function AddTodoCard(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setOpenModalCard(true);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={AddTodoList}>
                Add List
            </button>
            <button type="button" className="btn btn-primary" onClick={AddTodoCard}>
                Add Card
            </button>

            <div>
                <Dialog open={openModalList} onClose={handleCloseModalList}>
                    <DialogTitle>Add a list</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="newListName"
                            label="List name"
                            variant="standard"
                            onChange={getNameList}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModalList}>Cancel</Button>
                        <Button onClick={handleConfirmModalList}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openModalCard} onClose={handleCloseModalCard}>
                    <DialogTitle>Add a Card</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            id="Title" 
                            label="Title" 
                            variant="outlined" 
                            onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="Description"
                            label="Description"
                            variant="outlined"
                            onChange={(e) => setNewCard({...newCard, description: e.target.value})}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputLabel id="select-label-prio">Priority</InputLabel>
                        <Select
                            labelId="select-label-prio"
                            id="Priority"
                            label="Priority"
                            value={newCard.priority}
                            onChange={(e) => setNewCard({...newCard, priority: e.target.value})}
                        >
                            <MenuItem value={'low'}>Low</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'high'}>High</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="assignedTo"
                            label="assignedTo"
                            variant="outlined"
                            onChange={(e) => setNewCard({...newCard, assignedTo: e.target.value})}
                        />
                    </DialogContent>
                    <DialogContent>
                        <InputLabel id="select-label-list">List</InputLabel>
                        <Select
                            labelId="select-label-list"
                            id="List"
                            label="List"
                            value={newCard.idList}
                            onChange={(e) => setNewCard({...newCard, idList: e.target.value})}
                        >
                            {listTodo.map(list => ( 
                                <MenuItem value={list.id}>{list.title}</MenuItem>
                            ))}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModalCard}>Cancel</Button>
                        <Button onClick={handleConfirmModalCard}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className="List" id="listCard">
            
            {listTodo.map(list =>{   
                return <List id={list.id} title={list.title} cards={list.cards} />
                })
            }
        </div>
    </div>
    )
}