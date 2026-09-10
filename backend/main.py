from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
from models import Task
from schemas import TaskCreate, TaskUpdate, TaskResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(title="To-Do List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tasks", response_model=list[TaskResponse])
def list_tasks(
    completed: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Task)
    if completed is not None:
        query = query.filter(Task.completed == completed)
    return query.order_by(Task.id.desc()).all()


@app.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    if task.title is not None:
        db_task.title = task.title
    if task.completed is not None:
        db_task.completed = task.completed
    db.commit()
    db.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    db.delete(db_task)
    db.commit()
