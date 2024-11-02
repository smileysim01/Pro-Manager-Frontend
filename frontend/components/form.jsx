import styles from './form.module.css'
import { useState } from 'react';

function FormField({name, type, label, options, placeholder,value, onChange, formType}) {
    return (
        <div className={formType ? styles.tasks : styles.inputs}>
          <label>{label}</label>
          {type === "radio" ? (
            <>
            <span>{label}</span>
            {options.map((option) => (
              <label key={option} className={option===value? styles.radioButtonSelected : styles.radioButton}>
                {option}
                <input type={type} name={name} id={styles.selected} value={option} onChange={onChange} className={styles.radioInput}/>
              </label>
            ))}
            </>
            ):(
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete='on' />
          )}
        </div>
    )
}

function Form({formFields, onSubmit, error, errorMessages, submitButtonText, type}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
      <form onSubmit={onSubmit} className={type ? styles.tasks : styles.inputs} id={styles.container}>
        {formFields.map((field, index) => (
          <div className={type ? styles.tasks : styles.inputs} id={styles.formField} key={`${field.name}-${index}`}>
            {field.img ? <img src={field.img} alt={field.name}/> : null}
            <div className={type ? styles.tasks : styles.inputs} id={styles.inputContainer}>
              <FormField name={field.name} type={(field.name === 'password' || field.name === 'oldPassword' || field.name === 'newPassword') && isVisible ? 'text' : field.type} label={field?.label} options={field?.options} placeholder={field?.placeholder} value={field.value} onChange={field.onChange} formType={type} />
              {error[field.name] ? <p className={styles.error}>{errorMessages[field.name]}</p> : null}
            </div>
            {field.eye ? <img id={styles.eye} src={field.eye} alt="eye" onClick={()=>setIsVisible(!isVisible)}/> : null}
          </div>
          ))
        }
        <div className={type ? styles.tasks : styles.inputs} id={styles.submitButtonContainer}>
          <button className={type ? styles.tasks : styles.inputs} id={styles.submitButton} type="submit">{submitButtonText}</button>
        </div>
      </form>
  )
}

export default Form
