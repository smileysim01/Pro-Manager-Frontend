import styles from './index.module.css'
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import dice from '../../src/assets/dice.png';
import logout from '../../src/assets/logout.png';
import back from '../../src/assets/back.png';
import NavTabs from '../../components/navtabs';
import Board from '../board';

function MainPage() {
    const [selectedTab, setSelectedTab] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setSelectedTab(path || null);
    },[location.pathname]);
    
    const [width, setWidth] = useState(window.innerWidth);
    // checking device size to make it responsive
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    const logoutFunc = async () => {
      setIsPopupOpen(true);
    }
  return (
    <div className={styles.container}>
      {
        (width < 720) ? (
          (selectedTab ? 
          <div className={styles.mobileContainerContent}>
            <img className={styles.backButton} src={back} alt="back" onClick={()=> {navigate(-1)}}/>
            <Outlet/>
          </div> : 
          <>
            <div className={styles.left} id={styles.mobileContainer}>
              <h1 id={styles.header}><img src={dice} alt="logo"/>Pro Manage</h1>
              <NavTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
              <div className={styles.logout} onClick={()=>logoutFunc()}><img src={logout} alt="logout"/>Logout</div>
              <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                  <div className={styles.logoutPopup}>
                    <div className={styles.popupHeader}>
                      Are you sure you want to Logout?
                    </div>
                    <button className={styles.popupButtonLogout} onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("name");navigate("/login");}}>Yes, Logout</button>
                    <button className={styles.popupButtonCancel} onClick={()=>{setIsPopupOpen(false)}}>Cancel</button>
                  </div>
              </Popup>
              {isPopupOpen && <div id={styles.onPopup}></div>}
            </div>
          </>
          )
        ) : (
          <>
            <div className={styles.left}>
              <h1 id={styles.header}><img src={dice} alt="logo"/>Pro Manage</h1>
              <NavTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
              <div className={styles.logout} onClick={()=>logoutFunc()}><img src={logout} alt="logout"/>Logout</div>
              <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                  <div className={styles.logoutPopup}>
                    <div className={styles.popupHeader}>
                      Are you sure you want to Logout?
                    </div>
                    <button className={styles.popupButtonLogout} onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("name");navigate("/login");}}>Yes, Logout</button>
                    <button className={styles.popupButtonCancel} onClick={()=>{setIsPopupOpen(false)}}>Cancel</button>
                  </div>
              </Popup>
              {isPopupOpen && <div id={styles.onPopup}></div>}
            </div>
            <div className={styles.right}>
              {selectedTab ? <Outlet /> : <Board />}
            </div>
          </>
        )
      }
    </div>
  )
}
export default MainPage
