import styles from './index.module.css'
import { analytics } from '../../services/task'
import { useEffect, useState } from 'react'
import point from '../../src/assets/point.png'
import {toast} from 'react-toastify'

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analytics()
        setAnalyticsData(response.analytics)
        setIsLoading(false);
      } catch (error) {
        error?.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
      }
    }
    fetchData()
  }, [])

  const entries = Object.entries(analyticsData || {});
  const leftEntries = entries.slice(0, 4);
  const rightEntries = entries.slice(4,8);

  // for responsiveness
  const [width, setWidth] = useState(window.innerWidth);
  // checking device size to make it responsive
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container} id={width > 720 ? styles.desktopContainer : styles.mobileContainer}>
      <h1>Analytics</h1>
      {analyticsData ? (
        <div className={styles.analytics} id={width > 720 ? styles.desktopAnalytics : styles.mobileAnalytics}>
          <div className={styles.leftColumn} id={width > 720 ? styles.desktopLeftColumn : styles.mobileLeftColumn}>
            {isLoading ? <p>Loading...</p> : leftEntries.map(([key,value]) => (
              <div key={key} className={styles.analyticsItem}>
                <span className={styles.itemName}><img src={point} alt="point"/>{key}</span>
                <span className={styles.itemValue}>{value}</span>
              </div>
            ))}
          </div>
          <div className={styles.rightColumn} id={width > 720 ? styles.desktopRightColumn : styles.mobileRightColumn}>
            {isLoading ? <p>Loading...</p> : rightEntries.map(([key,value]) => (
              <div key={key} className={styles.analyticsItem}>
                <span className={styles.itemName}><img src={point} alt="point"/>{key}</span>
                <span className={styles.itemValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>{isLoading ? <p>Loading...</p> : <p>Could not fetch analytics data. Try logging in again.</p>}</>
      )}
    </div>
  )
}

export default Analytics
