import React, {useState} from "react";
import './form.css'
import API from "../api";
import {ConfirmButton} from "../classes/confirm-button";
import {Popup} from "./Popup";
import {ProductData} from "../classes/product";

export function AddProductModal({formValues, showAddModal, hideAddModal, submitProduct}) {
    const [category, setCategory] = useState(formValues.category);
    const [description, setDescription] = useState(formValues.description);
    const [title, setTitle] = useState(formValues.title);
    const [employee, setEmployees] = useState(formValues.employee);
    const [price, setPrices] = useState(formValues.price);
    formValues = {category, description, title, employee, price, reviews: []};

    function addProduct(values: ProductData) {
        API.post(`/stores/ijpxNJLM732vm8AeajMR/products`, values).then(
            () => {
                hideAddModal();
                submitProduct();
            }
        )
    }

    return (
        <Popup handleClick={() => addProduct(formValues)}
               confirmButton={new ConfirmButton('btn btn-primary', 'Add')}
               show={showAddModal}
               handleClose={hideAddModal}>
            <div>
                <h1>
                    Add product
                </h1>
                <form className={'form'}>
                    <div className={'form-field'}>
                        <label className={'label'}>
                            Category
                        </label>

                        <input className={'input'} onChange={(e) => setCategory(e.target.value)} value={category}/>
                    </div>
                    <div className={'form-field'}>
                        <label className={'label'}>
                            Title
                        </label>
                        <input className={'input'} onChange={(e) => setTitle(e.target.value)} value={title}/>
                    </div>
                    <div className={'form-field'}>
                        <label className={'label'}>
                            Description
                        </label>

                        <input className={'input'} onChange={(e) => setDescription(e.target.value)}
                               value={description}/>
                    </div>
                    <div className={'form-field'}>
                        <label className={'label'}>
                            Price
                        </label>

                        <input type={'number'} className={'input'} onChange={(e) => setPrices(Number(e.target.value))}
                               value={price}/>
                    </div>
                    <div className={'form-field'}>
                        <label className={'label'}>
                            Employee
                        </label>
                        <input className={'input'} onChange={(e) => setEmployees(e.target.value)} value={employee}/>

                    </div>
                </form>
            </div>
        </Popup>
    )
}
