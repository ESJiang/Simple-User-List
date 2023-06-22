let user_list = document.getElementById("user_list");

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
            <button class="delete_btn">Delete</button>`;
            user_list.appendChild(li);
        }
        user_list.querySelectorAll(".delete_btn").forEach(item =>
            item.addEventListener("click", async e => {
                const name = e.target.closest("li").querySelector("span").textContent;
                console.log(name);
                try {
                    let judge = prompt(`Are you sure you want to delete? Y/N`);
                    if (!(judge.toLowerCase() === "y")) return;
                    const response = await axios.delete(`http://localhost:8080/api/clearsingle?name=${name}`);
                    if (response.status === 201) {
                        alert("Delete successfully");
                        getUserList();
                    }
                } catch (err) {
                    console.error(err);
                }
            })
        );
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

document.getElementById("get_list").addEventListener("click", getUserList);

document.getElementById("add_user").addEventListener("click", async () => {
    try {
        if (document.getElementById("name").value === "" || document.getElementById("age").value === "") {
            alert("please fill in all fields");
            getUserList();
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
        // const p = document.createElement("p");
        // p.textContent = "user: " + users.name + " age: " + users.age + " has been added";
        // user_list.appendChild(p);
        console.log("users", users);
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

document.getElementById("clear_list").addEventListener("click", async () => {
    try {
        let judge = prompt(`Are you sure you want to delete all users? Y/N`);
        if (!(judge.toLowerCase() === "y")) return;
        const response = await axios.delete("http://localhost:8080/api/clear");
        const user = response.data;
        alert(user);
        user_list.textContent = "";
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

getUserList();
