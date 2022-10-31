import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setCredentials } from "../slice/user"
import { postData } from '../api/post'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    if (user.id >= 0 && user.id) return <Navigate replace to="/" />

    const login = () => {
        postData('http://127.0.0.1:5432/login/', {
            email: email,
            password: password,
        }).then((res) => {
            if (res.id >= 0 && res.id) {
                dispatch(setCredentials(res))
            }
        })
    }

    return (
        <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 border-2 border-gray mt-4">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                Sign in
            </div>
            <div className="p-4 mt-8">
                <form action="#">
                    <div className="flex flex-col mb-2 w-full">
                        <div className=" relative ">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="create-account-pseudo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Email" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" />
                        </div>
                    </div>
                    <div className="flex w-full my-4">
                        <button onClick={() => login()} type="button" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login