import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";


const Task = ({ project, members, onTaskCreated }) => {


    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        deadline: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            console.log("CREATING TASK...");
            console.log("PROJECT:", project);
            console.log("TASK DATA:", taskData);

            const response = await API.post(
                "/task/create",
                {
                    ...taskData,
                    project: project._id,
                }
            );

            console.log("TASK CREATED:", response.data);

            setTaskData({
                title: "",
                description: "",
                assignedTo: "",
                priority: "Medium",
                deadline: "",
            });

            if (onTaskCreated) {
                onTaskCreated(response.data.task);
            }

        } catch (err) {
            console.log("CREATE TASK ERROR:", err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-5">
                Create Task
            </h2>

            <form onSubmit={handleSubmit}>

                {/* Title */}

                <div className="mb-4">
                    <label className="block mb-1">
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                        className="w-full border rounded-lg p-2"
                    />
                </div>


                {/* Description */}

                <div className="mb-4">
                    <label className="block mb-1">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        className="w-full border rounded-lg p-2"
                    />
                </div>


                {/* Assign Member */}

                <div className="mb-4">
                    <label className="block mb-1">
                        Assign To
                    </label>

                    <select
                        name="assignedTo"
                        value={taskData.assignedTo}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">
                            Select Member
                        </option>

                        {members.map((member) => (
                            <option
                                key={member._id}
                                value={member._id}
                            >
                                {member.username}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Priority */}

                <div className="mb-4">
                    <label className="block mb-1">
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>
                    </select>
                </div>


                {/* Deadline */}

                <div className="mb-4">
                    <label className="block mb-1">
                        Deadline
                    </label>

                    <input
                        type="date"
                        name="deadline"
                        value={taskData.deadline}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>


                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-black text-white"
                >
                    Create Task
                </button>

            </form>

        </div>
    );
};

export default Task;