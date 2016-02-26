"""backenda URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from index import IndexView
from employee.views import (EmployeeRelocationViewSet,
                            EmployeeRelocationsHistoryViewSet,
                            EmployeeRelocationsViewSet,
                            EmployeeViewSet,
                            EmployeeSearchViewSet)
from authentication.views import ProfileViewSet

router = routers.SimpleRouter()
router.register(r'employee/relocations_history', EmployeeRelocationsHistoryViewSet, base_name='employee-relocations-history') # Work with relocation request (new/exists)
router.register(r'employee/relocation_requests', EmployeeRelocationsViewSet, base_name='employee-relocation') # Work with relocation request (new/exists)
router.register(r'employee/relocation_request', EmployeeRelocationViewSet, base_name='employee-relocation') # Work with relocation request (new/exists)
router.register(r'employee/search/(?P<query>.+)', EmployeeSearchViewSet, base_name='employee_search') # Work with employee
router.register(r'employee', EmployeeViewSet, base_name='employee') # Work with employee
router.register(r'profile', ProfileViewSet, base_name='profile') # Work with employee


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include('rest_auth.urls')),
    url(r'^(?:(?!static)(?!api).)*$', IndexView.as_view(), name='index')
]
