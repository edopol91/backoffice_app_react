import React, {useMemo, useState} from "react";
import API from "../api";
import Spinner from "./Spinner";
import './products.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPlus, faTableCells} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../classes/product";
import {ProductComponent} from "./ProductComponent";
import {AddProductModal} from "./AddProductModal";

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [toggleView, setToggleView] = useState('row');
    const [showAddPopup, setShowAddPopup] = useState(false)

    function showAddPopupModal() {
        setShowAddPopup(true);
    }

    function hideAddPopupModal() {
        setShowAddPopup(false)
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



    if (loading) return <Spinner/>;

    return (
        <>
            <div className="container">
                <div className="change-view">
                    <div className={toggleView === 'columns' ? 'active' : 'inactive'}>
                        <FontAwesomeIcon size={"lg"} onClick={() => setToggleView('columns')}
                                         className={'icon'} icon={faBars}/>
                    </div>
                    <div className={toggleView === 'row' ? 'active' : 'inactive'}>
                        <FontAwesomeIcon size={"lg"} onClick={() => setToggleView('row')}
                                         className={'icon'}
                                         icon={faTableCells}/>
                    </div>
                </div>
                <section className={'products ' + toggleView}>
                    {products.map((p) => <ProductComponent key={p.id} onDeleteProduct={getProducts} product={p}/>)}
                </section>
                <button className={'btn btn-primary rounded-circle'} onClick={showAddPopupModal}>
                    <FontAwesomeIcon icon={faPlus} size={"lg"}></FontAwesomeIcon>
                </button>
                <AddProductModal showAddModal={showAddPopup} hideAddModal={hideAddPopupModal}
                                 submitProduct={getProducts}/>
            </div>
        </>
    );
}
