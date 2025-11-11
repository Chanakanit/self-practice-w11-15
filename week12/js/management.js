import { getItems } from "./myLib/fetchUtils.js";

const url = import.meta.env.VITE_APP_URL
async function loadPlans(){
    const dialog = document.getElementById('dialog')
    const table = document.getElementById('table')
    try{
        const plans = await getItems(`${url}/plans`)
        return plans ?? []
    }catch(error){
        table.style.display = 'none'
        dialog.showModal()
    }
}

export {loadPlans}