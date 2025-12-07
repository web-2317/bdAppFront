import { useState, useEffect } from 'react';
import { getTodayDate } from './ProjectDetails';

const CreateTaskModal = ({ show, onClose, onSave }) => {

    const [formData, setFormData] = useState({
        taskName: "",
        status: "TODO",
        points: parseInt(""),
        createDate: getTodayDate(),
        doneDate: null
    });
    
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
                                     onChange={(e) => {
                                        setFormData({...formData, taskaName: e.target.value })
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
                                        onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({...formData, points: value === "" ? 0 : Number(value) })
                                     }}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    閉じる
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => onSave(formData)}>
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

export default CreateTaskModal;