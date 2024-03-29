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
from dal import autocomplete
from django.contrib import admin
from rest_framework import routers
from index import IndexView
from employee.views import (EmployeeRelocationViewSet,
                            EmployeeRelocationsHistoryViewSet,
                            EmployeeRelocationsViewSet,
                            EmployeeViewSet,
                            EmployeeSearchViewSet,
                            EmployeeRelocationRequestCancelViewSet,
                            EmployeeSelect2QuerySetView)
from employee.models import Employee
from authentication.views import (ProfileViewSet,
                                  SignUpViewSet,
                                  ActivateViewSet,
                                  AccountSelect2QuerySetView,
                                  DepartmentSelect2QuerySetView,
                                  CompanySelect2QuerySetView,
                                  AccountSelectByCompany2QuerySetView)
from authentication.models import Account, Department, Company
from billing.views import (SubscriptionsViewSet,
                           InvoicesViewSet,
                           InvoiceSelect2QuerySetView)
from billing.models import Invoice
from support.views import FeedbackViewSet
from db_logging.views import LogsViewSet


router = routers.SimpleRouter()
router.register(r'employee/relocations_history', EmployeeRelocationsHistoryViewSet, base_name='employee-relocations-history') # Work with relocation request (new/exists)
router.register(r'employee/relocation_request_cancel', EmployeeRelocationRequestCancelViewSet, base_name='employee-relocation-cancel') # Work with relocation request (new/exists)
router.register(r'employee/relocation_requests', EmployeeRelocationsViewSet, base_name='employee-relocation') # Work with relocation request (new/exists)
router.register(r'employee/relocation_request', EmployeeRelocationViewSet, base_name='employee-relocation') # Work with relocation request (new/exists)
router.register(r'employee/search/(?P<query>.+)', EmployeeSearchViewSet, base_name='employee_search') # Work with employee
router.register(r'employee', EmployeeViewSet, base_name='employee') # Work with employee
router.register(r'profile', ProfileViewSet, base_name='profile') # Work with profile
router.register(r'billing/subscritions', SubscriptionsViewSet, base_name='subscriptions')
router.register(r'billing/invoices', InvoicesViewSet, base_name='invoices')
router.register(r'account/signup', SignUpViewSet, base_name='account_signup')
router.register(r'account/activate', ActivateViewSet, base_name='account_activate')
router.register(r'support/feedback', FeedbackViewSet, base_name='feedback')
router.register(r'support/logs', LogsViewSet, base_name='logs')


urlpatterns = [
    url(r'^s3direct/', include('s3direct.urls')),
    url('admin/select_user/$', AccountSelect2QuerySetView.as_view(
        model=Account),
        name='select_user'
    ),
    url('admin/select_user_by_company/(?P<company_id>\d+)/$', AccountSelectByCompany2QuerySetView.as_view(
        model=Account),
        name='select_user_by_company'
    ),
    url('admin/select_department/$', DepartmentSelect2QuerySetView.as_view(
        model=Department),
        name='select_department'
    ),
    url('admin/select_company/$', CompanySelect2QuerySetView.as_view(
        model=Company),
        name='select_company'
    ),
    url('admin/select_invoice/$', InvoiceSelect2QuerySetView.as_view(
        model=Invoice),
        name='select_invoice'
    ),
    url('admin/select_employee/$', EmployeeSelect2QuerySetView.as_view(
        model=Employee),
        name='select_employee'
    ),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include('rest_auth.urls')),
    url(r'^account/activate/(?P<activate_key>[0-9A-Za-z_\-]+)$',
        IndexView.as_view(), name='account_activate'),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})$',
        IndexView.as_view(), name='password_reset_confirm'),
    url(r'^.well-known/acme-challenge/(?P<token>.+)$', 'letsencrypt_views.letsencrypt_challenge'),
    url(r'^.*$', IndexView.as_view(), name='index')
]
