import { Fragment } from "react";
import "../../style/component/from/input.scss"

export const Input = ({ type, className, required, placeholder, value, label, onChange, name }) => {
    return (
        <Fragment>
            <div className="common-input w-100">
                {
                    label && <label className="form-label w-100" for="your Name" > {label}</label>
                }
                <input type={type} className={`${className} form-input`} value={value} placeholder={placeholder} onChange={onChange} name={name} required={required} />
            </div>
        </Fragment>
    )
}