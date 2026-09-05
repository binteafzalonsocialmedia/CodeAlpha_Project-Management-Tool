import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const UserDashboard = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("overview");

    const [projects, setProjects] = useState([]);

    const [createProjectData, setCreateProjectData] = useState({
        projectname: "",
        projectdetails: "",
    });

    const [joinProjectData, setJoinProjectData] = useState({
        inviteCode: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =========================
    // FETCH PROJECTS
    // =========================

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const response = await API.get(
                    "http://localhost:5000/project/createproject",
                    {
                        withCredentials: true,
                    }
                );

                console.log(
                    "PROJECTS FROM DATABASE:",
                    response.data
                );

                const formattedProjects = response.data.map((project) => ({
                    id: project._id,
                    name: project.projectname,
                    description: project.projectdetails,
                    role: "Owner",
                    inviteCode: project.inviteCode,
                    members: project.members?.length || 0,
                    progress: 0,
                    status: "Active",
                }));

                setProjects(formattedProjects);

            } catch (err) {

                console.log(
                    "FETCH PROJECTS ERROR:",
                    err
                );

            }

        };

        fetchProjects();

    }, []);


    // =========================
    // CREATE PROJECT FORM
    // =========================

    const handleCreateChange = (e) => {

        const { name, value } = e.target;

        setCreateProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =========================
    // CREATE PROJECT
    // =========================

    const handleCreateProject = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const response = await API.post(
                "/project/createproject",
                {
                    projectname: createProjectData.projectname,
                    projectdetails: createProjectData.projectdetails,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(
                "PROJECT CREATED:",
                response.data
            );

            const newProject = response.data;


            // Convert backend project structure
            // into frontend UI structure

            const formattedProject = {

                id: newProject._id,

                name: newProject.projectname,

                description: newProject.projectdetails,

                role: "Owner",

                inviteCode: newProject.inviteCode,

                members: newProject.members?.length || 1,

                progress: 0,

                status: "Active",

            };


            setProjects((prev) => [
                ...prev,
                formattedProject,
            ]);


            setCreateProjectData({
                projectname: "",
                projectdetails: "",
            });


            setSuccess(
                "Project created successfully."
            );


            setActiveTab("projects");

        } catch (err) {

            console.log(
                "CREATE PROJECT ERROR:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to create project."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // JOIN PROJECT
    // =========================

    const handleJoinChange = (e) => {

        const { name, value } = e.target;

        setJoinProjectData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    const handleJoinProject = async (e) => {

        e.preventDefault();

        console.log(
            "Join Project:",
            joinProjectData
        );

        const response = await API.post(
            "/project/joinproject",
            joinProjectData
        );

        const joinedProject = response.data.project;

        const formattedProject = {
            id: joinedProject._id,
            name: joinedProject.projectname,
            description: joinedProject.projectdetails,
            role: "Member",
            inviteCode: joinedProject.inviteCode,
            members: joinedProject.members?.length || 0,
            progress: 0,
            status: "Active",
        };

        setProjects((prevProjects) => [
            ...prevProjects,
            formattedProject
        ]);

        navigate("/userdashboard");
        console.log("is it running")
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        console.log("Logout");

        // Logout API will be connected later.

    };


    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}

            <nav className="bg-[#033E3E] text-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <div>

                        <h1 className="text-xl font-bold">
                            ProjectFlow
                        </h1>

                        <p className="text-xs text-[#92C7C7]">
                            Project Management Tool
                        </p>

                    </div>


                    <div className="flex items-center gap-4">

                        <div className="hidden text-right sm:block">

                            <p className="text-sm font-semibold">
                                Socialmediauser
                            </p>

                            <p className="text-xs text-[#92C7C7]">
                                User
                            </p>

                        </div>


                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-[#92C7C7] px-4 py-2 text-sm transition hover:bg-[#075858]"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            <div className="mx-auto flex max-w-7xl">

                {/* Sidebar */}

                <aside className="hidden min-h-[calc(100vh-72px)] w-64 border-r bg-white p-5 md:block">

                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        Workspace
                    </p>


                    <div className="space-y-2">

                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold ${activeTab === "overview"
                                ? "bg-[#033E3E] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Overview
                        </button>


                        <button
                            onClick={() => setActiveTab("projects")}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold ${activeTab === "projects"
                                ? "bg-[#033E3E] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            My Projects
                        </button>


                        <button
                            onClick={() => setActiveTab("create")}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold ${activeTab === "create"
                                ? "bg-[#033E3E] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Create Project
                        </button>


                        <button
                            onClick={() => setActiveTab("join")}
                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold ${activeTab === "join"
                                ? "bg-[#033E3E] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Join Project
                        </button>

                    </div>

                </aside>


                {/* Main Content */}

                <main className="flex-1 p-6 sm:p-8">

                    {/* =========================
                        OVERVIEW
                    ========================= */}

                    {activeTab === "overview" && (

                        <div>

                            <div className="mb-8">

                                <p className="text-sm font-semibold text-[#4C8888]">
                                    DASHBOARD
                                </p>

                                <h2 className="mt-1 text-3xl font-bold text-[#033E3E]">
                                    Welcome back, Socialmediauser
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Manage your projects and collaborate with your team.
                                </p>

                            </div>


                            {/* Statistics */}

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                <div className="rounded-2xl bg-white p-6 shadow-sm">

                                    <p className="text-sm text-gray-500">
                                        Total Projects
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-[#033E3E]">
                                        {projects.length}
                                    </h3>

                                </div>


                                <div className="rounded-2xl bg-white p-6 shadow-sm">

                                    <p className="text-sm text-gray-500">
                                        Active Projects
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-green-600">

                                        {
                                            projects.filter(
                                                (project) =>
                                                    project.status === "Active"
                                            ).length
                                        }

                                    </h3>

                                </div>


                                <div className="rounded-2xl bg-white p-6 shadow-sm">

                                    <p className="text-sm text-gray-500">
                                        Team Members
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-[#033E3E]">

                                        {
                                            projects.reduce(
                                                (total, project) =>
                                                    total + project.members,
                                                0
                                            )
                                        }

                                    </h3>

                                </div>


                                <div className="rounded-2xl bg-white p-6 shadow-sm">

                                    <p className="text-sm text-gray-500">
                                        Pending Invitations
                                    </p>

                                    <h3 className="mt-2 text-3xl font-bold text-orange-500">
                                        0
                                    </h3>

                                </div>

                            </div>


                            {/* Quick Actions */}

                            <div className="mt-8">

                                <h3 className="mb-4 text-xl font-bold text-[#033E3E]">
                                    Quick Actions
                                </h3>


                                <div className="grid gap-4 sm:grid-cols-2">

                                    <button
                                        onClick={() =>
                                            setActiveTab("create")
                                        }
                                        className="rounded-2xl bg-[#033E3E] p-6 text-left text-white transition hover:-translate-y-1 hover:bg-[#075858]"
                                    >

                                        <p className="text-lg font-bold">
                                            + Create Project
                                        </p>

                                        <p className="mt-2 text-sm text-[#92C7C7]">
                                            Start a new project and invite your team.
                                        </p>

                                    </button>


                                    <button
                                        onClick={() =>
                                            setActiveTab("join")
                                        }
                                        className="rounded-2xl border-2 border-[#92C7C7] bg-white p-6 text-left transition hover:-translate-y-1"
                                    >

                                        <p className="text-lg font-bold text-[#033E3E]">
                                            Join Project
                                        </p>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Enter a project code to join a team.
                                        </p>

                                    </button>

                                </div>

                            </div>


                            {/* Recent Projects */}

                            <div className="mt-8">

                                <div className="mb-4 flex items-center justify-between">

                                    <h3 className="text-xl font-bold text-[#033E3E]">
                                        Recent Projects
                                    </h3>

                                    <button
                                        onClick={() =>
                                            setActiveTab("projects")
                                        }
                                        className="text-sm font-semibold text-[#033E3E]"
                                    >
                                        View all
                                    </button>

                                </div>


                                <div className="grid gap-5 lg:grid-cols-2">

                                    {projects
                                        .slice(0, 2)
                                        .map((project) => (

                                            <div
                                                key={project.id}
                                                className="rounded-2xl bg-white p-6 shadow-sm"
                                            >

                                                <div className="flex items-start justify-between">

                                                    <div>

                                                        <h4 className="text-lg font-bold text-[#033E3E]">
                                                            {project.name}
                                                        </h4>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {project.description}
                                                        </p>

                                                    </div>


                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                                        {project.status}
                                                    </span>

                                                </div>


                                                <div className="mt-5">

                                                    <div className="mb-2 flex justify-between text-xs">

                                                        <span className="text-gray-500">
                                                            Progress
                                                        </span>

                                                        <span className="font-bold">
                                                            {project.progress}%
                                                        </span>

                                                    </div>


                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                                        <div
                                                            className="h-full rounded-full bg-[#033E3E]"
                                                            style={{
                                                                width: `${project.progress}%`,
                                                            }}
                                                        />

                                                    </div>

                                                </div>


                                                <div className="mt-5 flex justify-between text-xs text-gray-500">

                                                    <span>
                                                        {project.members} members
                                                    </span>

                                                    <span>
                                                        {project.role}
                                                    </span>

                                                </div>

                                            </div>

                                        ))}

                                </div>

                            </div>

                        </div>

                    )}


                    {/* =========================
                        PROJECTS
                    ========================= */}

                    {activeTab === "projects" && (

                        <div>

                            <div className="mb-8">

                                <h2 className="text-3xl font-bold text-[#033E3E]">
                                    My Projects
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Projects you own or collaborate on.
                                </p>

                            </div>


                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                {projects.map((project) => (

                                    <div
                                        key={project.id}
                                        className="rounded-2xl bg-white p-6 shadow-sm"
                                    >

                                        <div className="flex justify-between">

                                            <h3 className="font-bold text-[#033E3E]">
                                                {project.name}
                                            </h3>

                                            <span className="text-xs text-green-600">
                                                {project.status}
                                            </span>

                                        </div>


                                        <p className="mt-3 text-sm text-gray-500">
                                            {project.description}
                                        </p>


                                        <p className="mt-3 text-sm text-gray-500">
                                            Invite code: {project.inviteCode}
                                        </p>


                                        <div className="mt-5 text-sm text-gray-500">
                                            {project.members} members
                                        </div>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/projects/${project.id}`
                                                )
                                            }
                                            className="mt-5 w-full rounded-lg bg-[#033E3E] py-3 text-sm font-bold text-white hover:bg-[#075858]"
                                        >
                                            Open Project
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}


                    {/* =========================
                        CREATE PROJECT
                    ========================= */}

                    {activeTab === "create" && (

                        <div className="mx-auto max-w-2xl">

                            <div className="mb-8">

                                <h2 className="text-3xl font-bold text-[#033E3E]">
                                    Create Project
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Create a workspace for your team.
                                </p>

                            </div>


                            <form
                                onSubmit={handleCreateProject}
                                className="rounded-2xl bg-white p-7 shadow-sm"
                            >

                                <div className="space-y-5">

                                    {error && (

                                        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                            {error}
                                        </div>

                                    )}


                                    {success && (

                                        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                                            {success}
                                        </div>

                                    )}


                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Project Name
                                        </label>

                                        <input
                                            type="text"
                                            name="projectname"
                                            value={
                                                createProjectData.projectname
                                            }
                                            onChange={handleCreateChange}
                                            placeholder="e.g. E-Commerce Platform"
                                            required
                                            className="w-full rounded-xl border-2 border-[#92C7C7] px-4 py-3 outline-none focus:border-[#033E3E]"
                                        />

                                    </div>


                                    <div>

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Description
                                        </label>

                                        <textarea
                                            name="projectdetails"
                                            value={
                                                createProjectData.projectdetails
                                            }
                                            onChange={handleCreateChange}
                                            placeholder="Describe your project..."
                                            rows="5"
                                            required
                                            className="w-full resize-none rounded-xl border-2 border-[#92C7C7] px-4 py-3 outline-none focus:border-[#033E3E]"
                                        />

                                    </div>


                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-xl bg-[#033E3E] py-4 font-bold text-white transition hover:bg-[#075858] disabled:cursor-not-allowed disabled:opacity-60"
                                    >

                                        {loading
                                            ? "Creating..."
                                            : "Create Project"}

                                    </button>

                                </div>

                            </form>

                        </div>

                    )}


                    {/* =========================
                        JOIN PROJECT
                    ========================= */}

                    {activeTab === "join" && (

                        <div className="mx-auto max-w-2xl">

                            <div className="mb-8">

                                <h2 className="text-3xl font-bold text-[#033E3E]">
                                    Join Project
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Enter the invitation/project code provided by your team.
                                </p>

                            </div>


                            <form
                                onSubmit={handleJoinProject}
                                className="rounded-2xl bg-white p-7 shadow-sm"
                            >

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Project Code
                                </label>


                                <input
                                    type="text"
                                    name="inviteCode"
                                    value={joinProjectData.inviteCode}
                                    onChange={handleJoinChange}
                                    placeholder="e.g. PMT-7X92K"
                                    required
                                    className="w-full rounded-xl border-2 border-[#92C7C7] px-4 py-3 outline-none focus:border-[#033E3E]"
                                />


                                <button
                                    type="submit"
                                    className="mt-5 w-full rounded-xl bg-[#033E3E] py-4 font-bold text-white hover:bg-[#075858]"
                                >
                                    Join Project
                                </button>

                            </form>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default UserDashboard;