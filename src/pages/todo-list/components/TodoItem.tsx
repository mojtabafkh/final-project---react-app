import { LucideCheckCircle, LucidePencil, LucideTrash, LucideUndo } from "lucide-react";
import { useState } from "react";
import DsButton from "../../../components/design-system/DsButton";
import { deleteTodoApi, updateTodoApi } from "../../../service/todo-service";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
}

type Props = {
    todo: Todo;
    prepareToEdit: (id: number) => void;
    afterDelete: () => void;
}

const TodoItem = ({ todo, prepareToEdit, afterDelete }: Props) => {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const handleDelete = async () => {

        if (!window.confirm('Are you sure to delete this item?')) {
            return
        }

        setDeleteLoading(true);

        try {
            await deleteTodoApi(todo.id);
            afterDelete();
            alert('Todo deleted successfully');
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteLoading(false);
        }

    } // handleDelete


    const handleChangeStatus = async (newStatus: boolean) => {

        setStatusLoading(true);

        try {
            await updateTodoApi(todo.id, {
                title: todo.title,
                completed: newStatus
            });
            setIsCompleted(newStatus);
        } catch (error) {
            console.error(error);
        } finally {
            setStatusLoading(false);
        }

    } // handleChangeStatus

    return (
        <li className='flex justify-between px-4 py-2 transition-all hover:bg-gray-800'>
            <p className={`text-base ${isCompleted ? 'line-through opacity-50' : ''}`}>{todo.title}</p>
            <div className='flex gap-1'>
                {
                    isCompleted ?
                        <DsButton
                            color="gray"
                            size='sm'
                            icon={<LucideUndo />}
                            justIcon
                            tooltip='Uncomplete'
                            isLoading={statusLoading}
                            onClick={() => handleChangeStatus(false)}
                        />
                        :
                        <DsButton
                            color="green"
                            size='sm'
                            icon={<LucideCheckCircle />}
                            justIcon
                            tooltip='Completed'
                            isLoading={statusLoading}
                            onClick={() => handleChangeStatus(true)}
                        />
                }
                <DsButton
                    color="blue"
                    size='sm'
                    icon={<LucidePencil />}
                    justIcon
                    onClick={() => prepareToEdit(todo.id)}
                    tooltip='Edit'
                />
                <DsButton
                    color="red"
                    size='sm'
                    icon={<LucideTrash />}
                    justIcon
                    isLoading={deleteLoading}
                    onClick={handleDelete}
                    tooltip='Delete'
                />
            </div>
        </li>
    )
}

export default TodoItem