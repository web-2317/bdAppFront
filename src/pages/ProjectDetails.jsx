import { useEffect, useState } from "react";
import BDChart from "./BDChart";
import { useParams } from "react-router-dom";
import CreateTaskModal from "./CreateTaskModal";
import EditProjectModal from "./EditProjectModal";
import EditTaskModal from "./EditTaskModal";

export const getTodayDate = () => {
	const today = new Date();
	return today.toISOString().slice(0, 10);
};

const ProjectDetails = () => {
    const [project, setProject] = useState({})
    const [task, setTask] = useState([])
    const [showModalForTask, setshowModalForTask] = useState(false);
	const [showModalForProject, setShowModalForProject] = useState(false);
	const [showModalForEditTask, setShowModalForEditTask] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);
    const { id }= useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/projects/${id}`)
        .then(res => res.json())
        .then(data => setProject(data))
        .catch(err => console.error(err));
        }, []
    );


    useEffect(() => {
        fetch(`http://localhost:3001/tasksToeic`)
        .then(res => res.json())
        .then(data => setTask(data))
        .catch(err => console.error(err));
        }, []
    );

	const addTask = async (newTask) => {
		const res = await fetch("http://localhost:3001/tasksToeic", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTask)
		});

		const created = await res.json();
		console.log("created", created);
		setTask([...task, created]);
		setshowModalForTask(false);
		
	};

	const deleteTask = async (id) => {
		await fetch(`http://localhost:3001/tasksToeic/${id}`, {method: "DELETE"});

		setTask(task.filter(p => p.id !== id));
	};

	const editProject = async (editedProject) => {
		await fetch(`http://localhost:3001/projects/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(editedProject)
			});

		setProject(editedProject);
	};

	const handleEditingTask = (taskId) => {
		setEditingTaskId(taskId);
		setShowModalForEditTask(true);
	}
	const editTask = async (taskId, editedTask) => {
		await fetch(`http://localhost:3001/tasksToeic/${taskId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(editedTask)
			});

		setTask(task.map(t => t.id === taskId ? {...t, ...editedTask} : t));

		setShowModalForEditTask(false);
	}

	const handleStatusChange = async (taskId, newStatus) => {
		const payload = { status: newStatus};
		let newDoneDate = null;

		if (newStatus === 'DONE') {
			newDoneDate = getTodayDate();
			payload.doneDate = newDoneDate;
		} else {
			payload.doneDate = null;
		}

		await fetch(`http://localhost:3001/tasksToeic/${taskId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});

		setTask(task.map(val => val.id === taskId
		 ? {...val, status: newStatus, doneDate: newDoneDate} : val
		 ));
		};

	console.log(task);
    return (
        <>
            <div className="container mt-4">
                <h1>ダッシュボード</h1>
				<button
				onClick={() => setShowModalForProject(true)}
				>
					プロジェクトを編集
				</button>
                <hr />
				{!project.startDate || !project.endDate ? (
					<p>Loading...</p>
				) : (
                <BDChart
                startDate={project.startDate}
                endDate={project.endDate}
				task = {task}
                />
			)}
            </div>
            <hr />
						<ul className="list-group border-0">
							{task.map(task => (
								<li
									key={task.id}
									className="list-group-item border-0 p-0 mb-3"
									style={{ listStyle: "none" }}
								>
								    <div>
									<div
										className="card shadow-sm"
										style={{
											borderRadius: "12px",
											cursor: "pointer",
											transition: "transform 0.1s ease"
										}}
										onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
										onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
										//onClick={() => navigate(`/tasks/${task.id}`)} // ← タップで編集画面へ
									>
											<div className="card-body d-flex justify-content-between align-items-center">

												{/* 左側（タスク情報） */}
												<div style={{ flex: 1 }}>

												<div
												role="button"
												tabIndex="0"
												onClick={() => handleEditingTask(task.id)}
												style={{
													border: "none",
													background: "none",
													padding: "0",
													width: "100%",
													textAlign: "left",
													cursor: "pointer",
												}}
												onMouseEnter={e => (e.currentTarget.children[0].style.transform = "scale(1.01)")}
												onMouseLeave={e => (e.currentTarget.children[0].style.transform = "scale(1)")}
												>
													<h5 className="mb-2" style={{ fontWeight: "700" }}>
														{task.taskName}
													</h5>
												</div>
													<div className="text-muted small">
														想定工数: {task.points} pt<br />
														状態:{" "}
														<span className="fw-bold">
															{task.status}
														</span>
													</div>
												</div>
												<button className="btn btn-sm btn-danger float-end" onClick={() => deleteTask(task.id)}>
												削除
												</button>

												{/* 右側（ステータス変更プルダウン） */}
												<div>
													<select name="statusPullDown"
														className="form-select"
														value={task.status}
														onChange={(e) => handleStatusChange(task.id, e.target.value)}
														style={{ width: "130px" }}
													>
														<option value="TODO">TODO</option>
														<option value="ONGOING">ONGOING</option>
														<option value="DONE">DONE</option>
													</select>
												</div>

											</div>
										</div>
									</div>
								</li>
							))}
						</ul>


            <button 
			className="btn btn-primary rounded-circle shadow-lg" 
			style={{
			position: 'fixed', // 画面に対して位置を固定
			bottom: '30px',    // 下からの距離
			right: '30px',     // 右からの距離
			width: '48px',     // 幅 (丸くするために高さと合わせる)
			height: '48px',    // 高さ
			fontSize: '24px',  // アイコンのサイズ
			padding: '0'       // パディングをゼロにして、コンテンツを中央に
			}}
			onClick={() => setshowModalForTask(true)}
			aria-label="新しいプロジェクトを追加">
				{/* Bootstrap Icons や シンプルな + を使用 */}
				<span aria-hidden="true">+</span>
			</button>

			<CreateTaskModal 
			show={showModalForTask} 
			onClose={() => setshowModalForTask(false)} 
			onSave={addTask}
			/>

			<EditProjectModal 
			show={showModalForProject} 
			onClose={() => setShowModalForProject(false)} 
			onSave={editProject}
			projectName={project.projectName}
			startDate={project.startDate}
			endDate={project.endDate}
			/>

			<EditTaskModal 
			show={showModalForEditTask}
			onClose={() => setShowModalForEditTask(false)}
			onSave={editTask}
			task={task}
			taskId={editingTaskId}
			/>

        </>

    )
}

export default ProjectDetails;