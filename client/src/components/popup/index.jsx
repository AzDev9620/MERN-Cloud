import React, { useState } from 'react'
import InputsCustoms from './../inputs';
import { setPopupDisplay } from './../../reducers/fileReducer';
import { useSelector, useDispatch } from 'react-redux';
import { createDir } from '../../actions/file';
import './style.scss'
export default function Popup() {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }

    return (
        <div className="popup" style={{ display: popupDisplay }}>
            <div className="popup__content" onClick={(event) => event.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                <InputsCustoms type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName} />
                <button className="popup__create" onClick={() => createHandler()}>Создать</button>
            </div>
        </div>
    )
}
