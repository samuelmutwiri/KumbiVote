from django.contrib import admin

from .models import Ballot, Candidate, Election, Poll, Result

admin.site.register(Election)
admin.site.register(Poll)
admin.site.register(Ballot)
admin.site.register(Result)
admin.site.register(Candidate)


class ElectionAdmin(admin.ModelAdmin):
    list_display = ("name", "organization", "start_date", "end_date")

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("organization")
