import { LucideCheckCircle, LucidePlusCircle, LucideX } from 'lucide-react';
import { useState } from 'react';
import DsButton from '../../components/design-system/DsButton';
import Loading from '../../components/global/Loading';
import TodoItem from './components/TodoItem';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodosApi, addTodoApi, updateTodoApi } from '../../service/todo-service';
import toast from 'react-hot-toast';

const Todos = () => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        isCompleted: false
    });
    const [showError, setShowError] = useState(false);

    const queryClient = useQueryClient();

    const { data: todos, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodosApi
    })

    const addMutation = useMutation({
        mutationFn: (payload: { title: string; completed: boolean }) => addTodoApi(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            alert('Todo added successfully');
            setFormData({ title: '', isCompleted: false });
        },
        onError: (error) => console.error(error)
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: { title: string; completed: boolean } }) =>
            updateTodoApi(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            toast.success('todo editing successfully')
            cancelEdit();
        },
        onError: (error) => console.error(error)
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setShowError(false);
        if (!formData.title) {
            setShowError(true);
            return
        }

        addMutation.mutate({
            title: formData.title,
            completed: formData.isCompleted
        })
    } // handleSubmit


    const prepareToEdit = (id: number) => {
        const editingItem = todos?.find((x: any) => x.id === id);
        if (!editingItem) return;

        setEditingId(id);
        setFormData({
            title: editingItem.title,
            isCompleted: editingItem.completed,
        })
    }

    const cancelEdit = () => {
        setFormData({
            title: '',
            isCompleted: false
        });
        setEditingId(null);
    }


    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        setShowError(false);
        if (!formData.title) {
            setShowError(true);
            return
        }

        if (editingId === null) return;

        updateMutation.mutate({
            id: editingId,
            payload: {
                title: formData.title,
                completed: formData.isCompleted
            }
        })
    } // handleUpdate


    const afterDelete = () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    }


    return (
        <section className='grid grid-cols-3 gap-12 max-w-2/3 mx-auto'>

            <div className="col-span-1">
                <h1 className='text-2xl font-bold mb-4'>Create Todo</h1>

                <form onSubmit={(e) => editingId ? handleUpdate(e) : handleSubmit(e)}>
                    <div className='mb-2'>
                        <label className='text-lg mb-1 flex justify-between items-baseline'>
                            Title
                            {
                                showError &&
                                <span className='text-xs text-red-500'>Title is Required</span>
                            }
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Todo Title'
                            className='w-full border border-gray-400 bg-gray-800 px-3 py-2 text-lg rounded-md'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-lg flex items-center gap-1.5 cursor-pointer'>
                            <input
                                type="checkbox"
                                className='w-4 h-4'
                                checked={formData.isCompleted}
                                onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
                            />
                            Completed
                        </label>
                    </div>
                    {
                        editingId ?
                            <div className='flex gap-2'>
                                <DsButton type="submit" color='green' size='lg' icon={<LucideCheckCircle size={22} />} text="Save" isLoading={updateMutation.isPending} />
                                <DsButton type="button" color='gray' size='lg' icon={<LucideX size={22} />} text="Cancel" onClick={cancelEdit} />
                            </div>
                            :
                            <DsButton type="submit" color='blue' size='lg' icon={<LucidePlusCircle size={22} />} text="Add" isLoading={addMutation.isPending} />
                    }
                </form>

            </div>

            <div className='col-span-2'>
                <h1 className='text-2xl font-bold mb-4'>Todos List</h1>
                {
                    isLoading ?
                        <Loading />
                        :
                        <ul className='divide-y divide-gray-500 border border-gray-300 rounded-lg overflow-hidden'>
                            {
                                todos?.map((item: any) => {
                                    return (
                                        <TodoItem key={item.id} todo={item} prepareToEdit={prepareToEdit} afterDelete={afterDelete} />
                                    )
                                })
                            }
                        </ul>
                }
            </div>

        </section>
    )
}

export default Todos