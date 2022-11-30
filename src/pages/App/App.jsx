import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import NavBar from '../../components/NavBar/NavBar'
import InboxPage from '../InboxPage/InboxPage'
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <InboxPage user={user}/>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            {/* <Route path="/inbox" element={<InboxPage user={user}/>}/> */}
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
