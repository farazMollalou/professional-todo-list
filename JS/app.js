const task_actions_btns = document.querySelectorAll('.fa-cog')
const task_actions_btn_box = document.querySelectorAll('.action-btn-box')


task_actions_btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        task_actions_btn_box[index].classList.add('show_actions')
    })
})

window.addEventListener('click', e => {
    if (e.target.id === "actions-close-btn") {
        e.target.parentElement.classList.remove('show_actions')
    }
})

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
const add_new_task_btn = document.querySelector('#add_new_task_btn')
const modal_bg = document.querySelector('.modal-bg')

add_new_task_btn.addEventListener('click', () => {
    modal_bg.classList.add("active")
    modals_list[0].classList.add('active')
})

// add new task btn end

const daily_note_btn = document.querySelector('#daily_note_btn')

daily_note_btn.addEventListener("click", () => {
    modal_bg.classList.add("active")
    modals_list[1].classList.add('active')
})


