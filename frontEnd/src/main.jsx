import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './HomePage/HomePage'
import backgroundImage from "./assets/images/gym.jpg";
import styles from "./app.module.css"
import { AppProvider } from './context';

function App() {
  const backgroundImageStyle = {
    "--backgroundImage" : `url(${backgroundImage})`,
  };

  return (
    <div className={styles.app} style={backgroundImageStyle}>
    <HomePage />
    </div>
  )
}
createRoot(document.getElementById('root')).render(
  <AppProvider> 
    <App />
  </AppProvider>
)
