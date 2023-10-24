import React from "react";



export function ReviewModal({product}) {


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
                        </div>
                    )}</>
                </div>
            }
        </div>
    )
}
