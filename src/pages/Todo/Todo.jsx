import { useState, useEffect, useRef } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fetchTodos } from "../../data/todos";

import "./Todo.css";

function Todo() {
    //todosRaw -> filter -> todos -> display
    //read todosRaw
    const [todosRaw, setTodosRaw] = useState([])
    //filter (bypass)
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemPerPages, setItemPerPages] = useState(10)
    //todos
    const [todos, setTodos] = useState([])
    //display
    const [numPages, setNumPages] = useState(0)
    const [curPage, setCurPage] = useState(1)

    useEffect (() => {
        console.log(`itemPerPages: ${itemPerPages}`)
        setNumPages(Math.ceil(todos.length / itemPerPages))
        setCurPage(1)
    },[itemPerPages, todos.length])

    useEffect(() => {
        console.log(`onlyWaiting: ${onlyWaiting}`)
    }, [onlyWaiting])

    useEffect(() => {
        setTodosRaw(fetchTodos())
     }, [])//Load

     useEffect(() => {
        if (onlyWaiting){
            //display only "waiting" (completed = false)
            setTodos(todosRaw.filter( todo =>  !todo.completed ))
        }
        else{
            //display all
            setTodos(todosRaw)
        }
     }, [todosRaw, onlyWaiting])

     // event handlers
     function deleteClick(id){
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id  ))
     }
     function waitingClick(id){
         const todoSelected = todosRaw.find((todo) => {
            return todo.id === id
        })

        todoSelected.completed = true

         //doesn't work, state is not changed
        setTodosRaw( [...todosRaw] )  //OK 
     }

     function addClick(id, title){
        const newTodo = {
            userId : 1,
            id: id,
            title: title,
            completed: false
        }

        setTodosRaw([...todosRaw, newTodo])
     }

       //modal handlers

        const [show, setShow] = useState(false);

        const idRef = useRef();
        const titleRef = useRef(); 

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    return ( 
        <div className="todo-container">
            {/* modal */}
            <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg">&nbsp;Add Todo</span>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body><Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
              
                type="number"
                autoFocus
                value={Number(todosRaw.reduce((prev, todo) => {
                    return todo.id > prev ? todo.id : prev
                }, 0 )) + 1  }
                disabled
                ref={idRef}
              />
            </Form.Group>
            </Form>

            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                ref={titleRef}
              />
            </Form.Group>
            </Form>

            </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>

            <span className="bi bi-x-lg">&nbsp;Cancel</span>

          </Button>
          <Button variant="primary" onClick={() => {
            const id = idRef.current.value
            const title = titleRef.current.value.trim()
            addClick(id, title)
            if (title === ''){
                alert('Title cannot be empty')
                titleRef.current.value = ''
                titleRef.current.focus()
            } else{
                addClick(id, title)
                handleClose()
            }
        
            }}>

            <span className="bi bi-plus-lg"> &nbsp;Add</span>

          </Button>
        </Modal.Footer>

      </Modal>
        {/* filter */}
        <div className="todo-filter-container">
        <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" style={{marginTop: "10px"}}  onClick={ (e) => {setOnlyWaiting(e.target.checked)}} />
  <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Show only&nbsp;
        <button className="btn btn-warning">waiting&nbsp; <span className="bi bi-clock"></span></button></label>
        </div>
        <select className="form-select" aria-label="Default select example" defaultValue={10} style={{width: "200px"}} onChange={ (e) => {setItemPerPages(e.target.value)}}>    
        <option value={5}>5 items per pages</option>
        <option value={10}>10 items per pages</option>
        <option value={50}>50 items per pages</option>
        <option value={100}>100 items per pages</option>
        </select>
        </div>
        {/* table */}
        <table className="table table-striped">
            <thead className="table-dark">
            <tr>
            <th style={{width: '10%'}}>ID</th>
            <th>Title</th>
            <th style={{textAlign: 'right', width: '20%'}}>Completed&nbsp;
                <button className="btn btn-primary">
                    <span className="bi bi-plus-lg" onClick={() => {handleShow()}}></span>
                </button>
            </th>
            </tr>
            </thead>
            <tbody>
                {   
                    //item (js*) => (0,....4),(5,....9)
                    //min = (curPage - 1) * itemPerPages
                    //max = curPage * itemPerPages
                    todos.filter((todo, index) => { 
                        const min = (curPage - 1) * itemPerPages
                        const max = curPage * itemPerPages-1
                        return index >= min && index <= max
                    })
                    .map((todo) => {
                        return(
                <tr key={todo.id}>
                    <td><span className="badge bg-secondary" style={{width: '3rem'}}>{todo.id}</span></td>
                    <td style={{textAlign: 'left'}}>{todo.title}</td>
                    <td style={{textAlign: 'right'}}>
                    <button className={'badge' + (todo.completed ? ' bg-success':' bg-warning')} onClick={() => {waitingClick(todo.id)}} >
                        {todo.completed ?'done':'waiting'}&nbsp;
                        <span className={'bi' + (todo.completed ? ' bi-check':' bi-clock')}></span>
                        </button>
                        &nbsp;
                    <button className="btn btn-danger" onClick={() => {
                        deleteClick(todo.id)
                    }}><span className="bi bi-trash3"></span></button>
                    </td>
                </tr>
                        )
                    })}
            </tbody>
        </table>

        {/* pages */}
        <div>
                    <button className="btn btn-outline-primary todo-spacing" onClick={() => {setCurPage(1)}} disabled={curPage <= 1}>Frist</button>
                    <button className="btn btn-outline-primary todo-spacing" onClick={() => {curPage > 1 && setCurPage(curPage - 1)} } disabled={curPage <= 1}>Previous</button>
                    <span className="todo-spacing">{curPage}&nbsp;/&nbsp;{numPages}</span>
                    <button className="btn btn-outline-primary todo-spacing" onClick={() => {curPage < numPages &&  setCurPage(curPage + 1)}} disabled={curPage >= numPages}>Next</button>
                    <button className="btn btn-outline-primary todo-spacing" onClick={() => {setCurPage(numPages)}} disabled={curPage >= numPages}>Last</button>

        </div>

        </div>
     );
}

export default Todo;