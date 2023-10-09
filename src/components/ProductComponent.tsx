import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Popup} from "./Popup";
import React, {useState} from "react";
import API from "../api";
import {ReviewModal} from "./ReviewModal";
import {ProductData} from "../classes/product";

export function ProductComponent({product, onDeleteProduct}) {
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showReviewPopup, setShowReviewPopup] = useState(false)
    const [newReview, setNewReview] = useState('')


    function showDeletePopupModal() {
        setShowDeletePopup(true);
    }

    function hideDeletePopup() {
        setShowDeletePopup(false);
    }

    function setShowReviewPopupModal() {
        setShowReviewPopup(true);
    }

    function hideReviewPopup() {
        setShowReviewPopup(false);
    }

    function addReview(product: ProductData, newReview: string) {
        if (newReview !== '') {
            product.reviews ? product.reviews.push(newReview) : product.reviews = [newReview];
            API.post(`/stores/ijpxNJLM732vm8AeajMR/products`, product).then(
                () => {
                    onDeleteProduct(true)
                }
            )
        }
    }

    function getNewReview(review: string) {
        setNewReview(review);
    }


    function deleteProduct(id: string): void {
        API.delete(`/stores/ijpxNJLM732vm8AeajMR/products/${id}`).then(
            () => {
                hideDeletePopup();
                onDeleteProduct(true);
            }
        )
    }

    return (
        <div key={product.id} className="card p-4">
            <h3>{product.data.title}</h3>
            <div className={'card-body'}>
                <label>
                    Description:
                </label>
                <p className={'description'}>{product.data.description}</p>

                <label>
                    Price:
                </label>
                <p>{product.data.price}€</p>

                <label>
                    Employee:
                </label>
                <p>{product.data.employee}</p>
            </div>
            <div className={'footer'}>
                <p className={'show-review'} onClick={setShowReviewPopupModal}>Show reviews</p>
            <FontAwesomeIcon onClick={showDeletePopupModal} size={"lg"} icon={faTrash}
                             className={'delete'}></FontAwesomeIcon>
            </div>
            <Popup
                show={showDeletePopup}>
                <div>
                    <h2>Remove {product.data.title}</h2>
                    <p>Are you sure you want to remove {product.data.title} ?</p>
                </div>
                <div className={'button-container'}>
                    <button className={'btn btn-secondary'} type="button" onClick={hideDeletePopup}>
                        Close
                    </button>
                    <button className={'btn btn-danger btn-rounded'} onClick={() => deleteProduct(product.id)}>Delete
                    </button>
                </div>
            </Popup>
            <Popup
                show={showReviewPopup}>
                <ReviewModal
                    newReview={getNewReview}
                    product={product}/>
                <div className={'button-container'}>
                    <button className={'btn btn-secondary'} type="button" onClick={hideReviewPopup}>
                        Close
                    </button>
                    <button className={'btn btn-primary btn-rounded'} onClick={() => addReview(product.data, newReview)}>Add
                    </button>
                </div>
            </Popup>
        </div>
    );
}
