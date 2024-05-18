from rest_framework.permissions import BasePermission
# Only leaders and coordinators have access to create, edit, delete functionality as well as the lottery button
class IsLeaderOrCoordinator(BasePermission):
  def has_permission(self, request, view):
    print(f"User is authenticated: {request.user.is_authenticated}")
    print(f"User groups: {request.user.groups.values_list('name', flat=True)}")
    return request.user.groups.filter(name__in=['Leader', 'Coordinator']).exists()