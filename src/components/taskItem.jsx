import { useState } from "react";

export function TaskItem({ task, topicId, onToggle, onDelete, onRename, onAddSubtask }) {
  const [showInput, setShowInput] = useState(false);
  const [newText, setNewText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="task-item-container" style={{ marginLeft: '20px', marginTop: '5px' }}>
      <div className="task-row">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => onToggle(topicId, task.id)} 
        />
        
        {isEditing ? (
          <input 
            autoFocus 
            className="rename-input"
            value={task.text} 
            onChange={(e) => onRename(topicId, task.id, e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          />
        ) : (
          <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
            {task.text}
          </span>
        )}

        <div className="task-actions">
          <button onClick={() => setShowInput(!showInput)} className="add-btn">+</button>
          <button className="del-btn" onClick={() => onDelete(topicId, task.id)}>×</button>
        </div>
      </div>

      {showInput && (
        <div className="mini-add-form">
          <input 
            autoFocus
            value={newText} 
            onChange={(e) => setNewText(e.target.value)} 
            placeholder="Dodaj podpunkt..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddSubtask(topicId, task.id, newText);
                setNewText("");
                setShowInput(false);
              }
            }}
          />
          <button onClick={() => { onAddSubtask(topicId, task.id, newText); setNewText(""); setShowInput(false); }}>
            Dodaj
          </button>
        </div>
      )}

      {/* REKURENCJA: Zadanie renderuje swoje własne subtaski tym samym komponentem */}
      {task.subtasks && task.subtasks.map(sub => (
        <TaskItem 
          key={sub.id} 
          task={sub} 
          topicId={topicId}
          onToggle={onToggle}
          onDelete={onDelete}
          onRename={onRename}
          onAddSubtask={onAddSubtask}
        />
      ))}
    </div>
  );
}