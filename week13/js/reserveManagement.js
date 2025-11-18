// CRUD
import { getItems, addDeclare } from "./myLib/fetchUtils.js";

// GET all plans
async function loadPlans() {
  const dialog = document.querySelector(".ecors-dialog");

  try {
    const plans = await getItems("http://localhost:3001/study-plans");
    return plans ?? [];
  } catch (error) {
    return [];
  }
}

// GET declared plan by student id
async function getIdDeclared(id) {
  try {
    const declared = await getItems(`http://localhost:3001/students/${id}/declared-plan`);
    return declared;
  } catch (error) {
    console.log(error);
  }
}

// POST declare plan
async function postDeclare(studentId, item) {
  const ecorsDialog = document.querySelector('.ecors-dialog');
  const messageDialog = document.querySelector('.ecors-dialog-meessage');

  try {
    const newDeclare = await addDeclare(`students/${studentId}/declared-plan`, item);
    return newDeclare;
  } catch (error) {
    ecorsDialog.showModal();
    messageDialog.textContent = error;
  }
}

export { loadPlans, getIdDeclared, postDeclare };
