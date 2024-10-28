import styles from './form.module.css'
import { useState } from 'react';

function FormField({name, type, placeholder, value, onChange}) {
    return (
        <div className={styles.inputs}>
          <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete='on' />
        </div>
    )
}

function Form({formFields, onSubmit, error, errorMessages, submitButtonText}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
      <form onSubmit={onSubmit} className={styles.container}>
        {formFields.map((field, index) => (
          <div className={styles.formField} key={`${field.name}-${index}`}>
            {field.img ? <img src={field.img} alt={field.name}/> : null}
            <div className={styles.inputContainer}>
              <FormField name={field.name} type={(field.name === 'password' || field.name === 'oldPassword' || field.name === 'newPassword') && isVisible ? 'text' : field.type} placeholder={field?.placeholder} value={field.value} onChange={field.onChange} />
              {error[field.name] ? <p className={styles.error}>{errorMessages[field.name]}</p> : null}
            </div>
            {field.eye ? <img id={styles.eye} src={field.eye} alt="eye" onClick={()=>setIsVisible(!isVisible)}/> : null}
          </div>
          ))
        }
        <div className={styles.submitButtonContainer}>
          <button className={styles.submitButton} type="submit">{submitButtonText}</button>
        </div>
      </form>
  )
}

export default Form
