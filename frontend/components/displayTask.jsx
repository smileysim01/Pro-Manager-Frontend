import styles from './displayTask.module.css';
import collapseTwoImg from '../src/assets/collapseTwo.png';
import collapseThreeImg from '../src/assets/collapseThree.png';
import { useState } from 'react';

function DisplayTask({task, listType, collapse}) {
    const countDone = task.checkList.filter(subTask => subTask.done).length
    let listArray = ["BACKLOG","PROGRESS","TO-DO","DONE"]
    switch (listType) {
        case "Backlog":
            listArray = ["PROGRESS","TO-DO","DONE"];
            break;
        case "To do":
            listArray = ["BACKLOG","PROGRESS","DONE"];
            break;
        case "In Progress":
            listArray = ["BACKLOG","TO-DO","DONE"];
            break;
        case "Done":
            listArray = ["BACKLOG","TO-DO","PROGRESS"];
            break;
        default:
            listArray = listArray;
    }
    const [collapseTwo, setCollapseTwo] = useState(false);
    const handleCollapse = () => {
        setCollapseTwo(!collapseTwo);
    }
  return (
    <div className={styles.container}>
        <div className={styles.priority}>
            <div className={styles.priorityLabel}>
                <span className={`${styles.icon} ${styles[task.priority.split(' ')[0]]}`}></span> 
                <span>{task.priority}</span> 
            </div>
            <span className={styles.options}>...</span>
        </div>
      <h2 className={styles.title}>{task.title}</h2>
      <div className={styles.checkList}>
      {collapse || collapseTwo ? 
      (<span className={styles.checkListLabel}>Checklist ({countDone}/{task.checkList.length}) <img src={collapseThreeImg} alt="collapse" onClick={handleCollapse}/></span>) 
      :
      <>
        <span className={styles.checkListLabel}>Checklist ({countDone}/{task.checkList.length}) <img src={collapseTwoImg} alt="collapse" onClick={handleCollapse}/></span>
            {task.checkList.map((subTask, index) => (
                <div className={styles.subTask} key={index}>
                    <div className={styles.subTaskLabel}>
                        <input type="checkbox" checked={subTask.done} disabled={false} onChange={()=>null}/> 
                        {subTask.subTask}
                    </div>
                </div>
            ))}
      </> }
      </div>
      <div className={styles.bottom}>
        {task.dueDate ? 
        <>
        <span className={styles.dueDate}>{new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'}).format(new Date(task.dueDate))}</span>
        <span className={styles.listTypeLabel}>
            { listArray.map((list, index) => (
                <span className={styles.list} key={index}>{list}</span>
            ))}
        </span>
        </>
        : null}
      </div>
    </div>
  )
}

export default DisplayTask
