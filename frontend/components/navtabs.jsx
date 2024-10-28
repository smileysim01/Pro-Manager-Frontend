import styles from './navtabs.module.css'
import {Link} from 'react-router-dom'
import board from '../src/assets/board.png'
import analytics from '../src/assets/analytics.png'
import settings from '../src/assets/settings.png'

function Navtabs({selectedTab, setSelectedTab}) {
    return (
      <div className={styles.container}>
        <Link to="/board" className={`${styles.tab} ${selectedTab === 'board' ? styles.active : ''}`} onClick={()=>setSelectedTab('board')}>
          <img src={board} alt="board"/>Board
        </Link>
        <Link to="/analytics" className={`${styles.tab} ${selectedTab === 'analytics' ? styles.active : ''}`} onClick={()=>setSelectedTab('analytics')}>
          <img src={analytics} alt="analytics"/>Analytics
        </Link>
        <Link to="/settings" className={`${styles.tab} ${selectedTab === 'settings' ? styles.active : ''}`} onClick={()=>setSelectedTab('settings')}>
          <img src={settings} alt="settings"/>Settings
        </Link>
      </div>
    )
  }
export default Navtabs