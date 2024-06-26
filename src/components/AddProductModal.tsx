import React, {useState} from "react";
import './form.css'
import API from "../api";
import {Popup} from "./Popup";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup'
import {ProductData} from "../classes/product";
import Spinner from "./Spinner";

export function AddProductModal({showAddModal, hideAddModal, submitProduct}) {
    const [loading, setLoading] = useState(false);

    function addProduct(values: ProductData) {
        setLoading(true)
        values.reviews = [values.reviews];
        API.post(`/stores/ijpxNJLM732vm8AeajMR/products`, values).then(
            () => {
                hideModal();
                submitProduct();
                setLoading(false);
            }
        )

    }

    const productSchema = yup.object().shape({
        category: yup.string().required(),
        description: yup.string(),
        title: yup.string().required(),
        employee: yup.string().required(),
        price: yup.number().required(),
        review: yup.string()
    })

    function hideModal() {
        hideAddModal();
    }

    return (
        <Popup show={showAddModal}>
            <div>
                <h1>
                    Add product
                </h1>
                <Formik
                    initialValues={{
                        category: '',
                        description: '',
                        title: '',
                        employee: '',
                        price: 0,
                        reviews: []
                    }}
                    validationSchema={productSchema}
                    onSubmit={values => {
                        addProduct(values);
                    }}
                >
                    {({errors, touched, resetForm}) => (
                        <Form className={'form'}>
                            <div className={'form-container'}>
                                <label>Category</label>
                                <ErrorMessage component={'div'} className={'field-error'} name={'category'}/>
                                <Field name={'category'} className={'form-field'}/>
                            </div>
                            <div className={'form-container'}>
                                <label>Title</label>
                                <ErrorMessage component={'div'} className={'field-error'} name={'title'}/>
                                <Field name={'title'} className={'form-field'}/>
                            </div>
                            <div className={'form-container'}>
                                <label>Description</label>
                                <Field name={'description'} className={'form-field'}/>
                            </div>
                            <div className={'form-container'}>
                                <label>Price</label>
                                <ErrorMessage component={'div'} className={'field-error'} name={'price'}/>
                                <Field name={'price'} className={'form-field'}/>
                            </div>
                            <div className={'form-container'}>
                                <label>Employee</label>
                                <ErrorMessage component={'div'} className={'field-error'} name={'employee'}/>
                                <Field name={'employee'} className={'form-field'}/>
                            </div>
                            <div className={'form-container'}>
                                <label>Review</label>
                                <Field name={'reviews'} className={'form-field'}/>
                            </div>
                            <div className={'button-container'}>
                                <button className={'btn btn-secondary'} type={"button"} onClick={() => {
                                    hideAddModal();
                                    resetForm();
                                }}
                                >
                                    Close
                                </button>
                                <button disabled={loading} type={'submit'}
                                        className={'btn btn-primary btn-rounded'}>
                                    {loading ? <Spinner/> : 'Add'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Popup>
    )
}
