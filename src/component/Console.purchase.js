import { useState, useEffect } from "react"
import { BsPlusLg } from "react-icons/bs"
import { ImBin } from "react-icons/im"
import { AiOutlineEdit } from "react-icons/ai"
import { postData, getData } from "../api/post"
import { useSearchParams, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PurchaseConsole = ({ operation }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    let d = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok',
        hour12: false
    })
    let years = new Date(d).getFullYear()
    let months = new Date(d).getMonth()
    let days = new Date(d).getDate()
    let hours = new Date(d).getHours()
    let mins = new Date(d).getMinutes()
    let seconds = new Date(d).getSeconds()
    let datetime = `${years}-${months}-${days} ${hours}:${(String(mins).length === 1) ? '0' + String(mins) : String(mins)}:${(String(seconds).length === 1) ? '0' + String(seconds) : String(seconds)}`

    // handle datetime error
    if (isNaN(years) || isNaN(months)) {
        years = new Date().getFullYear()
        months = new Date().getMonth()
        days = new Date().getDate()
        hours = new Date().getHours()
        mins = new Date().getMinutes()
        seconds = new Date().getSeconds()

        hours = Number(hours)
        hours += 7
        if (hours >= 24) {
            days += 1
            hours -= 24
        }

        datetime = `${years}-${months}-${days} ${hours}:${(String(mins).length === 1) ? '0' + String(mins) : String(mins)}:${(String(seconds).length === 1) ? '0' + String(seconds) : String(seconds)}`
    }

    let timeCode = `${String(years).slice(2, 5)}${(String(months+1).length === 1) ? '0' + String(months+1) : String(months+1)}`

    const getLastCode = (code) => {
        let c = String(code)
        while (c.length < 3) {
            c = '0' + c
        }
        return c
    }

    const getRequireDate = (date) => {
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    }

    const [site, setSite] = useState("")
    const [section, setSection] = useState("")
    const [lastCode, setLastCode] = useState(getLastCode('1'))

    const [pCode, setPCode] = useState(!operation ? datetime : "")
    const [pNote, setPNote] = useState("")
    const [pType, setPType] = useState("")
    const [pSubType, setPSubType] = useState("")

    const [startDate, setStartDate] = useState(new Date());

    const [iNo, setINo] = useState("")
    const [iDes, setIDes] = useState("")
    const [iQty, setIQty] = useState("")
    const [iUnit, setIUnit] = useState("")
    const [iPrice, setIPrice] = useState("")
    const [iAmount, setIAmount] = useState("")
    const [iRequired, setIRequired] = useState(getRequireDate(startDate))
    const [iSup, setISup] = useState("")
    const [iAsset, setIAsset] = useState("")

    const [purchaseItem, setPurchaseItem] = useState([])

    const pId = searchParams.get('id')

    const navigate = useNavigate()

    const fetchLast = () => {
        console.log('fetch last');
        getData('http://127.0.0.1:5432/purchase/last/', {}).then((res) => {
            let last = res[0]
            let l = String(last.code).split('-')
            if (l[3] !== undefined) {
                setLastCode(getLastCode(Number(l[3]) + 1))
            }
        })
    }

    const fetchRetrieve = () => {
        console.log('fetch retrieve');
        getData(`http://127.0.0.1:5432/purchase/${pId}/`).then((res) => {
            let { code, type, sub_type, items } = res
            setPCode(code)
            setPType(type)
            setPSubType(sub_type)
            setSite(String(code).slice(0, 2))
            setSection(String(code).slice(0, 2))
            setPurchaseItem(items)
        })
    }

    useEffect(() => {
        if (!operation) fetchLast()
        else {
            if (pId !== "") fetchRetrieve()
        }
    }, [])

    useEffect(() => {
        if (!operation) {
            setPCode(`${site}-${section}-${timeCode}-${lastCode}`)
            fetchLast()
        }
        else {
            setPCode(`${site}-${section}-${String(pCode).slice(6, 14)}`)
        }
    }, [site, section, lastCode])

    const setEmpty = () => {
        setINo("")
        setIDes("")
        setIQty("")
        setIUnit("")
        setIPrice("")
        setIAmount("")
        setIRequired(getRequireDate(new Date()))
        setISup("")
        setIAsset("")
    }

    const validDes = (value) => {
        if (iNo === '') {
            if (String(value).length >= 0) {
                setIDes(String(value).slice(0, 0))
            }
            else setIDes(value)
        }
        else if (Number(iNo) % 1 === 0) {
            if (String(value).length >= 18) {
                setIDes(String(value).slice(0, 18))
            }
            else setIDes(value)
        } else {
            if (String(value).length >= 24) {
                setIDes(String(value).slice(0, 24))
            }
            else setIDes(value)
        }
    }

    const addItem = () => {
        setPurchaseItem([...purchaseItem, {
            id: Math.floor(Math.random() * 1000),
            i_no: iNo,
            i_des: iDes,
            i_qty: (iQty===""?"0":iQty),
            i_unit: iUnit,
            i_price: (iPrice === "") ? "0.00" : iPrice,
            i_amount: iAmount===""?"0":iAmount,
            i_req: iRequired,
            i_sup: iSup,
            i_asset: iAsset,

        }])
        setEmpty()
    }

    const removeItem = (id) => {
        let ar = purchaseItem

        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                ar.splice(i, 1)
                break
            }
        }
        setPurchaseItem([...ar])
    }

    const editItem = (id) => {
        let ar = purchaseItem

        for (let i = 0; i < ar.length; i++) {
            if (ar[i].id === id) {
                setINo(ar[i].i_no)
                setIDes(ar[i].i_des)
                setIQty(ar[i].i_qty)
                setIUnit(ar[i].i_unit)
                setIPrice(ar[i].i_price)
                setIAmount(ar[i].i_amount)
                setIRequired(ar[i].i_req)
                setISup(ar[i].i_sup)
                setIAsset(ar[i].i_asset)
                ar.splice(i, 1)
                break
            }
        }
        setPurchaseItem([...ar])
    }

    const createPurchase = () => {
        console.log('xxx');
        console.log(purchaseItem.length === 0);
        if (purchaseItem.length === 0) return

        postData('http://127.0.0.1:5432/purchase/', {
            p_code: pCode,
            p_note: pNote,
            p_type: pType,
            p_sub_type: pSubType,
            items: purchaseItem
        }).then((res) => {
            if (Boolean(res.id)) {
                setEmpty()
                setPurchaseItem([])
                setPCode("")
                setPNote("")
                setPType("")
                setPSubType("")
                setSite("")
                setSection("")
            }
            fetchLast()
        })
    }

    const approvePurchase = () => {
        postData('http://127.0.0.1:5432/purchase/approve/', {
            p_id: pId,
        })
        navigate('/purchase-list')
    }

    const rejectPurchase = () => {
        postData('http://127.0.0.1:5432/purchase/reject/', {
            p_id: pId,
        })
        navigate('/purchase-list')
    }

    return (
        <div className="flex flex-col mt-4 w-full">
            <div className="p-6">
                <form action="#">
                    <div className="flex gap-4 mb-8">
                        <select onChange={e => setSite(e.target.value)} value={site} className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="sites">
                            <option value="">
                                Select site
                            </option>
                            <option value="01">
                                Carrot
                            </option>
                            <option value="02">
                                Banana
                            </option>
                            <option value="03">
                                Hamster
                            </option>
                            <option value="04">
                                Parrot
                            </option>
                        </select>
                        <select onChange={e => setSection(e.target.value)} value={section} className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="section">
                            <option value="">
                                Select section
                            </option>
                            <option value="01">
                                Accounting
                            </option>
                            <option value="02">
                                Purchasing
                            </option>
                        </select>
                        <div className=" relative">
                            <p className="rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm" name="code">{pCode}</p>
                        </div>
                        <div class="flex items-center gap-8 px-4 rounded-lg border-transparent appearance-none border border-gray-300 bg-gray-200 shadow-sm">
                            <label class="inline-flex items-center">
                                <input onChange={e => setPType(e.target.value)} checked={pType === "buy"} type="radio" value="buy" name="type" class="h-5 w-5 text-red-600" />
                                <span class="ml-2 text-gray-700">
                                    ซื้อ
                                </span>
                            </label>
                            <label class="inline-flex items-center">
                                <input onChange={e => setPType(e.target.value)} checked={pType === "expenses"} type="radio" value="expenses" name="type" class="h-5 w-5 text-red-600" />
                                <span class="ml-2 text-gray-700">
                                    ค่าใช้จ่าย
                                </span>
                            </label>
                        </div>
                        {(pType === '') ?
                            <></> :
                            (pType === 'buy') ?
                                <div class="flex items-center gap-8 px-4 rounded-lg border-transparent appearance-none border border-gray-300 bg-gray-200 shadow-sm">
                                    <label class="inline-flex items-center">
                                        <input onChange={e => setPSubType(e.target.value)} checked={pSubType === "asset"} type="radio" value="asset" name="sub" class="h-5 w-5 text-red-600" />
                                        <span class="ml-2 text-gray-700">
                                            ทรัพย์สิน
                                        </span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input onChange={e => setPSubType(e.target.value)} checked={pSubType === "replace"} type="radio" value="replace" name="sub" class="h-5 w-5 text-red-600" />
                                        <span class="ml-2 text-gray-700">
                                            ทดแทน
                                        </span>
                                    </label>
                                </div> :
                                <div class="flex items-center gap-8 px-4 rounded-lg border-transparent appearance-none border border-gray-300 bg-gray-200 shadow-sm">
                                    <label class="inline-flex items-center">
                                        <input onChange={e => setPSubType(e.target.value)} checked={pSubType === "repair"} type="radio" value="repair" name="sub" class="h-5 w-5 text-red-600" />
                                        <span class="ml-2 text-gray-700">
                                            ซ่อม
                                        </span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input onChange={e => setPSubType(e.target.value)} checked={pSubType === "other"} type="radio" value="other" name="sub" class="h-5 w-5 text-red-600" />
                                        <span class="ml-2 text-gray-700">
                                            อื่นๆ
                                        </span>
                                    </label>
                                </div>}
                        {
                            (operation ?
                                <div className="w-2/12 inline-flex items-center justify-start">
                                    <button onClick={() => approvePurchase()} type="button" className="py-2 px-3 mx-2 bg-green-600 hover:bg-green-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Approve
                                    </button>
                                    <button onClick={() => rejectPurchase()} type="button" className="py-2 px-3  bg-red-600 hover:bg-red-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Cancel
                                    </button>
                                </div> :
                                <div className="w-1/12 flex items-center justify-center">
                                    <button onClick={() => createPurchase()} type="button" className="py-2 px-3  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Create
                                    </button>
                                </div>)
                        }

                    </div>

                    {
                        !operation ?
                            <div className="flex gap-4 mb-2 mt-8">
                                <div className=" relative w-1/12 ">
                                    <input value={iNo} onChange={e => setINo(e.target.value)} type="text" id="create-account-first-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="First name" placeholder="No" />
                                </div>
                                <div className=" relative w-2/12">
                                    <input value={iDes} onChange={e => validDes(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Description" />
                                </div>
                                <div className=" relative w-1/12">
                                    <input value={iQty} onChange={e => setIQty(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Qty" />
                                </div>
                                <div className=" relative w-1/12">
                                    <input value={iUnit} onChange={e => setIUnit(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Unit" />
                                </div>
                                <div className=" relative w-1/12">
                                    <input value={iPrice} onChange={e => setIPrice(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Price" />
                                </div>
                                <div className=" relative w-1/12">
                                    <input value={iAmount} onChange={e => setIAmount(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Amount" />
                                </div>
                                {/* <div className=" relative w-1/12">
                                    <input value={iRequired} onChange={e => setIRequired(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Required" />
                                </div> */}
                                <div className=" relative w-1/12">
                                    <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); setIRequired(getRequireDate(date)) }} dateFormat='yyyy/MM/dd' className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                </div>

                                <div className=" relative w-1/12">
                                    <input value={iSup} onChange={e => setISup(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Supplier" />
                                </div>
                                <div className=" relative w-1/12">
                                    <input value={iAsset} onChange={e => setIAsset(e.target.value)} type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="Last name" placeholder="Asset No." />
                                </div>
                                <div className=" relative ">
                                    <button onClick={() => addItem()} type="button" className="py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                        <BsPlusLg className="mr-1" />
                                        Add
                                    </button>

                                </div>
                            </div> :
                            <div className="flex gap-4 mb-2">
                                <div className=" relative w-2/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">No.</p>
                                </div>
                                <div className=" relative w-4/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Description</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Qty</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Unit</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Price</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Amount</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Required</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Supplier</p>
                                </div>
                                <div className=" relative w-1/12">
                                    <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">Asset No.</p>
                                </div>
                            </div>
                    }
                    <div className="overflow-y-scroll scroll-smooth h-96 py-2">
                        {
                            !operation ?
                                purchaseItem.map((item) => (
                                    <div className="flex gap-4 mb-2">
                                        <div className=" relative w-2/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_no}</p>
                                        </div>
                                        <div className=" relative w-4/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_des}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_qty}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_unit}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_price}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_amount}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_req}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_sup}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.i_asset}</p>
                                        </div>
                                        <div className=" relative">
                                            <div className="flex flex-row">
                                                <button onClick={() => removeItem(item.id)} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                                    <ImBin className="mr-1" />
                                                    Delete
                                                </button>
                                                <button onClick={() => editItem(item.id)} type="button" className="ml-2 py-2 px-4 flex justify-center items-center  bg-yellow-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                                    <AiOutlineEdit className="mr-1" />
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                purchaseItem.map((item) => (
                                    <div className="flex gap-4 mb-2">
                                        <div className=" relative w-2/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.no}</p>
                                        </div>
                                        <div className=" relative w-4/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.description}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.qty}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.unit}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.price}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.amount}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.required}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.supplier}</p>
                                        </div>
                                        <div className=" relative w-1/12">
                                            <p className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm">{item.asset_no}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                    <div className="flex gap-4 mb-2 mt-8">
                        <div className=" relative w-full">
                            <input value={pNote} onChange={e => setPNote(e.target.value)} type="text" id="create-account-first-name" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="First name" placeholder="Note" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PurchaseConsole