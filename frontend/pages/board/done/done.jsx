import styles from './done.module.css';
import { done } from '../../../services/task';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DisplayTask from '../../../components/displayTask';
import collapseImg from '../../../src/assets/collapse.png';

function Done() {
    const [doneData, setDoneData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await done()
            setDoneData(response.data)
            setIsLoading(false);
        } catch (error) {
            error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
        }
        }
        fetchData()
    }, [])

  return (
    <div className={styles.container}>
      <h4>Done<img src={collapseImg} alt="collapse" onClick={handleCollapse}/></h4>
      {isLoading ? <p>Loading...</p> : !doneData ? null : 
      (
        <div className={styles.done}>
            {doneData.map((task) => (
                <div className={styles.task} key={task._id}>
                    <DisplayTask task={task} listType={task.listType} collapse={collapse}/>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Done;
