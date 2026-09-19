import Child from "./Child"

const Parent = () => {
    return (
        <div className="bg-gray-700 p-4 rounded-2xl">
            <h2 className="text-3xl">Parent Component</h2>
            <Child />
        </div>
    )
}

export default Parent