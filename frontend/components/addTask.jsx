import styles from './addTask.module.css'
import { addTask } from '../services/task';
import { useState } from 'react'
import AddTaskForm from './addTaskForm'
import {toast} from 'react-toastify'
import ValidateTaskForm from '../utils/validateTaskForm'

function AddTask({setIsPopupOpen, width}) {
    const onChange = (e) => {
      if(e.target.name === 'checkList') {/*handling this in addTaskForm*/}
      else if(e.target.name === 'assignTo'){
        const assigneeArr = e.target.value.split(',').map(item => item.trim());
        setFormData({
          ...formData,
          [e.target.name]: assigneeArr
        })
      }
      else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
      setErrors({
        ...errors,
        [e.target.name]: false
      })
    }
    const handleChecklistChange = (newChecklist) => {
      if (newChecklist.length || newChecklist.every((task) => task.subTasks.every((subTask) => subTask.trim() !== ""))) {
        const formattedChecklist = newChecklist.map(item => ({
          subTask: item.subTask.trim() || "", 
          done: item.done || false 
        }));
        setFormData((prev) => ({ ...prev, checkList: formattedChecklist }));
        setErrors({
          ...errors,
          checkList: false
        })
      }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = ValidateTaskForm(formData, setErrors)
        if (isValid) {
          try {
            const response = await addTask(formData)
            if(response.status === 201) {
              toast.success(response.message)
            } 
            setIsPopupOpen(false);
          } catch (error) {
            error.message ? toast.error(error.message) : toast.error("Please check the task fields and try again.")
          }
        }
    }
    const [formData, setFormData] = useState({
        title: "",
        priority: "",
        assignTo: [],
        checkList: [],
        dueDate: ""
    })
    let countDone = formData.checkList.filter(subTask => subTask.done).length;
  
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
        options: ["HIGH PRIORITY","MODERATE PRIORITY","LOW PRIORITY"],
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
        label: `Checklist (${countDone}/${formData.checkList.length})`,
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
    dueDate: false,
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
      <AddTaskForm formFields={formFields} handleChecklistChange={handleChecklistChange} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} setIsPopupOpen={setIsPopupOpen} submitButtonText="Save"/>
    </div>
  )
}

export default AddTask
