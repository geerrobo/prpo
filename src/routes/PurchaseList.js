import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PurchaseLeaderConsole from "../component/Console.purchaseLeader"

const PurchaseList = () => {
    const user = useSelector((state) => state.user)
    
    useEffect(() => {
        
    }, [])

    if (user.id == null) return <Navigate replace to="/login" />

    return (
        <PurchaseLeaderConsole/>
    )
}

export default PurchaseList