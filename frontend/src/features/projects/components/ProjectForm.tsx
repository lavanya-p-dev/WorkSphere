import { type FormEvent, useState } from "react";

import type {
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
} from "../types/projects.types";

interface ProjectFormProps {
  project?: Project | null;
  isSubmitting: boolean;
  onSubmit: (
    data: CreateProjectRequest | UpdateProjectRequest
  ) => Promise<void>;
  onCancel: () => void;
}

const ProjectForm = ({
  project,
  isSubmitting,
  onSubmit,
  onCancel,
}: ProjectFormProps) => {
  const [name, setName] = useState(
    project?.name ?? ""
  );

  const [description, setDescription] = useState(
    project?.description ?? ""
  );

  const [error, setError] = useState("");

  const isEditMode = Boolean(project);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      setError("Project name is required.");
      return;
    }

    if (trimmedName.length < 3) {
      setError(
        "Project name must contain at least 3 characters."
      );
      return;
    }

    if (trimmedName.length > 150) {
      setError(
        "Project name cannot exceed 150 characters."
      );
      return;
    }

    if (trimmedDescription.length > 1000) {
      setError(
        "Description cannot exceed 1000 characters."
      );
      return;
    }

    await onSubmit({
      name: trimmedName,
      description: trimmedDescription,
    });
  };

  return (
    <form
      className="project-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-group">
        <label htmlFor="project-name">
          Project Name
        </label>

        <input
          id="project-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Enter project name"
          maxLength={150}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-description">
          Description
        </label>

        <textarea
          id="project-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          placeholder="Describe your project"
          maxLength={1000}
          rows={5}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="form-message error">
          {error}
        </div>
      )}

      <div className="project-form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : isEditMode
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;