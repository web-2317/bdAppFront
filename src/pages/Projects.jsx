import { useState, useEffect } from 'react';
import CreateProjectModal from './CreateProjectModal';
import { Link } from "react-router-dom";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3001/projects")
		.then(res => res.json())
		.then(data => setProjects(data))
		.catch(err => console.error(err));
		}, []
	);

//DBをそのまま反映するじゃなくてあくまでフロントエンドで情報を処理して表示してる
//本番環境ならfetchしたのをsetProjectにいれてproject配列から変えたほうが安全なんだろうけど
//mvpはjson-serverを使ってるしとりあえず動けばいいからこの手法でやる
	const addProject = async (newProject) => {
		const res = await fetch("http://localhost:3001/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newProject)
		});

		const created = await res.json();

		setProjects([...projects, created]);
		setShowModal(false);
		console.log(newProject);
	};

	const deleteProject = async (id) => {
		await fetch(`http://localhost:3001/projects${id}`, {method: "DELETE"});

		setProjects(projects.filter(p => p.id !== id));
	};

	const editProject = async (id) => {
		await fetch(`http://localhost:3001/projects${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				project_name,
				start_date,
				end_date
			})
		});
	}

     return (
		<div className="container mt-4">
			<h1>プロジェクト一覧</h1>
			<hr />
			<ul className="list-group">
				{projects.map(p => (
				<li key={p.id} className="list-group-item d-flex justify-content-between">
					<Link
						to={`/projects/${p.id}`}
						style={{ textDecoration: "none", color: "inherit", flex: 1 }}
					>
					<strong>{p.projectName}</strong><br />
					開始日: {p.startDate}<br />
					終了日: {p.endDate}
					</Link>
					<button className="btn btn-sm btn-danger float-end" onClick={() => deleteProject(p.id)}>
					削除
					</button>
				</li>
				))}
			</ul>

			
			<button 
			className="btn btn-primary rounded-circle shadow-lg" 
			style={{
			position: 'fixed', // 画面に対して位置を固定
			bottom: '30px',    // 下からの距離
			right: '30px',     // 右からの距離
			width: '60px',     // 幅 (丸くするために高さと合わせる)
			height: '60px',    // 高さ
			fontSize: '24px',  // アイコンのサイズ
			padding: '0'       // パディングをゼロにして、コンテンツを中央に
			}}
			onClick={() => setShowModal(true)}
			aria-label="新しいプロジェクトを追加">
				{/* Bootstrap Icons や シンプルな + を使用 */}
				<span aria-hidden="true">+</span>
			</button>

			<CreateProjectModal show={showModal} onClose={ () => setShowModal(false) } onSave={addProject} />
		</div>
  );
};

export default Projects