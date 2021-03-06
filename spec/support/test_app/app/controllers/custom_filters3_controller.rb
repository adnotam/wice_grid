# encoding: utf-8
class CustomFilters3Controller < ApplicationController
  def index
    @tasks_grid = initialize_grid(Task,
      include: [:relevant_version, :expected_version, :project],
      conditions: { projects: { id: Project.first.id } },
      custom_order: {
        'tasks.expected_version_id' => 'expected_versions_tasks.name'
      }
    )
  end
end
