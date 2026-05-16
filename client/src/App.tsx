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
      <div className={isDark ? "dark bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen w-full" : "bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 min-h-screen w-full"}>
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
