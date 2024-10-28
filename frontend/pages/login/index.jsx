import styles from './index.module.css'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import Form from '../../components/form'
import { login } from '../../services/auth'
import logo from '../../src/assets/logo.png'
import email from '../../src/assets/email.png'
import password from '../../src/assets/password.png'
import eye from '../../src/assets/eye.png'

function Login() {
  const navigate = useNavigate()

  // const token = localStorage.getItem("token")
  // if(token) {
  //   navigate("/")
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

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
    try {
      const response = await login(formData)
      if(response.status === 200) {
        localStorage.setItem("token", response.token)
        navigate("/")
      } 
    } catch (error) {
      if(error.status === 400) {
        setErrorMessages({email: error.message, password: error.message});
        setErrors({email: true, password: true});
      } else {
        toast.error("An unexpected error occured. Please try again.")
      }
    }
    
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const formFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      value: formData.email,
      img: email,
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
    email: false,
    password: false
  })
  const [errorMessages, setErrorMessages] = useState({
    email: "Please enter a valid email address.",
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
          <h1>Login</h1>
          <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Login" />
          <p>Have no account yet?</p>
          <div className={styles.registerContainer}>
              <button className={styles.registerButton} onClick={()=>navigate('/register')}>Register</button>
          </div>
        </div>
        </>
        ) : ( // Only Right Container
          <div className={styles.rightContainer} div={styles.mobileContainer}>
            <h1>Login</h1>
            <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Login" />
            <p>Have no account yet?</p>
            <div className={styles.registerContainer}>
              <button className={styles.registerButton} onClick={()=>navigate('/register')}>Register</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Login
