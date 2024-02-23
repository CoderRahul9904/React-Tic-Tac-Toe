import { useState } from "react"
export default function Player({ Name, Symbol, isActive}) {
    const [CurrName,ChangedName]=useState(Name)
    const [withEdit,Save]=useState(false);
    function handleClickToName(){
        Save(clicked => !clicked)
    }
    function handleChange(event){
        ChangedName(event.target.value)
    }
    let playerName=<span className="player-name">{CurrName}</span>
    if(withEdit){
        playerName=<input type="text" required value={CurrName} onChange={handleChange}></input>
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{Symbol}</span>
            </span>
            <button onClick={handleClickToName}>{withEdit ? 'Save' : 'Edit'}</button>
        </li>
    )
}