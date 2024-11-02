import styles from './addTaskForm.module.css'
import { useState } from 'react';
import trash from '../src/assets/trash.png';

function FormField({name, type, label, options, placeholder,value, onChange, checklistItems, setChecklistItems, handleChecklistChange}) {
    let content;
    switch (name) {
        case "title":
            content = (
                <div className={styles.titleGroup}>
                    <label>{label}<span className={styles.required}>*</span></label>
                    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete='off' />
                </div>
            )
            break;
        case "priority":
            content = (
                <div className={styles.priorityGroup}>
                    <label>{label}<span className={styles.required}>*</span></label>
                    {options.map((option) => (
                        <label key={option} className={option===value? styles.radioButtonSelected : styles.radioButton}>
                            <span className={`${styles.icon} ${styles[option.split(' ')[0]]}`}></span> 
                            <span>{option}</span> 
                            <input type={type} name={name} id={styles.selected} value={option} onChange={onChange} className={styles.radioInput}/>
                        </label>
                    ))}
                </div>)
            break;
        case "assignTo":
            content = (
                <div className={styles.assignToGroup}>
                    <label>{label}</label>
                    <input type={type} name={name} placeholder={placeholder} value={value ? value.join(', ') : ''} onChange={onChange} autoComplete='off' />
                </div>)
            break;
        case "checkList":
            // const newChecklist = [...checklistItems, { subTask: '', done: false }];
            content = (
                <div className={styles.checkListGroup}>
                    <label className={styles.checkListLabel}>{label}<span className={styles.required}>*</span></label>
                    <div className={styles.scrollable}>
                    <button className={styles.addButton} 
                    onClick={() => {
                        const newChecklist = [...checklistItems, { subTask: '', done: false }];
                        setChecklistItems(newChecklist);
                        handleChecklistChange(newChecklist);
                    }} >+ Add New</button>
                    {checklistItems.map((item, index) => (
                        <div key={index} className={styles.checklistItem}>
                            <input type="checkbox" checked={item.done} onChange={() => {
                            const newChecklist = [...checklistItems];
                            newChecklist[index].done = !newChecklist[index].done; // Toggle done state
                            setChecklistItems(newChecklist);
                            handleChecklistChange(newChecklist);
                        }}/>
                            <input type="text" placeholder="Add Sub Task" value={item.subTask} autoComplete='off'
                                onChange={(e) => {
                                    const newChecklist = [...checklistItems];
                                    newChecklist[index].subTask = e.target.value;
                                    setChecklistItems(newChecklist);
                                    handleChecklistChange(newChecklist);
                            }}/>
                            <img src={trash} alt="trash" onClick={() => {
                                const newChecklist = checklistItems.filter((_, i) => i !== index);
                                setChecklistItems(newChecklist);
                                handleChecklistChange(newChecklist);
                            }}/>
                        </div>
                    ))}
                    </div>
                </div>)
            break;
        case "dueDate":
            const [showCalender, setShowCalender] = useState(false)
            const handleDateSelect = (e) => {
                onChange(e)
                setShowCalender(false)
                setDateLabel(e.target.value ? new Date(e.target.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null)
            }
            const [dateLabel, setDateLabel] = useState(null)
            content = (
                <div className={styles.bottom} id={styles.dueDateGroup}>
                    <button className={styles.dueDate} onClick={()=>setShowCalender(!showCalender)}>{dateLabel || placeholder}</button>
                    {showCalender && 
                    <input type={type} name={name} value={value} onChange={handleDateSelect} autoComplete='off' className={styles.calender}/>}
                </div>)
            break;
        default:
            content = (
                <div className={styles.inputs}>
                    <label>{label}</label>
                    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete='off' />
                </div>
            )
    }

    return (
        <div className={styles.inputs}>
            {content}
        </div>
    )
}

function AddTaskForm({formFields, onSubmit, handleChecklistChange, error, errorMessages, setIsPopupOpen, submitButtonText}) {
    const [checklistItems, setChecklistItems] = useState([]);
  return (
      <form onSubmit={onSubmit} className={styles.container}>
        {formFields.map((field, index) => (
          <div className={styles.formField} key={`${field.name}-${index}`}>
            <div className={styles.inputContainer}>
              <FormField name={field.name} type={field.type} label={field?.label} options={field?.options} placeholder={field?.placeholder} value={field.value} onChange={field.onChange} checklistItems={field.name === "checkList" ? checklistItems : []} setChecklistItems={setChecklistItems} handleChecklistChange={handleChecklistChange} />
              {error[field.name] ? <p className={styles.error}>{errorMessages[field.name]}</p> : null}
            </div>
          </div>
          ))
        }
        <div className={styles.formField} >
            <div className={styles.bottom} id={styles.buttons}>
                <button className={styles.cancelButton} onClick={() => setIsPopupOpen(false)}>Cancel</button>
                <button className={styles.submitButton} type="submit">{submitButtonText}</button>
            </div>
        </div>
      </form>
  )
}

export default AddTaskForm
