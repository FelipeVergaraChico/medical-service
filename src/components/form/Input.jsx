import PropTypes from 'prop-types';
import styles from "./Input.module.css"

function Input({
    type, 
    text, 
    name, 
    placeholder, 
    handleOnChange, 
    value,
    multiple
}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
                {...(multiple ? {multiple} : "" )} 
            />
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    handleOnChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    multiple: PropTypes.bool
};

export default Input