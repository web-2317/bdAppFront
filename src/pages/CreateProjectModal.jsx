import { useState, useEffect } from 'react';

const CreateProjectModal = ({ show, onClose, onSave }) => {
    if (!show) return null;

    const [formData, setFormData] = useState({
        projectName: "",
        startDate: "",
        endDate: ""
    });
    
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
                                    <label htmlFor="projectName" className="form-label">プロジェクト名</label>
                                    <input
                                     type="text" 
                                     className="form-control" 
                                     placeholder="プロジェクト名" 
                                     name="projectName"
                                     onChange={(e) => {
                                        setFormData({...formData, projectName: e.target.value })
                                     }}
                                     ></input>
                                </div>
                                <div className="row mb2">
                                    {/* なんかここら辺レイアウトがうまくいってないけど結果的にいい感じになったからそのままにしとく
                                    リファクタリングするときに必要なら直す*/}
                                    <div className="col">
                                        <label htmlFor="startDate" className="form-label">開始日</label>
                                        <input 
                                        type="date" 
                                        className="form-control" 
                                        placeholder="開始日" 
                                        name="startDate"
                                        onChange={(e) => {
                                        setFormData({...formData, startDate: e.target.value })
                                     }}
                                        ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="endDate" className="form-label">終了日</label>
                                        <input
                                         type="date" 
                                         className="form-control" 
                                         placeholder="終了日" 
                                         name="endDate"
                                         onChange={(e) => {
                                        setFormData({...formData, endDate: e.target.value })
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

export default CreateProjectModal;