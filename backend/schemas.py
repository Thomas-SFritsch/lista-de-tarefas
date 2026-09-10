from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Título da tarefa (não pode ser vazio)")


class TaskUpdate(BaseModel):
    title: str | None = Field(None, min_length=1)
    completed: bool | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool

    model_config = {"from_attributes": True}
