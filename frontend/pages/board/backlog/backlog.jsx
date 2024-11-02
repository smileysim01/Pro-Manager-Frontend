import styles from './backlog.module.css';
import { backlog } from '../../../services/task';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DisplayTask from '../../../components/displayTask';
import collapseImg from '../../../src/assets/collapse.png';

function Backlog() {
    const [backlogData, setBacklogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await backlog()
            setBacklogData(response.data)
            setIsLoading(false);
        } catch (error) {
            error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
        }
        }
        fetchData()
    }, [])

  return (
    <div className={styles.container}>
      <h4>Backlog<img src={collapseImg} alt="collapse" onClick={handleCollapse}/></h4>
      {isLoading ? <p>Loading...</p> : !backlogData ? null : 
      (
        <div className={styles.backlog}>
            {backlogData.map((task) => (
                <div className={styles.task} key={task._id}>
                    <DisplayTask task={task} listType={task.listType} collapse={collapse}/>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Backlog
