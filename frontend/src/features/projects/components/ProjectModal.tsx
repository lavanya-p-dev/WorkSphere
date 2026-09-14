import ProjectForm from "./ProjectForm";

import type {
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
} from "../types/projects.types";

interface ProjectModalProps {
  project?: Project | null;
  isSubmitting: boolean;
  onSubmit: (
    data: CreateProjectRequest | UpdateProjectRequest
  ) => Promise<void>;
  onClose: () => void;
}

const ProjectModal = ({
  project,
  isSubmitting,
  onSubmit,
  onClose,
}: ProjectModalProps) => {
  const isEditMode = Boolean(project);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="project-modal">
        <div className="modal-header">
          <div>
            <h2>
              {isEditMode
                ? "Edit Project"
                : "Create Project"}
            </h2>

            <p>
              {isEditMode
                ? "Update your project information."
                : "Create a new project in WorkSphere."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <ProjectForm
          project={project}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default ProjectModal;