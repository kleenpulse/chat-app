import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase-config'


import '../styles/Chat.scss'

const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef,
            where('room', '==', room),
            orderBy("createAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
                console.log(doc.data())
            });

            setMessages(messages)
        });

        // Clean Up UseEffect
        return () => unsubscribe()
    }, []);
    console.log(room)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === '') {
            alert("message can't be empty")
            return
        }
        await addDoc(messagesRef, {
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })

        setNewMessage('')

    }
    return (

        <div className="chat-container">
            <div className='chat-app'>
                <div className="header">
                    <h1 className="room-title">Welcome to: {room}</h1>
                </div>
                <div className="messages">
                    {messages.map((msg) => (
                        <div className='msg' key={msg.id}>
                            <p><span className='user'>{msg.user}</span>{msg.text}</p>

                        </div>
                    ))}
                </div>
            </div>
            <form className='new-form' onSubmit={handleSubmit}>
                <div className="input-div">
                    <input
                        type="text"
                        className="new-message"
                        placeholder='Type your message here....'
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        required
                        autoFocus />
                    <button className='send-btn' type='submit'></button>
                </div>
            </form>
        </div>


    )
}

export default Chat