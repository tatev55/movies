import Button from "../button/button";
import "./modal.css";

const Modal = ({ open, onClose, children, title }) => {
    return (
        <div className={`modal ${open ? "open" : ""}`}>
            <div className="modal-container">
                <h1 className="modal-title">{title}</h1>
                {children}
                <Button className="modal-btn" onClick={onClose}>
                    <i className="fa-solid fa-x"></i>
                </Button>
            </div>
        </div>
    );
};

export default Modal;
