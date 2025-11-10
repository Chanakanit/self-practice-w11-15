import {loadQuotes, addQuote, editQuote, delQuote} from "./quoteManagement.js"

const quoteForm = document.getElementById("quoteForm");
const quoteList = document.getElementById("quoteList");
const quoteId = document.getElementById("quoteId");
const content = document.getElementById("content");
const author = document.getElementById("author"); 

document.addEventListener("DOMContentLoaded", async () => {
  await renderQuotes()
})

async function renderQuotes() {
  quoteList.innerHTML = "";
  const quotes = await loadQuotes()
  console.log(quotes)
  quotes.forEach(quote => {
    const newQ = QuoteEl(quote)
    quoteList.appendChild(newQ)
  })
}


function QuoteEl(quote){
  const div = document.createElement('div')
  div.className = "quote-card"
  div.setAttribute("data-id", quote.id)

  const pCon = document.createElement("p")
  pCon.textContent = quote.content
  div.appendChild(pCon)

  const pAut = document.createElement('p')
  pAut.className = "author"
  pAut.textContent = quote.author
  div.appendChild(pAut)

  const divAct = document.createElement('div')
  div.className = "actions"
  const btnEdit = document.createElement('button')
  btnEdit.className = "edit"
  btnEdit.setAttribute('data-id', quote.id)
  btnEdit.textContent = "Edit"
  divAct.appendChild(btnEdit)
  const btnDel = document.createElement("button")
  btnDel.className = "delete"
  btnDel.setAttribute('data-id', quote.id)
  btnDel.textContent = "Delete"
  divAct.appendChild(btnDel)
  div.appendChild(divAct)
  return div
}

async function handleForm(e){
  e.preventDefault()
  let id = quoteId.value
    const value = {
      content: content.value,
      author: author.value
    }
  if (id) {
    await editQuote(id,value)
  } else{
    await addQuote(value)
  }
  resetForm()
  await renderQuotes()
}

async function handleQuteList(e){
  if(e.target.className === "delete"){
   await delQuote(e.target.dataset.id)
  }else if(e.target.className === "edit"){
    const quotes = await loadQuotes()
    const quote = quotes.find(q => q.id === e.target.dataset.id)
    if (quote){
      fillForm(quote)
    }
  }
}

function fillForm(quote) {
  quoteId.value = quote.id;
  content.value = quote.content;
  author.value = quote.author;
}

function resetForm() {
  quoteId.value = "";
  content.value = "";
  author.value = "";
}

quoteForm.addEventListener('submit', handleForm)
quoteList.addEventListener("click", handleQuteList)