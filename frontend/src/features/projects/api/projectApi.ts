import apiClient from "../../../api/apiClient";

import type { CreateProjectRequest, Project, UpdateProjectRequest } from "../types/projects.types";

const PROJECT_BASE_URL = "/api/projects";

export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>(
    PROJECT_BASE_URL
  );

  return response.data;
};

export const getProjectById = async (
  id: number
): Promise<Project> => {
  const response = await apiClient.get<Project>(
    `${PROJECT_BASE_URL}/${id}`
  );

  return response.data;
};

export const createProject = async (
  request: CreateProjectRequest
): Promise<Project> => {
  const response = await apiClient.post<Project>(
    PROJECT_BASE_URL,
    request
  );

  return response.data;
};

export const updateProject = async (
  id: number,
  request: UpdateProjectRequest
): Promise<Project> => {
  const response = await apiClient.put<Project>(
    `${PROJECT_BASE_URL}/${id}`,
    request
  );

  return response.data;
};

export const deleteProject = async (
  id: number
): Promise<void> => {
  await apiClient.delete(
    `${PROJECT_BASE_URL}/${id}`
  );
};