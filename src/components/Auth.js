import React from 'react'
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from 'firebase/auth'
import '../styles/Auth.scss';

import Cookies from 'universal-cookie'
import Foobar from './Foobar';
const cookies = new Cookies()

const Auth = (props) => {
    const { setIsAuth } = props
    const signInWithGoogle = async () => {
        try {

            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='auth'>
                <p>Sign In With Google To Continue</p>
                <button className='button' type='button' onClick={signInWithGoogle}> Sign In With Google</button>
            </div>
            <Foobar />
        </>
    )
}

export default Auth