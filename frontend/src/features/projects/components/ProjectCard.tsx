import type { Project } from "../types/projects.types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  return (
    <article className="project-card">
      <div className="project-card-header">
        <div>
          <h3>{project.name}</h3>

          <span
            className={`project-status status-${project.status.toLowerCase()}`}
          >
            {project.status}
          </span>
        </div>

        <div className="project-card-menu">
          <button
            type="button"
            onClick={() => onEdit(project)}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(project)}
          >
            Delete
          </button>
        </div>
      </div>

      <p className="project-description">
        {project.description ||
          "No description available."}
      </p>

      <div className="project-card-footer">
        <span>
          Created{" "}
          {new Date(
            project.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </article>
  );
};

export default ProjectCard;