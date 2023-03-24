import { useRef, useState } from 'react';
import './styles/App.scss';
import Auth from './components/Auth';
import { signOut } from 'firebase/auth'

import Cookies from 'universal-cookie'
import Chat from './components/Chat';
import Foobar from './components/Foobar';
import { auth } from './firebase-config';
const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }


  const handleSubmit = () => {
    if (roomInputRef.current.value.length < 3) {
      alert('Please enter a Room ID')
      roomInputRef.current.focus()
      return
    }

    setRoom(roomInputRef.current.value)

  }
  if (!isAuth) {

    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (

    <div className="App">{room ? (
      <Chat room={room} />
    ) : (
      <div className="room">
        <label htmlFor="">Enter Room ID:</label>
        <input ref={roomInputRef} placeholder='enter room id' required minLength={3} />
        <button className='button' type='submit' onClick={handleSubmit}>Enter Chat</button>
        <Foobar />
      </div>
    )}
      <div className="sign-out">
        <button style={{ 'marginBottom': '1rem' }} className='button' type='button' onClick={signUserOut}>Sign Out</button>
      </div>
    </div>


  )
}

export default App;
