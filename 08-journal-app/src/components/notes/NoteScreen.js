import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-context">
            <NotesAppBar />

            <div className="notes__context">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happend today"
                    className="notes_textarea"
                ></textarea>

                <div className="notes__image">
                    <img src="https://www.nexofin.com/archivos/2017/08/soltodo-el-dia_88d9c462.jpg" alt="Imagen"/>
                </div>
            </div>
        </div>
    )
}
