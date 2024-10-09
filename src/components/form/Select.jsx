/* eslint-disable react/prop-types */
import styles from './select.module.css'
export default function Select({text, name, options, handleOnChange, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select 
                name={name} 
                id={name} 
                onChange={handleOnChange} 
                value={value || ""}
            >
                <option>Selecione uma opcao</option>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
