import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import { Task } from './components/Task'

import styles from './App.module.css'
import emptyImg from './assets/empty.png'
import './global.css'

interface Tasks {
  id: string;
  title: string;
  done: boolean
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [newTask, setNewTask] = useState('')

  const numTasksCompleted = tasks.reduce((acc, task) => {
    if (task.done) {
      acc += 1
    }

    return acc
  }, 0)

  function handleNewTask(event: FormEvent) {
    event.preventDefault()

    const task = {
      id: uuid(),
      title: newTask,
      done: false
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  function onDeleteTask(id: string) {
    const isTaskExists = tasks.findIndex(task => (task.id === id))

    if (isTaskExists != -1) {
      const allTasks = [...tasks]
      
      allTasks.splice(isTaskExists, 1)
      
      setTasks([...allTasks])
    }
  }

  function onCompletedTask(id: string) {
    const isTaskExists = tasks.find(task => (task.id === id))

    if (isTaskExists) {
      const allTasks = [...tasks]

      allTasks.forEach(values => {
        if (values.id == id) {
          values.done = !values.done
        }
      })

      setTasks([...allTasks])
    }
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.newTask}>
          <form onSubmit={handleNewTask}>
            <input 
              type="text" 
              placeholder="Adicione uma nova tarefa"
              value={newTask}
              onChange={({ target }) => setNewTask(target.value)}
            />
            <button type='submit'>
              <span>Criar</span>
              <PlusCircle />
            </button>
          </form>
        </div>

        <div className={styles.info}>
          <div className={styles.infoCreated}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>

          <div className={styles.infoDone}>
            <strong>Concluídas</strong>
            <span>{Boolean(numTasksCompleted) ? `${numTasksCompleted} de ${tasks.length}` : '0'}</span>
          </div>
        </div>

        {Boolean(tasks.length) ? (
          <ul>
            {tasks.map(task => (<Task key={task.id} {...task} onDeletedTask={onDeleteTask} onCompletedTask={onCompletedTask} />))}
          </ul>
        ) : (
        <div className={styles.listTasks}>
          <div className={styles.contentEmpty}>
            <img src={emptyImg} />
            <p><b>Você ainda não tem tarefas cadastradas</b></p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div> 
        </div>
        )}

      </main>
    </>
  )
}

export default App
