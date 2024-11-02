import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import styles from './todo.module.css'
import AddTask from '../../../components/addTask'
import { todo } from '../../../services/task';
import { toast } from 'react-toastify';
import DisplayTask from '../../../components/displayTask';
import collapseImg from '../../../src/assets/collapse.png';
import AddTaskForm from '../../../components/addTaskForm';

function Todo() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [todoData, setTodoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await todo()
            setTodoData(response.data)
            setIsLoading(false);
        } catch (error) {
            error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
        }
        }
        fetchData()
    }, [])
    
    // checking device size to make it responsive
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <div className={styles.container}>
      <h4>To Do
        <div className={styles.topBtns}>
          <button id={styles.addBtn} onClick={() => setIsPopupOpen(true)}>+</button>
          <img src={collapseImg} alt="collapse" onClick={handleCollapse}/>
        </div>
        <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          {/* <AddTaskForm /> */}
          <AddTask setIsPopupOpen={setIsPopupOpen} width={width}/>
        </Popup>
        {isPopupOpen && <div id={styles.onPopup}></div>}
      </h4>
      {isLoading ? <p>Loading...</p> : !todoData ? null : 
      (
        <div className={styles.todo}>
            {todoData.map((task) => (
                <div className={styles.task} key={task._id}>
                    <DisplayTask task={task} listType={task.listType} collapse={collapse}/>
                </div>
            ))}
        </div>
      )}

    </div>
  )
}

export default Todo
