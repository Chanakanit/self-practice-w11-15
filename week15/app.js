const planCoursesData = [
  {
    planId: 1,
    name: "Basic Plan",
    courses: [
      { code: "CS101", title: "Intro to Computer Science" },
      { code: "CS102", title: "Programming Fundamentals" },
    ]
  },
  {
    planId: 2,
    name: "Web Dev Plan",
    courses: [
      { code: "WD201", title: "HTML & CSS" },
      { code: "WD202", title: "JavaScript Basics" },
      { code: "WD203", title: "Frontend Frameworks" },
    ]
  },
  {
    planId: 3,
    name: "Full-Stack Developer",
    courses: [
      { code: "FS301", title: "Backend Development" },
      { code: "FS302", title: "REST API Design" },
      { code: "FS303", title: "Database Systems" },
      { code: "FS304", title: "DevOps Basics" },
    ]
  }
]

async function loadPlanCourses() {
  return new Promise(resolve => {
    setTimeout(() => resolve(planCoursesData))
  })
}


async function initPlanDropdown() {
  const plans = await loadPlanCourses()
  const planSelect = document.getElementById("planSelect")

  planSelect.innerHTML = ""

  plans.forEach(plan => {
    const option = document.createElement("option")
    option.value = plan.planId
    option.textContent = `${plan.planId} - ${plan.name}`
    planSelect.appendChild(option)
  })
}

initPlanDropdown()
const showBtn = document.getElementById("showBtn")
const planSelect = document.getElementById("planSelect")

showBtn.addEventListener("click", () => {
  const planId = Number(planSelect.value)
  sentPlanId(planId)
})


async function sentPlanId(planId){ 
  const plans = await loadPlanCourses()
  const reserveCourses = document.querySelector('.reserve-courses')
  reserveCourses.innerHTML = ''

  const plan = plans.find(p => p.planId === planId)
  coreCoursesEle(plan.courses)
}

function coreCoursesEle (courses) {
  const reserveCourses = document.querySelector('.reserve-courses')
  const div = document.createElement('div')
  div.className = 'core-courses'

  const h2 = document.createElement('h2')
  h2.setAttribute('data-cy', 'core-courses-header')
  h2.className = 'core-courses-header'
  h2.textContent = "Core Courses"

  const ul = document.createElement("ul")
  ul.className = "core-courses-list"
  courses.forEach(course => {
    ul.appendChild(createCourseItem(course))
  })

  div.appendChild(h2)
  div.appendChild(ul)
  reserveCourses.appendChild(div)
  return div
}

function createCourseItem(course) {
  const li = document.createElement("li")
  li.setAttribute('data-cy', 'core-course')
  li.className = "core-course"
  li.textContent = `${course.code} ${course.title}`
  return li
}
