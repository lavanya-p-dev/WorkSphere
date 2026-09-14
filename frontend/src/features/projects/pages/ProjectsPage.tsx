import { useEffect, useMemo, useState } from "react";

import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../api/projectApi";

import type {
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
} from "../types/projects.types";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const loadProjects = async () => {
    try {
      setError("");

      setIsLoading(true);

      const data = await getProjects();

      setProjects(data);
    } catch {
      setError(
        "Unable to load projects. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return projects;
    }

    return projects.filter((project) =>
      project.name
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [projects, searchTerm]);

  const openCreateModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (
    data:
      | CreateProjectRequest
      | UpdateProjectRequest
  ) => {
    try {
      setError("");

      setIsSubmitting(true);

      if (selectedProject) {
        const updatedProject =
          await updateProject(
            selectedProject.id,
            data
          );

        setProjects((previous) =>
          previous.map((project) =>
            project.id === updatedProject.id
              ? updatedProject
              : project
          )
        );
      } else {
        const newProject =
          await createProject(
            data as CreateProjectRequest
          );

        setProjects((previous) => [
          newProject,
          ...previous,
        ]);
      }

      setIsModalOpen(false);
      setSelectedProject(null);
    } catch {
      setError(
        "Unable to save the project. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (
    project: Project
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteProject(project.id);

      setProjects((previous) =>
        previous.filter(
          (item) => item.id !== project.id
        )
      );
    } catch {
      setError(
        "Unable to delete the project. Please try again."
      );
    }
  };

  return (
    <main className="projects-page">

      <section className="projects-header">
        <div>
          <span className="page-eyebrow">
            WORKSPACE
          </span>

          <h1>Projects</h1>

          <p>
            Organize and manage your work projects
            from one place.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={openCreateModal}
        >
          + Create Project
        </button>
      </section>

      <section className="projects-toolbar">
        <div className="project-search">
          <input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <span className="project-count">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1
            ? "project"
            : "projects"}
        </span>
      </section>

      {error && (
        <div className="form-message error">
          {error}
        </div>
      )}

      {isLoading ? (
        <section className="projects-state">
          <div className="loading-spinner" />
          <p>Loading projects...</p>
        </section>
      ) : filteredProjects.length === 0 ? (
        <section className="projects-state empty-state">
          <div className="empty-state-icon">
            +
          </div>

          <h2>
            {searchTerm
              ? "No projects found"
              : "No projects yet"}
          </h2>

          <p>
            {searchTerm
              ? "Try a different search term."
              : "Create your first project to get started."}
          </p>

          {!searchTerm && (
            <button
              type="button"
              className="primary-button"
              onClick={openCreateModal}
            >
              Create Project
            </button>
          )}
        </section>
      ) : (
        <section className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>
      )}

      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          isSubmitting={isSubmitting}
          onSubmit={handleSaveProject}
          onClose={() => {
            if (!isSubmitting) {
              setIsModalOpen(false);
              setSelectedProject(null);
            }
          }}
        />
      )}

    </main>
  );
};

export default ProjectsPage;