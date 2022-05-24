import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchServices} from "./actions/action-creators";
import LoadingSpinner from "./components/loading-spinner";
import ErrorMessage from "./components/error-message";
import ServicesList from "./components/services-list";

function Services(props) {
    const {loading, error} = useSelector(state => state.servicesList);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('fetch effect');
        fetchServices(dispatch)
    }, [dispatch]);

    return (
        <div className={'services-container'}>
            {console.log('services page render')}
            {loading ? <LoadingSpinner/> : null}
            {error ? <ErrorMessage/> : null}
            {!error && !loading ? <ServicesList/> : null}
        </div>
    )
}

export default Services;
