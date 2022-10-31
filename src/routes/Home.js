import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PurchaseConsole from "../component/Console.purchase"
import { useDispatch } from 'react-redux'
import { removeCredentials } from "../slice/user"

const Home = (probs) => {
    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()

    console.log(probs.logout);
    console.log(user);

    if (user.id == null) return <Navigate replace to="/login" />

    if (probs.logout) dispatch(removeCredentials())

    return (
        <PurchaseConsole operation={probs.operation} />
    )
}

export default Home