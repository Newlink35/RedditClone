import React from 'react'
import random from '../store/Authentication/random'

const AccessingFile = () => {
    const { isValue, setIsValue } = random();
    console.log("this is the ", isValue);
    return (
        <div>

        </div>
    )
}

export default AccessingFile
