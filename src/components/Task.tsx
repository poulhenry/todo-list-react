import { Trash } from 'phosphor-react'

import styles from './Task.module.css'

interface taskProps {
  id: string;
  title: string;
  done: boolean;
  onDeletedTask: (id: string) => void
  onCompletedTask: (id: string) => void
}

export function Task({ id, title, done, onDeletedTask, onCompletedTask }: taskProps) {

  function handleDeleteTask() {
    onDeletedTask(id)
  }

  function handleTaskCompleted() {
    onCompletedTask(id)
  }

  return (
    <li className={styles.task}>
      <div>
        <input type="checkbox" checked={done} onChange={handleTaskCompleted} />
        <p className={done ? styles.taskChecked : ''}>{title}</p>
      </div>
      <button onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </li>
  )
}