const task_actions_btns = document.querySelectorAll('.fa-cog')
const task_actions_btn_box = document.querySelectorAll('.action-btn-box')

const options_clk_handler = () => {
    task_actions_btns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            task_actions_btn_box[index].classList.add('show_actions')
        })
    })
}

window.addEventListener('click', e => {
    if (e.target.id === "actions-close-btn") {
        e.target.parentElement.classList.remove('show_actions')
    }
})

// local storage coding start
const task_list_show_field = document.querySelector(".todo-list-wrapper .body .task-list")
let written_tasks = []
let daily_plan = {
    note: "",
    tasks: []
}

const showTasksOnDOM = tasks => {
    tasks.forEach(task => {
        task_list_show_field.insertAdjacentHTML("afterbegin", `<div class="task ${task.priority}">
        <i class="btn fa fa-check"></i>
        <span class="task-title">${task.title}</span>
        <i class="fa fa-cog" onclick="options_clk_handler()"></i>
        <div class="action-btn-box">
            <i class="btn fa fa-eraser"></i>
            <i class="btn fa fa-eye"></i>
            <i class="btn fa fa-pen"></i>
            <i class="btn fa fa-times" id="actions-close-btn"></i>
        </div>
    </div>`)
    })
}

window.addEventListener('load', () => {
    written_tasks = (JSON.parse(localStorage.getItem("today_list"))).tasks
    showTasksOnDOM(written_tasks)
    if (!written_tasks) {
        written_tasks = []
    }
})
// local storage coding end

// modals DOM code 
const modals_list = document.querySelector('.modal-bg').children
// modals DOM code 

// modal closing code
const modal_closers_list = document.querySelectorAll(".modal_closer")

modal_closers_list.forEach((modal_closer, index) => {
    modal_closer.addEventListener('click', () => {
        modal_bg.classList.remove('active')
        modals_list[index].classList.remove('active')
    })
})
// modal closing code


// add new task btn start
const add_new_task_modal_btn = document.querySelector('#add_new_task_modal_btn')
const modal_bg = document.querySelector('.modal-bg')
const new_task_title = document.querySelector(".new-task-form .new-task-input")
const newTaskAddBtn = document.querySelector(".new-task-form .add-btn")
const daily_note = document.querySelector(".new-task-form .description-container textarea")

add_new_task_modal_btn.addEventListener('click', () => {
    modal_bg.classList.add("active")
    modals_list[0].classList.add('active')
})

newTaskAddBtn.addEventListener("click", e => {

    e.preventDefault()

    newTask = {
        title: new_task_title.value,
        isCompleted: false,
        priority: "normal",
        id: written_tasks.length
    }

    daily_plan = {
        note: daily_note.value,
        tasks: [
            ...written_tasks, newTask
        ]
    }

    localStorage.setItem("today_list", JSON.stringify(daily_plan))

    window.location.reload()
})

// add new task btn end

const daily_note_btn = document.querySelector('#daily_note_btn')

daily_note_btn.addEventListener("click", () => {
    modal_bg.classList.add("active")
    modals_list[1].classList.add('active')
})

