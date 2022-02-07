import { Badge } from "react-bootstrap"
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import '../Styles/Card.css';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Card(props: { id: number; title: string; description: string; priority: string; assignedTo: string; complete: boolean; funcModif: Function; idList: string; funcDelete: Function;}) {
    const {id, title, description, priority, assignedTo, idList, funcModif, funcDelete} = props;

    const addValidate = (id: number, idList: string) => {
        let card = document.getElementById('cardcomp'+id+idList);
        card!.classList.toggle("validate");
    }
        
    return (
        <div>
            <div className="card shadow-sm" id={"cardcomp" + props.id + props.idList}>
                <div id="topcard">
                    <Badge bg="danger" id="badgecard">{props.priority}</Badge> 
                    <span id="modifcard" onClick={() => props.funcModif(props.idList, props.id)}><AiTwotoneEdit /></span>
                    <span id="deletecard" onClick={() => { if (window.confirm('Are you sure you wish to delete this task ?')) props.funcDelete(props.idList, props.id) }}><BsFillTrashFill /></span>
                </div>
                <div id="middlecard">
                    <h5>{props.title}</h5>
                    <p>{props.description}</p>
                </div>
                <div id="bottomcard">
                    <input className="form-check-input" type="checkbox" id="toogledone" onChange={() => addValidate(props.id, props.idList)}/>   
                    <span id="assignedToName"><Badge pill bg="primary">{props.assignedTo}</Badge></span>                                                                      
                </div>
            </div>
        </div>
 
    )
}
