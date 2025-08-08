import { Pencil, Trash, BookCheck, CircleCheck } from "lucide-react";

export const TaskCard = ({ id, title, label, completed, onDelete, onComplete, onEdit }) => {
  
  

  return (
    <div className=" flex flex-col justify-between bg-amber-200 shadow-2xl px-4">
      <div className="flex py-5">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex justify-between w-full">
            <h3 className="text-2xl text-gray-700 font-semibold max-w-50 h-15">{title}</h3>
            {completed && (
              <CircleCheck size={24} color="green" />
            )}
          </div>
          <p className="h-40 text-md text-gray-800 overflow-scroll scrollbar-hide">{label}</p>
        </div>
      </div>
      <div>
      </div>
      <div className="w-full flex justify-end pb-2 pe-2">
        <button 
        className="hover:bg-gray-300 p-2 rounded-4xl cursor-pointer"
        onClick={() => onComplete(id)}
        >
          <BookCheck color="black" />
        </button>
        <button 
          className="hover:bg-gray-300 p-2 rounded-4xl cursor-pointer"
          onClick={onEdit}
          >
            <Pencil color="black"/>
        </button>
        <button 
          className="hover:bg-gray-300 p-2 rounded-4xl cursor-pointer"
          onClick={() => onDelete(id)}
        >
          <Trash color="black"/>
        </button>
    </div>
    </div>
  )
}