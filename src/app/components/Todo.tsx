"use client";

import React, { useEffect, useRef, useState } from "react";
import { Task } from "@/pages/types";
import { DeleteTodo, editTodo } from "@/pages/api";

interface TodoProps {
  todo: Task;
}

const handleDelete = async () => {
  await DeleteTodo(todo.id);
};

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIdEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);
  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);
  const handleEdit = async () => {
    setIdEditing(true);
  };
  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIdEditing(false);
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <span>{todo.text}</span>
      )}

      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>
            Edit
          </button>
        )}

        <button className="text-red-500 mr-3" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
