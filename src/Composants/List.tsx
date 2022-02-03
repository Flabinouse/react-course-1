/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "./Card";
import { Badge } from "react-bootstrap"

import '../Styles/List.css';

export default function List(props: { id: any; title: any; cards: any; funcModif: any; funcDelete: any;}) {
    const  {id, title, cards, funcModif, funcDelete} = props;
    
    return (
        <div className="list container" id="list">
            <h2 style={{ textTransform: 'uppercase'}}><Badge bg="info" id="badge">{props.title}</Badge></h2>

            {props.cards.map((card: { id: any; title: any; description: any; priority: any; assignedTo: any; complete: any; idList:any; }) =>{   
                return <Card id={card.id} title={card.title} description={card.description} priority={card.priority} assignedTo={card.assignedTo} complete={card.complete} idList={card.idList} funcModif={funcModif} funcDelete={funcDelete}/>
                })
            }
        </div>
    )
}