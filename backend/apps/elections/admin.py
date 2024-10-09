from django.contrib import admin

from .models import Ballot, Candidate, Election, Poll, Result

admin.site.register(Election)
admin.site.register(Poll)
admin.site.register(Ballot)
admin.site.register(Result)
admin.site.register(Candidate)
