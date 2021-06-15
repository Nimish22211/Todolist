import React from 'react'
import './Todo.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { List, ListItem } from '@material-ui/core'
function Todo(props) {
    return (
        <div className="todo-container">
            <List className="todo">
                <div className="todoItem">
                    <ListItem >
                        <details>
                            <summary id="summary">{props.title} </summary>
                            {props.desc}
                        </details>
                    </ListItem>
                    <DeleteForeverIcon id="deleteIcon" onClick={() => { props.onDelete(props.id) }} />
                </div>
            </List>
        </div>
    )
}

export default Todo
