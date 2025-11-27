import { useEffect, useState } from "react";
import BDChart from "./BDChart";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const [project, setProject] = useState({})
    const [task, setTask] = useState([])
    const [showModal, setShowModal] = useState(false);
    const { id }= useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/projects/${id}`)
        .then(res => res.json())
        .then(data => setProject(data))
        .catch(err => console.error(err));
        }, []
    );

    useEffect(() => {
        fetch(`http://localhost:3001/tasks`)
        .then(res => res.json())
        .then(data => setTask(data))
        .catch(err => console.error(err));
        }, []
    );

	const handleStatusChange = async (taskId, status) => {
		await fetch(`http://localhost:3001/tasks/${taskId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				status: status
			})
		});
		setTask(task.map(val => val.id === taskId ? {...val, status} : val))
		}
    return (
        <>
            <div className="container mt-4">
                <h1>ダッシュボード</h1>
                <hr />
                <BDChart
                startDate={project.startDate}
                endDate={project.endDate}
                totalPoints={100}
                remainingPoints={[100, 70, 90, 40, 0]}
								task = {task}
                />
            </div>
            <hr />
						<ul className="list-group border-0">
							{task.map(task => (
								<li
									key={task.id}
									className="list-group-item border-0 p-0 mb-3"
									style={{ listStyle: "none" }}
								>
									<div
										className="card shadow-sm"
										style={{
											borderRadius: "12px",
											cursor: "pointer",
											transition: "transform 0.1s ease"
										}}
										onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
										onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
										onClick={() => navigate(`/tasks/${task.id}`)} // ← タップで編集画面へ
									>
										<div className="card-body d-flex justify-content-between align-items-center">

											{/* 左側（タスク情報） */}
											<div style={{ flex: 1 }}>
												<h5 className="mb-2" style={{ fontWeight: "700" }}>
													{task.taskName}
												</h5>

												<div className="text-muted small">
													想定工数: {task.points} pt<br />
													状態:{" "}
													<span className="fw-bold">
														{task.status}
													</span>
												</div>
											</div>

											{/* 右側（ステータス変更プルダウン） */}
											<div>
												<select
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
			onClick={() => setShowModal(true)}
			aria-label="新しいプロジェクトを追加">
				{/* Bootstrap Icons や シンプルな + を使用 */}
				<span aria-hidden="true">+</span>
			</button>
        </>
    )
}

export default ProjectDetails;