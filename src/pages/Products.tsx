import React, {useMemo, useState} from "react";
import API from "../api";
import Spinner from "../components/Spinner";
import './products.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPlus, faTableCells} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../classes/product";
import {ProductComponent} from "../components/ProductComponent";
import {AddProductModal} from "../components/AddProductModal";
import {Paginator} from "../components/Paginator";
import {ErrorComponent} from "../components/ErrorComponent";
export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toggleView, setToggleView] = useState('row');
    const [showAddPopup, setShowAddPopup] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);

    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }


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
            },
            error => {
                setLoading(false);
                setError(true);
            }
        );

    }
    useMemo(() => {
        getProducts()
    }, []);


    if (loading) return <Spinner/>;

    if (error) return <ErrorComponent/>

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
                    {currentProducts.map((p) => <ProductComponent key={p.id} onDeleteProduct={getProducts} onAddReview={getProducts}
                                                                  product={p}/>)}
                    <Paginator
                        itemPerPage={productsPerPage}
                        totalItems={products.length}
                        currentPage={currentPage}
                        paginate={paginate}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />

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

