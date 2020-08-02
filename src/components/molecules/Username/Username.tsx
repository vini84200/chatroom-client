import React, {useState} from 'react'
import { useUser } from '../../../services/useUsername'
import InlineEditor from '../../atoms/InlineEditor'

export default function Username () {
    const user = useUser()

    return (
        <InlineEditor text={user.username} onSetText={(updated) => user.setUsername(updated)} />
    )
}