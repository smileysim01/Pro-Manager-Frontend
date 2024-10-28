import styles from './index.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import ValidateForm from '../../utils/validateForm'
import Form from '../../components/form'
import { register } from '../../services/auth'
import logo from '../../src/assets/logo.png'
import name from '../../src/assets/name.png'
import email from '../../src/assets/email.png'
import password from '../../src/assets/password.png'
import eye from '../../src/assets/eye.png'

function Registration() {
  const navigate = useNavigate()

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
  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = ValidateForm(formData, setErrors)
    if (isValid) {
      try {
        const response = await register(formData)
        if(response.status === 201) {
          localStorage.setItem("token", response.token)
          localStorage.setItem("name", response.name)
          toast.success(response.message)
          navigate("/")
        } 
      } catch (error) {
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
          if(errorMessage === "User already exists.") {
            setErrorMessages((prevMsg) => ({...prevMsg, email: errorMessage}));
            setErrors((prevErrors) => ({...prevErrors, email: true}));
          }
        } else {
          toast.error("An unexpected error occured. Please try again.")
        }
      }
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: ""
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
      placeholder: "Email",
      value: formData.email,
      img: email,
      onChange: onChange
    }, {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      value: formData.confirmPassword,
      img: password,
      onChange: onChange
    }, {
      name: "password",
      type: "password",
      placeholder: "Password",
      value: formData.password,
      img: password,
      eye: eye,
      onChange: onChange
    }
  ]
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    confirmPassword: false,
    password: false
  })
  const [errorMessages, setErrorMessages] = useState({
    name: "Name is required.",
    email: "Please enter a valid email address.",
    confirmPassword: "Passwords do not match.",
    password: "Please enter a password."
  })

  // for responsiveness
    const [width, setWidth] = useState(window.innerWidth);
    // checking device size to make it responsive
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    <div className={styles.container}>
      {
        (width > 720) ? ( // Left & Right Containers
          <>
          <div className={styles.leftContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
            <p className={styles.heading}>Welcome aboard my friend</p>
            <p className={styles.subheading}>just a couple of clicks and we start</p>
          </div>

          <div className={styles.rightContainer}>
          <h1>Register</h1>
          <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Register" />
          <p>Have an account?</p>
          <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={()=>navigate('/login')}>Login</button>
          </div>
        </div>
        </>
        ) : ( // Only Right Container
          <div className={styles.rightContainer} div={styles.mobileContainer}>
            <h1>Register</h1>
            <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Register" />
            <p>Have an account?</p>
            <div className={styles.loginContainer}>
              <button className={styles.loginButton} onClick={()=>navigate('/login')}>Login</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Registration
