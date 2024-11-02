import styles from './index.module.css'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Form from '../../components/form'
import { settings, getAccount } from '../../services/auth'
import name from '../../src/assets/name.png'
import email from '../../src/assets/email.png'
import password from '../../src/assets/password.png'
import eye from '../../src/assets/eye.png'

function Settings() {
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: false
    })
  }
  const logoutFunc = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }
  const [isLoading, setIsLoading] = useState(true);
  const loadUserData = async () => {
    await getAccount().then((res) => {
    setFormData(res.data);
    setIsLoading(false);
    });
  }
  useEffect(() => {
    loadUserData();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await settings(formData)
      if(response.status === 200 && response.message === "Settings updated successfully.") {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        toast.success(response.message)
        response.logout ? logoutFunc() : null;
      } else if (response.status === 200) {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      if(error.message && typeof error.message === 'object') {
        setErrorMessages((prevMsg) => ({...prevMsg, ...error.message}));
        setErrors((prevErrors) => {
          const newErrors = {...prevErrors};
          Object.keys(error.message).forEach((field) => {
            newErrors[field] = true;
          });
          return newErrors;
        })
        toast.error("Please check the form fields and try again.")
      } else if(error.status === 400) {
        const errorMessage = error.message;
        if(errorMessage === "Email already exists.") {
          setErrorMessages((prevMsg) => ({...prevMsg, email: errorMessage}));
          setErrors((prevErrors) => ({...prevErrors, email: true}));
        }else if(errorMessage === "Incorrect password.") {
          setErrorMessages((prevMsg) => ({...prevMsg, oldPassword: errorMessage}));
          setErrors((prevErrors) => ({...prevErrors, oldPassword: true}));
        }
      } else {
        error.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
      }
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  })
  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: formData.name,
      img: name,
      onChange: onChange
    },{
      name: "email",
      type: "email",
      placeholder: "Update Email",
      value: formData.email,
      img: email,
      onChange: onChange
    }, {
      name: "oldPassword",
      type: "password",
      placeholder: "Old Password",
      value: formData.oldPassword,
      img: password,
      eye: eye,
      onChange: onChange
    }, {
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      value: formData.newPassword,
      img: password,
      eye: eye,
      onChange: onChange
    }
  ]
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    oldPassword: false,
    newPassword: false
  })
  const [errorMessages, setErrorMessages] = useState({
    name: "Name is required.",
    email: "Please enter a valid email address.",
    oldPassword: "Old password is required.",
    newPassword: "Please enter new password."
  })

  return (
    <div className={styles.container} div={styles.mobileContainer}>
        <h1>Settings</h1>
        {isLoading ? <p>Loading...</p> : 
        <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Update" />}
    </div>
  )
}

export default Settings
