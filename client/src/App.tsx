import { Outlet } from 'react-router'
import './assets/css/tailwind.css'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDark } from './store/appSlice';
function App() {
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);
  return (
    <>
      <div className={isDark ? "dark" : ""}>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
