import Backlog from "./backlog/backlog";
import Done from "./done/done";
import styles from "./index.module.css"
import InProgress from "./inProgress/inProgress";
import Todo from "./todo/todo";

function Board() {
  const name = localStorage.getItem("name");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        {name ? <h1>Welcome {name}</h1> : null}
        Board
      </div>
      <div className={styles.container}>
        <Backlog/>
        <Todo/>
        <InProgress/>
        <Done/>
      </div>
    </div>
  )
}

export default Board
