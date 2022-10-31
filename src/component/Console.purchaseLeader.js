import { useState, useEffect } from "react"
import { getData, postData } from "../api/post"
import { Link } from "react-router-dom"

const PurchaseLeaderConsole = () => {
    const [purchaseList, setPurchaseList] = useState([])
    // const [purchaseItemList, setPurchaseItemList] = useState([])

    useEffect(() => {
        getData('http://127.0.0.1:5432/purchase/status/01', {}).then((res) => {
            setPurchaseList([...res])

            console.log(res);
        })
    }, [])

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">
                        Purchase Request
                    </h2>
                    <div className="text-end">
                        <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className=" relative ">
                                <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name" />
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                Filter
                            </button>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Code
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Description
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Created at
                                    </th>
                                    <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        status
                                    </th>
                                    {/* <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    purchaseList.map((pur) => (
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    <Link to={`../operation?id=${pur.id}`} >{pur.code}</Link>
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {pur.note}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {pur.createAt}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden="true" className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full">
                                                    </span>
                                                    <span className="relative">
                                                        {pur.status}
                                                    </span>
                                                </span>
                                            </td>
                                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Approve
                                                </a>
                                            </td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PurchaseLeaderConsole