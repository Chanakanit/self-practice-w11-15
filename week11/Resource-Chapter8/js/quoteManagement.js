//CRUD on quotes
import { getItems, postItem, putItem, delItem } from "./myLib/fetchUils.js"
const url = import.meta.env.VITE_APP_URL
//GET Quotes
async function loadQuotes() {
  try {
    const quotes = await getItems(`${url}/quotes`)
    console.log(quotes)
    return quotes
  } catch (error) {
    alert(error)
  }
}
//Create Quote
async function addQuote(newQ){
  try {
    const add = await postItem(`${url}/quotes`, newQ)
    console.log("add :", add)
    return add
  }catch (error){
    alert(error)
  }
}
//Edit Quote
async function editQuote(id, editQ) {
  try{
    const edit = await putItem(`${url}/quotes/${id}`, editQ)
    console.log("edit:", edit)
    return edit
  }catch(error){
    alert(error)
  }
}
//Delete Quote
async function delQuote(id){
  try{
    const del = await delItem(`${url}/quotes/${id}`)
    console.log("del:", del)
    return del
  }catch (error){
    alert(error)
  }
}
export { loadQuotes, addQuote, editQuote, delQuote }