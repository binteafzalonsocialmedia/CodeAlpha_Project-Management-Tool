import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import Task from "../Users/TaskForm";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);

    const isOwner =
        project?.owner?._id?.toString() === currentUser?._id?.toString();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await API.get("/auth/me", {
                    withCredentials: true,
                });

                setCurrentUser(response.data.user);
            } catch (err) {
                console.log("CURRENT USER ERROR:", err);
            }
        };

        fetchCurrentUser();
    }, []);




    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await API.get(
                    "/project/createproject",
                    {
                        withCredentials: true,
                    }
                );

                const foundProject = response.data.find(
                    (project) => project._id === projectId
                );

                if (!foundProject) {
                    setError("Project not found.");
                    return;
                }

                setProject(foundProject);
            } catch (err) {
                console.log("FETCH PROJECT ERROR:", err);
                setError("Failed to load project.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);




    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await API.get(
                    `/task/project/${projectId}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("TASKS FROM DATABASE:", response.data);

                setTasks(response.data.tasks || []);

            } catch (err) {
                console.log("FETCH TASKS ERROR:", err);
            }
        };

        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);










    const handleCreateComment = async (taskId) => {
        if (!commentText.trim()) {
            return;
        }

        try {
            setCommentLoading(true);

            const response = await API.post(
                `/comment/${taskId}/comments`,
                {
                    text: commentText
                },
                {
                    withCredentials: true
                }
            );

            console.log("COMMENT CREATED:", response.data);


            setComments((prevComments) => ({
                ...prevComments,
                [taskId]: [
                    ...(prevComments[taskId] || []),
                    response.data.comment
                ]
            }));
            setCommentText((prev) => ({
                ...prev,
                [taskId]: ""
            }));

        } catch (err) {
            console.log("CREATE COMMENT ERROR:", err);
        } finally {
            setCommentLoading(false);
        }
    };



    useEffect(() => {
        if (tasks.length === 0) return;

        const fetchComments = async () => {
            try {
                const commentsData = {};

                for (const task of tasks) {
                    const response = await API.get(
                        `/comment/${task._id}/comments`,
                        {
                            withCredentials: true
                        }
                    );

                    commentsData[task._id] =
                        response.data.comments || [];
                }

                setComments(commentsData);

            } catch (err) {
                console.log("FETCH COMMENTS ERROR:", err);
            }
        };

        fetchComments();
    }, [tasks]);









    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p className="text-gray-500">
                    Loading project...
                </p>
            </div>
        );
    }



    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p className="text-red-500">
                    {error}
                </p>

                <button
                    onClick={() => navigate("/userdashboard")}
                    className="mt-4 rounded-lg bg-[#033E3E] px-5 py-3 text-white"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-[#033E3E] px-6 py-4 text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            ProjectFlow
                        </h1>

                        <p className="text-xs text-[#92C7C7]">
                            Project Management Tool
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/userdashboard")}
                        className="rounded-lg border border-[#92C7C7] px-4 py-2 text-sm hover:bg-[#075858]"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl p-6 sm:p-8">

                {/* Project Header */}
                <div className="rounded-2xl bg-white p-7 shadow-sm">

                    <div className="flex flex-col justify-between gap-4 sm:flex-row">

                        <div>
                            <p className="text-sm font-semibold text-[#4C8888]">
                                PROJECT
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-[#033E3E]">
                                {project.projectname}
                            </h2>

                            <p className="mt-3 text-gray-500">
                                {project.projectdetails}
                            </p>
                        </div>

                        <div>
                            <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                                Active
                            </span>
                        </div>

                    </div>

                    {/* Project Info */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Invite Code
                            </p>

                            <p className="mt-2 font-bold text-[#033E3E]">
                                {project.inviteCode}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Members
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#033E3E]">
                                {project.members?.length || 0}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-5">
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <p className="mt-2 font-bold text-green-600">
                                Active
                            </p>
                        </div>

                    </div>
                </div>

                {/* Members */}
                <div className="mt-6 rounded-2xl bg-white p-7 shadow-sm">

                    <h3 className="text-xl font-bold text-[#033E3E]">
                        Team Members
                    </h3>

                    <div className="mt-5 space-y-3">

                        {project.members?.length > 0 ? (

                            project.members.map((member) => (
                                <div
                                    key={member._id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >
                                    <div>
                                        <p className="font-semibold text-[#033E3E]">
                                            {member.username}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {member.email}
                                        </p>
                                    </div>

                                    <span className="text-xs font-semibold text-gray-500">
                                        Member
                                    </span>
                                </div>
                            ))

                        ) : (

                            <p className="text-sm text-gray-500">
                                No members found.
                            </p>

                        )}

                    </div>
                </div>
                {showTaskForm && (
                    <div className="mt-6">
                        <Task
                            project={project}
                            members={project.members || []}
                            onTaskCreated={(newTask) => {
                                setTasks((prevTasks) => [...prevTasks, newTask]);
                                setShowTaskForm(false);
                            }}
                        />
                    </div>
                )}

                {/* Tasks */}
                <div className="mt-6 rounded-2xl bg-white p-7 shadow-sm">

                    <div className="flex items-center justify-between">

                        <h3 className="text-xl font-bold text-[#033E3E]">
                            Tasks
                        </h3>

                        {isOwner && (
                            <button
                                onClick={() => setShowTaskForm(true)}
                                className="rounded-lg bg-[#033E3E] px-4 py-2 text-sm font-bold text-white hover:bg-[#075858]"
                            >
                                + Create Task
                            </button>
                        )}

                    </div>

                    <div className="mt-5 space-y-4">

                        {tasks.length > 0 ? (

                            tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="rounded-xl border border-gray-200 p-5"
                                >

                                    <div className="flex items-start justify-between">

                                        <div>
                                            <h4 className="text-lg font-bold text-[#033E3E]">
                                                {task.title}
                                            </h4>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {task.description}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                                            {task.priority}
                                        </span>

                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">

                                        <span>
                                            Deadline: {task.deadline || "No deadline"}
                                        </span>

                                        <span>
                                            Status: {task.status || "Pending"}
                                        </span>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-[#033E3E]">
                                            Comments
                                        </h5>
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            placeholder="Write a comment..."
                                            className="w-full rounded-lg border px-3 py-2"
                                        />

                                        <button
                                            onClick={() => handleCreateComment(task._id)}
                                            disabled={commentLoading}
                                            className="mt-2 rounded-lg bg-[#033E3E] px-4 py-2 text-white"
                                        >
                                            {commentLoading ? "Adding..." : "Comment"}
                                        </button>
                                    </div>

                                    <div className="mt-3 space-y-2">

                                        {(comments[task._id] || []).map((comment) => (
                                            <div
                                                key={comment._id}
                                                className="rounded-lg bg-gray-50 p-3"
                                            >
                                                <p className="font-semibold">
                                                    {comment.user?.username || "User"}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    {comment.text}
                                                </p>
                                            </div>
                                        ))}

                                    </div>


                                </div>


                            ))

                        ) : (

                            <div className="rounded-xl bg-gray-50 p-6 text-center">
                                <p className="text-sm text-gray-500">
                                    No tasks yet.
                                </p>
                            </div>

                        )}

                    </div>
                </div>

            </main >
        </div >
    );
};

export default ProjectDetails;