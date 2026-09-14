package com.worksphere.project.service;

import com.worksphere.project.dto.CreateProjectRequest;
import com.worksphere.project.dto.ProjectResponse;
import com.worksphere.project.dto.UpdateProjectRequest;
import com.worksphere.project.entity.Project;
import com.worksphere.project.entity.ProjectStatus;
import com.worksphere.project.exception.ResourceNotFoundException;
import com.worksphere.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ProjectResponse createProject(
            CreateProjectRequest request,
            Long ownerId) {

        LocalDateTime now = LocalDateTime.now();

        Project project = new Project();

        project.setName(request.getName().trim());

        project.setDescription(
                request.getDescription() != null
                        ? request.getDescription().trim()
                        : null
        );

        project.setStatus(ProjectStatus.ACTIVE);
        project.setOwnerId(ownerId);
        project.setCreatedAt(now);
        project.setUpdatedAt(now);

        Project savedProject =
                projectRepository.save(project);

        return mapToResponse(savedProject);
    }

    public List<ProjectResponse> getAllProjects() {

        return projectRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        return mapToResponse(project);
    }

    public ProjectResponse updateProject(
            Long id,
            UpdateProjectRequest request) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        project.setName(request.getName().trim());

        project.setDescription(
                request.getDescription() != null
                        ? request.getDescription().trim()
                        : null
        );

        project.setUpdatedAt(LocalDateTime.now());

        Project updatedProject =
                projectRepository.save(project);

        return mapToResponse(updatedProject);
    }

    public void deleteProject(Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Project not found with id: " + id
                        )
                );

        projectRepository.delete(project);
    }

    private ProjectResponse mapToResponse(Project project) {

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getStatus(),
                project.getOwnerId(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}