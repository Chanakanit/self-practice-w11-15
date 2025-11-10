//CRUD on any items
//GET
async function getItems(url) {
  try {
    const res = await fetch(url) //fetch returns respnse object
    console.log(res)
    const data = await res.json() //json() converts json string to JavaScript object
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
//POST
async function postItem(url, item){
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    })
    console.log("Post res:",res)
    const data = await res.json()
    console.log("Post data:", data)
    return data
  }catch(error){
    throw new Error(error)
  }
}
//PUT
async function putItem(url, item){
  try{
    const res = await fetch(url, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    })
    console.log("put res:", res)
    const data = res.json()
    console.log("put data:", data)
    return data
  }catch (error){
    throw new Error(error)
  }
}
//DELETE
async function delItem(url){
  try{
    const res = await fetch(url, {method: "DELETE"})
    console.log("del res:", res)
    const data = res.json()
    console.log("del data", data)
    return data
  }catch(error){
    throw new Error(error)
  }
}
export { getItems, postItem, putItem, delItem }