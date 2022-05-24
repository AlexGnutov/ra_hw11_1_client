import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import {useSelector} from "react-redux";
import ServiceItem from "./service-item";



function ServicesList(props) {
    const {items} = useSelector(state => state.servicesList);

    return (
        <div className={'services-list'}>
            <ListGroup as={'ul'}>
                {items.map(item =>
                    <ListGroupItem className={'services-list-item'} as={'li'} key={item.id}>
                        <ServiceItem item={item}/>
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    )
}

export default ServicesList;
