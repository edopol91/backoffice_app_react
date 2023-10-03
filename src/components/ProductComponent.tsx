import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Popup} from "./Popup";
import {ConfirmButton} from "../classes/confirm-button";
import React, {useState} from "react";
import API from "../api";

export function ProductComponent({product, onDeleteProduct}) {
    const [showDeletePopup, setShowDeletePopup] = useState(false)

    function showDeletePopupModal() {
        setShowDeletePopup(true);
    }

    function hideDeletePopup() {
        setShowDeletePopup(false);
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
                <label htmlFor={'description'}>
                    Description:
                </label>
                <p id={'description'}>{product.data.description}</p>

                <label htmlFor={'price'}>
                    Price:
                </label>
                <p id={'price'}>{product.data.price}€</p>

                <label htmlFor={'employee'}>
                    Employee:
                </label>
                <p id={'employee'}>{product.data.employee}</p>

            </div>
            <FontAwesomeIcon onClick={showDeletePopupModal} size={"lg"} icon={faTrash}
                             className={'delete'}></FontAwesomeIcon>
            <Popup handleClick={() => deleteProduct(product.id)}
                   confirmButton={new ConfirmButton('btn btn-danger', 'Delete')}
                   show={showDeletePopup} handleClose={hideDeletePopup}>
                <div>
                    <h2>Remove {product.data.title}</h2>
                    <p>Are you sure you want to remove {product.data.title} ?</p>
                </div>
            </Popup>
        </div>
    );
}
