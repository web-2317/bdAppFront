import { useState, useEffect } from 'react';

const EditTaskModal = ({ show, onClose, onSave, task, taskId }) => {

    const editingTask = task.find(t => t.id === taskId);

    const [formData, setFormData] = useState({
        taskName: "",
        points: 0,
        createDate: "",
        doneDate: ""
    });
    
    useEffect(() => {
        if(editingTask) {
            setFormData({
                taskName: editingTask.taskName || "",
                points: editingTask.points || 0,
                createDate: editingTask.createDate || "",
                doneDate: editingTask.doneDate || ""               
            })
        }
    }, [editingTask])
    
    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: "rgba(0, 0, 0, 0, 5)" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">モーダルタイトル</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
            
                        </div>
                        <form>
                            <div className="modal-body mb-3">
                                <div className="mb2">
                                    <label htmlFor="taskName" className="form-label">プロジェクト名</label>
                                    <input
                                     type="text" 
                                     className="form-control" 
                                     placeholder="タスク名" 
                                     name="taskName"
                                     id="taskName"
                                     value={formData.taskName}
                                     onChange={(e) => {
                                        setFormData({...formData, taskName: e.target.value })
                                     }}
                                     ></input>
                                </div>

                                <div className="row mb2">
                                    {/* なんかここら辺レイアウトがうまくいってないけど結果的にいい感じになったからそのままにしとく
                                    リファクタリングするときに必要なら直す*/}
                                    <div className="col">
                                        <label htmlFor="points" className="form-label">工数</label>
                                        <input 
                                        type="number" 
                                        className="form-control" 
                                        placeholder="points" 
                                        name="points"
                                        id="points"
                                        value={formData.points}
                                        onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({...formData, points: value === "" ? 0 : Number(value) })
                                     }}
                                        ></input>
                                    </div>
                                    <div className="mb2">
                                        <label htmlFor="createDate" className="form-label">作成日</label>
                                        <input
                                        type="date" 
                                        className="form-control" 
                                        placeholder="作成日" 
                                        name="createDate"
                                        id="createDate"
                                        value={formData.createDate}
                                        onChange={(e) => {
                                            setFormData({...formData, createDate: e.target.value })
                                        }}
                                        ></input>
                                    </div>   
                                    <div className="mb2">
                                        <label htmlFor="doneDate" className="form-label">完了日</label>
                                        <input
                                        type="date" 
                                        className="form-control" 
                                        placeholder="完了日" 
                                        name="doneDate"
                                        id="doneDate"
                                        value={formData.doneDate}
                                        onChange={(e) => {
                                            setFormData({...formData, doneDate: e.target.value })
                                        }}
                                        ></input>
                                    </div>   
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    閉じる
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => onSave(taskId, formData)}>
                                    保存する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>                
            </div>
        </>
    )
}

export default EditTaskModal;