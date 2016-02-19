from rest_framework.permissions import DjangoObjectPermissions


class IsOwnerOfObject(DjangoObjectPermissions):
    def has_object_permission(self, request, view, obj):
        user_field = getattr(view, '_user_field', 'user')
        user = request.user
        print user, getattr(obj, user_field)
        if getattr(obj, user_field) != user:
            return False
        return True
