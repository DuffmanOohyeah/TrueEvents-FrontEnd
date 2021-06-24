import { Auth, Hub } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
/**
 * userUserStatus is a react hook that tracks the user's login status and provides a "isLoggedIn" flag that can be checked in code.
 */

const _guessInitialLoginStatus = (): boolean => {
        const flagValue = localStorage.getItem(`isUserLoggedIn`);
        const isLoggedIn = (null !== flagValue) && (flagValue === 'true');
        return isLoggedIn;
}

const _setFlag = (value: boolean) => {
    const valAsString = (value) ? 'true' : 'false';
    localStorage.setItem('isUserLoggedIn', valAsString);
}

function useIsLoggedIn() {
    const initialGuess = _guessInitialLoginStatus();
    let [isLoggedIn, setIsLoggedIn] = useState(initialGuess)

    const _updateLoggedInState = (value: boolean) => {
        setIsLoggedIn(value);
        _setFlag(value);
    }

   
    useEffect(() => {
        const updateUser = async () => {
            try {
                await Auth.currentAuthenticatedUser()
                _updateLoggedInState(true);
            } catch {
                _updateLoggedInState(false);
            }
        }
    
        Hub.listen('auth', updateUser)
        updateUser();
        return () => {
            Hub.remove('auth', updateUser)
            _updateLoggedInState(false)
        }
    },[]);

    return isLoggedIn;
}

export default useIsLoggedIn;
