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

import '../Styles/ListTodo.css';

const card = {
    id: 1,
    title: "Card title",
    description: "Card description",
    priority: "medium",
    assignedTo: "Max",
    idList: '1',
    complete: false,
};

const list = {
    id: 1,
    title: "TODO",
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
    const [openModalModify, setOpenModalModify] = useState(false);
    const [tempCard, setTempCard] = useState(card);
    const [storeCard, setStoreCard] = useState(card);

    const handleCloseModalList = () => {
        setOpenModalList(false);
      };

    const handleConfirmModalList = () => {
        setOpenModalList(false);
        setListTodo(listTodo => [...listTodo, { id: listTodo.length + 1, title: newListName, cards: [] }]); 
    };

    const handleConfirmModalCard = () => {
        setOpenModalCard(false);
        const newTodo = [...listTodo];
        var index = newTodo[parseInt(newCard.idList) - 1].cards.length + 1;  
        newCard.id = index;
        newTodo[parseInt(newCard.idList) - 1].cards.push(newCard);
        setListTodo(newTodo);       
    };

    const handleCloseModalCard = () => {
        setOpenModalCard(false);
    };

    const handleClickModify = (idListModify: any, idModify: any) => {
        const newTodo = [...listTodo];
        const modifCard : any = newTodo[parseInt(idListModify) - 1].cards.find(card => card.id === idModify);
        setStoreCard(modifCard);
        setTempCard(modifCard);
        setOpenModalModify(true);
    };

    const handleClickDelete = (idListModify: any, idModify: any) => {
        const newTodo = [...listTodo];
        const deleteCard:any = newTodo[parseInt(idListModify) - 1].cards.find(card => card.id === idModify);
        var index = newTodo[parseInt(idListModify) - 1].cards.indexOf(deleteCard);
        newTodo[parseInt(idListModify) - 1].cards.splice(index, 1);
        setListTodo(newTodo); 
    };

    const handleCloseModalModify = () => {
        setOpenModalModify(false);
    };

    const handleConfirmModalModify = () => {
        setOpenModalModify(false);
        const newTodo = [...listTodo];
        var index = newTodo[parseInt(storeCard.idList) - 1].cards.indexOf(storeCard);
        newTodo[parseInt(storeCard.idList) - 1].cards.splice(index, 1);
        newTodo[parseInt(tempCard.idList) - 1].cards.push(tempCard);
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

    var styleMainModal = {
        display: 'flex',
        flexDirection: 'column',
    }

    var styleModalTitle = {
        textAlign: 'center',
    }

    var styleModalItem = {
        marginTop: 2,
    }

    return (
        <div>
            <div id="topbar">
                <h1>Todo List</h1>
                <button type="button" className="btn btn-dark" id="buttonbar" onClick={AddTodoList}>
                    Add List
                </button>
                <button type="button" className="btn btn-dark" id="buttonbar" onClick={AddTodoCard}>
                    Add Card
                </button>
            </div>
            <div>
                <Dialog open={openModalList} onClose={handleCloseModalList}>
                    <DialogTitle sx={styleModalTitle}>Add a list</DialogTitle>
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
                    <DialogTitle sx={styleModalTitle}>Add a Card</DialogTitle>
                    <DialogContent sx={styleMainModal}>
                        <TextField 
                            autoFocus
                            id="Title" 
                            label="Title" 
                            variant="outlined" 
                            onChange={(e) => setNewCard({...newCard, title: e.target.value})}
                            sx={styleModalItem}
                        />
                        <TextField
                            id="Description"
                            label="Description"
                            variant="outlined"
                            onChange={(e) => setNewCard({...newCard, description: e.target.value})}
                            sx={styleModalItem}
                        />
                        <InputLabel id="select-label-prio" sx={styleModalItem}>Priority</InputLabel>
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
                        <TextField
                            id="assignedTo"
                            label="assignedTo"
                            variant="outlined"
                            onChange={(e) => setNewCard({...newCard, assignedTo: e.target.value})}
                            sx={styleModalItem}
                        />
                        <InputLabel id="select-label-list" sx={styleModalItem}>List</InputLabel>
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
            <div>
                <Dialog open={openModalModify} onClose={handleCloseModalModify}>
                    <DialogTitle sx={styleModalTitle}>Modify a Card</DialogTitle>
                    <DialogContent sx={styleMainModal}>
                        <TextField 
                            autoFocus
                            id="Title" 
                            label="Title" 
                            variant="outlined"
                            value={tempCard.title}
                            onChange={(e) => setTempCard({...tempCard, title: e.target.value})}
                            sx={styleModalItem}
                        />
                        <TextField
                            id="Description"
                            label="Description"
                            variant="outlined"
                            value={tempCard.description}
                            onChange={(e) => setTempCard({...tempCard, description: e.target.value})}
                            sx={styleModalItem}
                        />
                        <InputLabel id="select-label-prio" sx={styleModalItem}>Priority</InputLabel>
                        <Select
                            labelId="select-label-prio"
                            id="Priority"
                            label="Priority"
                            value={tempCard.priority}
                            onChange={(e) => setTempCard({...tempCard, priority: e.target.value})}
                        >
                            <MenuItem value={'low'}>Low</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'high'}>High</MenuItem>
                        </Select>
                        <TextField
                            id="assignedTo"
                            label="assignedTo"
                            variant="outlined"
                            value={tempCard.assignedTo}
                            onChange={(e) => setTempCard({...tempCard, assignedTo: e.target.value})}
                            sx={styleModalItem}
                        />
                        <InputLabel id="select-label-list" sx={styleModalItem}>List</InputLabel>
                        <Select
                            labelId="select-label-list"
                            id="List"
                            label="List"
                            value={tempCard.idList}
                            onChange={(e) => setTempCard({...tempCard, idList: e.target.value})}
                        >
                        {listTodo.map(list => ( 
                            <MenuItem value={list.id}>{list.title}</MenuItem>
                        ))}
                        </Select>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModalModify}>Cancel</Button>
                        <Button onClick={handleConfirmModalModify}>Confirm</Button>
                    </DialogActions>
                </Dialog> 
            </div>
            <div className="List" id="listCard">
            
            {listTodo.map(list =>{   
                return <List id={list.id} title={list.title} cards={list.cards} funcModif={handleClickModify} funcDelete={handleClickDelete}/>
                })
            }
            </div>
        </div>
    )
}