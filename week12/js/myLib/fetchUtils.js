//GET
async function getItems(url) {
    try{
        const res = await fetch(url)
        const data = await res.json()
        return data ?? []
    }catch (error){
        throw new Error(error)
        
    }
}

export {getItems}