import React, { useState } from "react";

//include images into your bundle


//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ tasks, setTasks ] = useState([]);

	function saveTasks (e) {
		if (e.key=="Enter") {
			setTasks([...tasks, inputValue])
			setInputValue("")
		}
	}

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
					{tasks.map((item, index) => (
						<li>
							{item}{" "}
							<i class="fas fa-trash-alt"
							onClick={() =>
								setTasks(
									tasks.filter((t, currentIndex) => index != currentIndex)
								)}
							></i>
						</li>
					))}
				</ul>
			<div>{tasks.length}</div>
		</div>)
}
export default Home;
