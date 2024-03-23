import React, { useEffect, useState } from "react";

//first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ tasks, setTasks ] = useState([]);

	async function fetchToDos() {

		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/truitt', { method: "GET"})
		const data = await response.json()
		setTasks(data)
			console.log(data);
		}

	useEffect(() => {
		fetchToDos();
	}, [])

// function to save tasks
function saveTasks(e) {
		if (e.key=="Enter") {
			const newTasks = ([...tasks, {label: inputValue, done: false}]);
			fetch("https://playground.4geeks.com/apis/fake/todos/user/truitt", {
				method: "PUT",
				body: JSON.stringify(newTasks),
				headers: {
				"Content-Type": "application/json",
				},
		  });

			setTasks(newTasks);
			setInputValue("")
		}
	}

// function to update one deleted task (attempt)
function deleteTask(taskId) {
	const updatedTasks = tasks.filter(task => task.id !== taskId);
	setTasks(updatedTasks);

		fetch('https://playground.4geeks.com/apis/fake/todos/user/truitt', {
			method: "PUT",
			body: JSON.stringify (updatedTasks),
			headers: {
			"Content-Type": "application/json"
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error ('HTTP error! status: ${response.status}');
			}
			console.log("Task deleted successfully from server!");
		})
		.catch(error => {
			console.log("Error deleting task:", error);
		});
}

// function to update and delete all tasks
function deleteAllTasks() {
	const removeAllTasks = ([...tasks, {label: inputValue, done:false}]);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/truitt'), {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		};
	}

// the to-do list
	return (
		<div className="container">
			<h1>Today's Agenda:</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}

					onKeyPress = {(e) => saveTasks(e)}

					placeholder="task" />
				</li>
					{tasks.map((item) => (
						<li>
							{item.label}{" "}
							<i class="fas fa-trash-alt"
							onClick={() => deleteTask(item.id)}
							></i>
						</li>
					))}
				</ul>
			<div>{tasks.length}</div>
		</div>)
}

export default Home;
