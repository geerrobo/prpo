const postData = async (url = '', data = {}) => {
    console.log(`postData => ${url}`);
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let json = await res.json()
    return json
}

const getData = async (url = '', data = {}) => {
    console.log(`getData => ${url}`);
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let json = await res.json()
    return json
}

const patchData = async (url = '', data = {}) => {
    console.log(`getData => ${url}`);
    const res = await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let json = await res.json()
    return json
}

export { postData, getData, patchData }