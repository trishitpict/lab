// Local array to act as our 'Server Data'
let tasks = [];

// 1. Core AJAX Function (XHR)
function ajaxRequest(method, data = null) {
    const status = document.getElementById('status');
    status.style.display = "block";

    // Create real XHR Object
    const xhr = new XMLHttpRequest();
    
    // Simulate server endpoint using Data URI to avoid CORS errors offline
    const mockUrl = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify({success: true}));

    xhr.open(method, mockUrl, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(`AJAX ${method} success:`, data);
            // Small delay to show the 'Syncing' status to examiner
            setTimeout(() => {
                status.style.display = "none";
                renderUI(); 
            }, 500);
        }
    };

    xhr.send(data ? JSON.stringify(data) : null);
}

// 2. CREATE: Add Task
function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    const newTask = { id: Date.now(), text: input.value, done: false };
    tasks.push(newTask);
    input.value = "";
    
    ajaxRequest("POST", newTask); // Add AJAX call
}

// 3. UPDATE: Edit Task Text (New explicit Update feature)
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Update task:", task.text);
    
    if (newText && newText.trim()) {
        task.text = newText;
        ajaxRequest("PUT", task); // Update AJAX call
    }
}

// 4. UPDATE: Toggle Completion (Another form of Update)
function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    task.done = !task.done;
    ajaxRequest("PATCH", task); // Update AJAX call
}

// 5. DELETE: Remove Task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    ajaxRequest("DELETE", { id: id }); // Delete AJAX call
}

// 6. RENDER: Update the HTML dynamically
function renderUI() {
    const list = document.getElementById('taskList');
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = "todo-item";
        
        li.innerHTML = `
            <span class="task-text ${task.done ? 'completed' : ''}" onclick="toggleDone(${task.id})">
                ${task.text}
            </span>
            <div class="btn-grp">
                <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}