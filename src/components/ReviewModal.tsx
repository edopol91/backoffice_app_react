import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Popup} from "./Popup";
import API from "../api";


export function ReviewModal({product, newReview}) {
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [selectedReview, setSelectedReview] = useState('')

    function showDeletePopupModal(p) {
        setSelectedReview(p);
        setShowDeletePopup(true);
    }

    function hideDeletePopup() {
        setShowDeletePopup(false);
    }

    function removeReview(review: string) {
        const index = product.data.reviews.findIndex(value => value === review);
        product.data.reviews.splice(index, 1)
        API.post(`/stores/ijpxNJLM732vm8AeajMR/products`, product).then(
            () => {
                hideDeletePopup();
            }
        )
    }

    return (
        <div className={'modal-body'}>
            <h2>Reviews</h2>
            {(product?.data.reviews?.length === 0 || !product?.data.reviews)
                ? <h4>No reviews available</h4>
                :
                <div className={'review-container'}>
                    <>{product?.data.reviews?.map((p: string, index) =>
                        <div key={index} className={'review'}>
                            <div>
                                <p>Review {index + 1}:</p>
                                <p>{p}</p>
                            </div>
                            <FontAwesomeIcon onClick={() => showDeletePopupModal(p)} icon={faTrash}/>
                        </div>
                    )}</>
                </div>
            }
            <div className={'add-new-review'}>
                <label>Add new review</label>
                <textarea defaultValue={newReview} onChange={(event) => newReview(event.target.value)}/>

            </div>
            <Popup show={showDeletePopup}>
                <div>
                    <p>Are you sure you want to delete this review?</p>
                </div>
                <div className={'button-container'}>
                    <button className={'btn btn-secondary'} type="button" onClick={hideDeletePopup}>
                        Close
                    </button>
                    <button className={'btn btn-danger btn-rounded'} onClick={() => removeReview(selectedReview)}>Delete
                    </button>
                </div>
            </Popup>
        </div>
    )
}
