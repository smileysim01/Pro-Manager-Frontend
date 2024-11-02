import styles from './inProgress.module.css';
import { inprogress } from '../../../services/task';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DisplayTask from '../../../components/displayTask';
import collapseImg from '../../../src/assets/collapse.png';

function InProgress() {
    const [inProgressData, setInProgressData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await inprogress()
            setInProgressData(response.data)
            setIsLoading(false);
        } catch (error) {
            error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
        }
        }
        fetchData()
    }, [])

  return (
    <div className={styles.container}>
      <h4>In Progress<img src={collapseImg} alt="collapse" onClick={handleCollapse}/></h4>
      {isLoading ? <p>Loading...</p> : !inProgressData ? null : 
      (
        <div className={styles.inprogress}>
            {inProgressData.map((task) => (
                <div className={styles.task} key={task._id}>
                    <DisplayTask task={task} listType={task.listType} collapse={collapse}/>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default InProgress;
