import { useState } from "react"
import { postData } from "../api/post"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [secretKey, setSecretKey] = useState("")

    const register = () => {
        postData('http://127.0.0.1:5432/register/', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            secret_key: secretKey
        }).then((res) => {
            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setSecretKey("")
        })
    }

    return (
        <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 border-2 border-gray mt-4">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                Create a new account
            </div>
            {/* <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                Already have an account ?
                <a href="/login" className="text-sm text-blue-500 underline hover:text-blue-700">
                    Sign in
                </a>
            </span> */}
            <div className="p-6">
                <form action="#">
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="create-account-pseudo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Email" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" />
                        </div>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" id="create-account-first-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="First name" placeholder="First name" />
                        </div>
                        <div className=" relative ">
                            <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input value={secretKey} onChange={e => setSecretKey(e.target.value)} type="text" id="create-account-pseudo" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="pseudo" placeholder="Secret key" />
                        </div>
                    </div>
                    <div className="flex w-full my-4">
                        <button onClick={() => register()} type="button" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register