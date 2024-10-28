import styles from "./index.module.css"

function Board() {
  const name = localStorage.getItem("name");
  return (
    <div className={styles.container}>
      {name ? <h1>Welcome {name}</h1> : null}
      Board
    </div>
  )
}

export default Board
