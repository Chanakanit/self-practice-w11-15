import { loadPlans, getIdDeclared, postDeclare } from "./reserveManagement.js";

document.addEventListener("DOMContentLoaded", async () => {
  const plans = await loadPlans();
  const dropdownPlan = document.getElementById('plan-select');
  plans.forEach(p => dropdownPlan.appendChild(optionEl(p)));
});

function optionEl(plan) {
  const dropdownPlan = document.getElementById('plan-select');
  const option = document.createElement('option');
  option.className = "ecors-plan-row";
  option.textContent = `${plan.planCode} - ${plan.nameEng}`;
  option.value = plan.id;
  dropdownPlan.appendChild(option);
  return option;
}

function handleFormBtn(e) {
  const declareBtn = document.querySelector('.ecors-button-declare');
  declareBtn.disabled = !e.target.value;
}

const declareOtp = document.querySelector('.ecors-dropdown-plan');
declareOtp.addEventListener('change', handleFormBtn);

function declaredStatus(declared) {
  const declaredPlan = document.querySelector('.ecors-declared-plan');
  const content = document.querySelector('.content');
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (declared && declared.studentId) {
    declaredPlan.textContent =
      `${declared.planCode} -  ${declared.nameEng} plan on ${declared.updatedAt} (${localTZ})`;
  } else {
    declaredPlan.textContent = "Not Declared";
  }
}

async function setDeclared(id) {
  const getDeclared = await getIdDeclared(id);

  if (!getDeclared || getDeclared.length !== 1) {
    declaredStatus(null);
    return;
  }

  const declared = getDeclared[0];
  const localTime = new Date(declared.updatedAt).toLocaleString("en-GB", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  declared.updatedAt = localTime;
  declaredStatus(declared);
}

// mock student id
const stdId = 66010000003;
setDeclared(stdId);

const declareForm = document.querySelector('.declare-form');
declareForm.addEventListener('submit', handleForm);

const okDialog = document.querySelector('.ecors-button-dialog');
const ecorsDialog = document.querySelector('.ecors-dialog');
okDialog.addEventListener('click', () => ecorsDialog.close());

function handleForm(e) {
  e.preventDefault();
  const formData = new FormData(declareForm);
  const selectValue = formData.get("plan-id");
  postDeclare(stdId, { planId: selectValue });
}
