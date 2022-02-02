/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "./Card";

export default function List(props: { id: any; title: any; cards: any; }) {
    const  {id, title, cards} = props;
    
    return (
        <div className="list container" id="list">
            <h1>{props.title} {props.id}</h1>

            {props.cards.map((card: { id: any; title: any; description: any; priority: any; assignedTo: any; complete: any; }) =>{   
                return <Card id={card.id} title={card.title} description={card.description} priority={card.priority} assignedTo={card.assignedTo} complete={card.complete}/>
                })
            }
        </div>
    )
}