import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideUploader } from './../../reducers/uploadReducer';
import UploadFile from './UploadFile';
import './style.scss'
export default function Uploader() {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    return (isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file} />
            )}
        </div>
    );
}
