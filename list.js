const user_list = document.getElementById("user_list");

function judgeContinue() {
    let judge = prompt(`Are you sure you want to delete all users? Y/N`);
    if (judge === null || !(judge.toLowerCase() === "y")) return false;
    return true;
}

async function deleteSingle() {
    try {
        if (!judgeContinue()) return;
        const response = await axios.delete(`http://localhost:8080/api/clearsingle?id=${this.getAttribute("data-id")}`);
        if (response.status === 201) {
            alert("Delete successfully");
            getUserList();
        }
    } catch (err) {
        console.error(err);
    }
}

async function getUserList() {
    try {
        user_list.textContent = "";
        const response = await axios.get("http://localhost:8080/api/users");
        const users = response.data;
        console.log("users", users);
        if (users.length === 0) {
            alert("no users found, please add a new user");
            return;
        }
        for (value of users) {
            const li = document.createElement("li");
            li.innerHTML = `
            <span>${value.name}</span>
            <span>${value.age}</span>
            <button class="delete_btn" data-id="${value.id}">Delete</button>`;
            user_list.appendChild(li);
        }
        user_list.querySelectorAll(".delete_btn").forEach(item => item.addEventListener("click", deleteSingle));
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function addUser() {
    try {
        if (document.getElementById("name").value === "" || document.getElementById("age").value === "") {
            alert("please fill in all fields");
            return;
        }
        const body = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
        };
        const response = await axios.post("http://localhost:8080/api/user", body);
        const users = response.data.data;
        alert("user: " + users.name + " age: " + users.age + " has been added");
        getUserList();
        console.log("users", users);
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function clear_list() {
    try {
        if (!judgeContinue()) return;
        const response = await axios.delete("http://localhost:8080/api/clear");
        const user = response.data;
        alert(user);
        user_list.textContent = "";
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

document.getElementById("add_user").addEventListener("click", addUser);
document.getElementById("get_list").addEventListener("click", getUserList);
document.getElementById("clear_list").addEventListener("click", clear_list);
getUserList();
