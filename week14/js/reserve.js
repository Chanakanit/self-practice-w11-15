import { deleteDeclared } from "./reserveManagement.js"
const API_URL = "http://localhost:3000"

let studentId = "67130500140"

document.addEventListener("DOMContentLoaded", async () => {
    await setDeclared(studentId)
})

async function setDeclared(studentId) {
    const res = await fetch(`${API_URL}/students/${studentId}`)
    const declared = await res.json()

    declaredStatus(declared)
}

async function cancelDeclared() {
    const data = await deleteDeclared(studentId)

    if (data) {
        await setDeclared(studentId)
    }
}

function declaredStatus(declared) {
    const declaredPlan = document.querySelector('.ecors-declared-plan')
    const btnDeclare = document.querySelector('.ecors-button-declare')
    const btnForm = document.querySelector('.btnForm')

    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (declared && declared.studentId) {
        declaredPlan.textContent =
            `Declared ${declared.planCode} - ${declared.nameEng} on ${declared.updatedAt} (${localTZ})`

        btnDeclare.style.display = 'none'

        if (!btnForm) {
            btnElManagement(declared)
        } else {
            btnForm.style.display = 'flex'
            btnForm.addEventListener('click', () => handleCancel(declared, cancelDeclared))
        }
    } else {
        declaredPlan.textContent = "Not Declared"
        if (btnForm) btnForm.style.display = 'none'
        btnDeclare.style.display = 'block'
    }
}

function handleCancel(declared, cancelDeclared) {
    const dialog = document.querySelector('.ecors-dialog')
    const btnOk = document.querySelector('.ecors-button-dialog')
    const message = document.querySelector('.ecors-dialog-message')

    dialog.querySelectorAll('.ecors-button-cancel, .ecors-button-keep').forEach(btn => btn.remove())
    message.textContent = ''

    const btnCancel = document.createElement('button')
    btnCancel.className = 'ecors-button-cancel'
    btnCancel.textContent = 'Cancel Declaration'

    const btnKeep = document.createElement('button')
    btnKeep.className = 'ecors-button-keep'
    btnKeep.textContent = 'Keep Declaration'

    btnCancel.addEventListener('click', () => {
        dialog.close()
        btnCancel.remove()
        btnKeep.remove()
        message.textContent = ''
        btnOk.style.display = 'block'
        cancelDeclared()
    })

    btnKeep.addEventListener('click', () => {
        dialog.close()
        btnCancel.remove()
        btnKeep.remove()
        message.textContent = ''
        btnOk.style.display = 'block'
    })

    const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone

    message.textContent =
        `You have declared ${declared.planCode} - ${declared.nameEng} ` +
        `on ${declared.updatedAt} (${localTZ}). Are you sure you want to cancel this declaration?`

    btnOk.style.display = 'none'

    dialog.appendChild(btnCancel)
    dialog.appendChild(btnKeep)
    dialog.showModal()
}