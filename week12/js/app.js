import { loadPlans } from "./management.js";

const tbody = document.getElementById('tbody')
document.addEventListener('DOMContentLoaded', () => render())
async function render(){
    tbody.innerHTML = ""
    const plans = await loadPlans()
    console.log(plans)
    plans.forEach(p => {
        tbody.appendChild(Eltable(p))
    })
}
function Eltable(plan){
    const tr = document.createElement('tr')
    const tdID = document.createElement('td')
    tdID.textContent = plan.id
    const tdSC = document.createElement('td')
    tdSC.textContent = plan.planCode
    const tdEN = document.createElement('td')
    tdEN.textContent = plan.nameEng
    const tdTN = document.createElement('td')
    tdTN.textContent = plan.nameTh 

    tr.appendChild(tdID)
    tr.appendChild(tdSC)
    tr.appendChild(tdEN)
    tr.appendChild(tdTN)
    return tr
}
