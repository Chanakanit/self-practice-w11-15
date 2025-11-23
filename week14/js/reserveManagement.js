import { delDeclared } from "./myLib/fetchUtils.js"

const API_URL = "http://localhost:3000"

export async function deleteDeclared(studentId) {
    const ecorsDialog = document.querySelector('.ecors-dialog')
    const messageDialog = document.querySelector('.ecors-dialog-message')
    messageDialog.textContent = ''

    try {
        const declared = await delDeclared(`${API_URL}/students/${studentId}`)
        return declared
    } catch (error) {
        ecorsDialog.showModal()
        messageDialog.textContent = error.message
    }
}

