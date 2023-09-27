import React, {useMemo, useState} from "react";
import API from "../api";
import Spinner from "./Spinner"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTableCells, faTrash} from "@fortawesome/free-solid-svg-icons";


export function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleView, setToggleView] = useState('row');

    const getProducts = () => {
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

    function renderProduct(p) {
        return (
            <div key={p.id} className="card p-4">
                <h3>{p.data.title}</h3>
                <div className={'card-body'}>
                    <p>{p.data.description}</p>
                    <p>{p.data.price}€</p>
                    <p>{p.data.employee}</p>
                </div>
                <FontAwesomeIcon size={"lg"} icon={faTrash} className={'delete'}></FontAwesomeIcon>
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
            </div>
        </>
    );
}
