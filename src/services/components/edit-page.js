import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {loadService, saveService} from "../actions/action-creators";
import LoadingSpinner from "./loading-spinner";
import ErrorMessage from "./error-message";
import Spinner from "react-bootstrap/Spinner";

function EditPage(props) {
    const {id, name, price, content, loading, error} = useSelector(state => state.editPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {itemId} = useParams();
    const [saving, setSaving] = useState(false);
    const nameRef = useRef();
    const priceRef = useRef();
    const contentRef = useRef();
    const fieldsetRef = useRef();

    useEffect(() => {
        loadService(dispatch, itemId);
    }, [dispatch, itemId]);

    const cancelHandler = () => {
        navigate('/services');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setSaving(true);
        fieldsetRef.current.disabled = true;
        const data = {
            id: +itemId,
            name: nameRef.current?.value,
            price: +priceRef.current?.value,
            content: contentRef.current?.value,
        }
        console.log(data);
        saveService(dispatch, data, () => navigate('/', {replace: true}));
    }

    return (
        <div className={'services-container'}>
            {console.log('edit page render')}
            {loading ? <LoadingSpinner/> : null}
            {error ? <ErrorMessage/> : null}
            {!loading && !error && id ?
                <Form onSubmit={submitHandler} disabled>
                    <fieldset ref={fieldsetRef}>
                        <Form.Group className={'mb-3'} controlId={'name'}>
                            <Form.Label>Название</Form.Label>
                            <Form.Control type={'text'} defaultValue={name} ref={nameRef}/>
                        </Form.Group>
                        <Form.Group className={'mb-3'} controlId={'price'}>
                            <Form.Label>Стоимость</Form.Label>
                            <Form.Control type={'number'} defaultValue={price} ref={priceRef}/>
                        </Form.Group>
                        <Form.Group className={'mb-3'} controlId={'content'}>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control type={'text'} defaultValue={content} ref={contentRef}/>
                        </Form.Group>
                        <Button className={'listed-button'} type={'button'} onClick={cancelHandler}>
                            Отмена
                        </Button>
                        <Button className={'listed-button'} type={'submit'}>
                            {saving ? <Spinner size={'sm'} animation={'border'}/> : 'Сохранить'}
                        </Button>
                    </fieldset>
                </Form>
                : null}
        </div>
    )
}

export default EditPage;
