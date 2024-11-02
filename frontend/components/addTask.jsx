import styles from './addTask.module.css'
import { addTask } from '../services/task'
import { useState } from 'react'
import Form from '../components/form'

function AddTask({setIsPopupOpen, width}) {
    const onChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
        setErrors({
          ...errors,
          [e.target.name]: false
        })
        console.log(e.target);
      }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsPopupOpen(false);
    }
    const [formData, setFormData] = useState({
        title: "",
        priority: "",
        assignTo: "",
        checkList: "",
        dueDate: ""
    })
    const formFields = [
    {
        name: "title",
        type: "text",
        placeholder: "Title",
        value: formData.title,
        label: "Title",
        required: true,
        onChange: onChange
    }, {
        name: "priority",
        type: "radio",
        options: ["High Priority","Moderate Priority","Low Priority"],
        value: formData.priority,
        label: "Select Priority",
        required: true,
        onChange: onChange
    }, {
        name: "assignTo",
        type: ["text"],
        placeholder: "Add assignee",
        value: formData.assignTo,
        label: "Assign To",
        onChange: onChange
    }, {
        name: "checkList",
        type: ["text"],
        placeholder: "+ Add New",
        value: formData.checkList,
        label: "Checklist",
        required: true,
        onChange: onChange
    }, {
        name: "dueDate",
        type: "date",
        placeholder: "Select Due Date",
        value: formData.dueDate,
        onChange: onChange
    }
    ]
    const [errors, setErrors] = useState({
    title: false,
    priority: false,
    assignTo: false,
    checkList: false,
    dueDate: false
    })
    const [errorMessages, setErrorMessages] = useState({
    title: "Title is required.",
    priority: "Priority is required.",
    assignTo: "",
    checkList: "Checklist is required.",
    dueDate: ""
    })
  return (
    <div className={styles.container}>
      Add task
      <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Save" type="task"/>
    </div>
  )
}

export default AddTask
