import './popup.css';

export function Popup({handleClose, show, confirmButton,handleClick, children}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <div className={'button-container'}>
                    <button className={'btn btn-secondary'} type="button" onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={handleClick} className={confirmButton.className}>
                        {confirmButton.label}
                    </button>
                </div>
            </section>
        </div>
    );
};
