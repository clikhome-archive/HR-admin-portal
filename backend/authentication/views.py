from rest_framework import mixins, viewsets
from serializers import UserDetailsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class ProfileViewSet(viewsets.GenericViewSet):
    '''
    Get/Set profile
    '''
    serializer_class = UserDetailsSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def list(self, request, *args, **kwargs):
        '''
        It's a hack for GET
        '''
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        '''
        It's hack for POST
        '''
        serializer = self.get_serializer(self.get_object(), data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)