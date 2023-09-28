import React, {useMemo, useState} from "react";
import API from "../api";
import Spinner from "./Spinner";
import './products.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPlus, faTableCells, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Popup} from "./Popup";
import {Product, ProductData} from "../classes/product";
import {ConfirmButton} from "../classes/confirm-button";

export function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleView, setToggleView] = useState('row');

    const [show, setShow] = useState(false)


    function showModal() {
        setShow(true);
    }

    function hideModal() {
        setShow(false);
    }

    const getProducts = () => {
        setLoading(true);
        API.get(`stores/ijpxNJLM732vm8AeajMR/products`).then(
            res => {
                setProducts(res.data)
                setLoading(false);
            }
        );

    }
    useMemo(() => {
        getProducts()
    }, []);

    function deleteProduct(id: string): void {
        API.delete(`/stores/ijpxNJLM732vm8AeajMR/products/${id}`).then(
            () => {
               hideModal();
               getProducts();
            }
        )
    }

    function addProduct() {
        API.post(`/stores/ijpxNJLM732vm8AeajMR/products`, new ProductData()).then(
            res => {
                getProducts();
            }
        )
    }

    function getConfirmButtonFn() {
        return new ConfirmButton('btn btn-danger', 'Delete')
    }

    function renderProduct(p: Product) {
        return (
            <div key={p.id} className="card p-4">
                <h3>{p.data.title}</h3>
                <div className={'card-body'}>
                    <p>{p.data.description}</p>
                    <p>{p.data.price}€</p>
                    <p>{p.data.employee}</p>
                </div>
                <FontAwesomeIcon  onClick={showModal} size={"lg"} icon={faTrash}
                                 className={'delete'}></FontAwesomeIcon>
                <Popup handleClick={() => deleteProduct(p.id)} confirmButton={getConfirmButtonFn()} show={show} handleClose={hideModal}>
                    <div>
                        <h2>Remove {p.data.title}</h2>
                        <p>Are you sure you want to remove {p.data.title} ?</p>
                    </div>
                </Popup>
            </div>
        );
    }

    if (loading) return <Spinner/>;

    return (
        <>
            <div className="container">
                <div className="change-view">
                    <div className={toggleView === 'row' ? 'active' : 'inactive'}>
                        <FontAwesomeIcon size={"lg"} onClick={() => setToggleView('row')}
                                         className={'icon'} icon={faBars}/>
                    </div>
                    <div className={toggleView === 'columns' ? 'active' : 'inactive'}>
                        <FontAwesomeIcon size={"lg"} onClick={() => setToggleView('columns')}
                                         className={'icon'}
                                         icon={faTableCells}/>
                    </div>
                </div>
                <section className={'products ' + toggleView}>{products.map(renderProduct)}</section>
                <button className={'btn btn-primary rounded-circle'} onClick={addProduct}>
                    <FontAwesomeIcon icon={faPlus} size={"lg"}></FontAwesomeIcon>
                </button>
            </div>
        </>
    );
}
