import { useState } from "react";
import { Badge } from "react-bootstrap"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Card(props: { id: any; title: any; description: any; priority: any; assignedTo: any; complete: any;}) {
    const {id, title, description, priority, assignedTo} = props;
    const [complete, setComplete] = useState(props.complete);
    const [openModal, setOpenModal] = useState(false);
    const [newCard, setNewCard] = useState(props);
    const [tempCard, setTempCard] = useState(props);

    const handleClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setTempCard(newCard);
        
    };

    const handleConfirmModal = () => {
        setOpenModal(false);
        setNewCard(tempCard);
    };
        
    return (
        <div>
            <div className="card" onClick={() => handleClick()}>
                <p id="prio"><Badge bg="danger">{newCard.priority}</Badge></p>
                <h5>{newCard.title}</h5>
                <p>{newCard.description}</p>
                <div>
                    <label>Complete : </label>
                    <input type="checkbox" checked={complete} onChange={() => setComplete(!complete)}/>                                                                         
                </div>
                <p id="assignedTo"><Badge bg="primary">{newCard.assignedTo}</Badge></p>
            </div>
            <div>
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>Add a Card</DialogTitle>
                        <DialogContent>
                            <TextField 
                                autoFocus
                                id="Title" 
                                label="Title" 
                                variant="outlined"
                                value={tempCard.title}
                                onChange={(e) => setTempCard({...tempCard, title: e.target.value})}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="Description"
                                label="Description"
                                variant="outlined"
                                value={tempCard.description}
                                onChange={(e) => setTempCard({...tempCard, description: e.target.value})}
                            />
                        </DialogContent>
                        <DialogContent>
                            <InputLabel id="select-label-prio">Priority</InputLabel>
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
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="assignedTo"
                                label="assignedTo"
                                variant="outlined"
                                value={tempCard.assignedTo}
                                onChange={(e) => setTempCard({...tempCard, assignedTo: e.target.value})}
                            />
                        </DialogContent>
                        {/* <DialogContent>
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
                        </DialogContent> */}
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Cancel</Button>
                            <Button onClick={handleConfirmModal}>Confirm</Button>
                        </DialogActions>
                    </Dialog> 
                </div>
        </div>
 
    )
}
