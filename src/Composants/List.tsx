/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "./Card";
import { Badge } from "react-bootstrap"

import '../Styles/List.css';

type card = {
    key: number;
    id: number;
    title: string;
    description: string;
    priority: string;
    assignedTo: string;
    idList: string;
    complete: boolean;
};

export default function List(props: { id: number; title: string; cards: Array<card>; funcModif: Function; funcDelete: Function; assignment: string; }) {
    const  {id, title, cards, funcModif, funcDelete, assignment} = props;
    
    return (
        <div className="list container" id="list">
            <h2 style={{ textTransform: 'uppercase'}}><Badge bg="info" id="badge">{props.title}</Badge></h2>

            {assignment !== "all" ? (
                props.cards.filter((card => card.assignedTo === assignment)).map(filteredCard => {
                    return <Card key={filteredCard.id} id={filteredCard.id} title={filteredCard.title} description={filteredCard.description} priority={filteredCard.priority} assignedTo={filteredCard.assignedTo} complete={filteredCard.complete} idList={filteredCard.idList} funcModif={funcModif} funcDelete={funcDelete}/>
                })
             ) : (
                props.cards.map(card => { 
                    return <Card key={card.id} id={card.id} title={card.title} description={card.description} priority={card.priority} assignedTo={card.assignedTo} complete={card.complete} idList={card.idList} funcModif={funcModif} funcDelete={funcDelete}/>
                })
            )}
        </div>
    )
}