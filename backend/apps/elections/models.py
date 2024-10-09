from django.db import models
from django.db.models import Count

from apps.organizations import Member, Position


class Election(models.Model):
    organization = models.ForeignKey(
        apps.organizations.Organization,
        on_delete=models.CASCADE,
        related_name="%(class)s",
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)


class Poll(Election):
    body = models.ForeignKey(Body, on_delete=models.CASCADE, related_name="%(class)s")
    position = models.ForeignKey(
        Position, on_delete=models.CASCADE, related_name="%(class)s"
    )


class Candidate(Poll):
    member = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name="%(class)s"
    )
    name = models.CharField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, null=False)
    is_active = models.BooleanField(default=True)
    votes = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return self.name


class Ballot(Poll):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Result(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField()
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="%(class)s")
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    votes = models.PositiveBigIntegerField(default=0)

    class Meta:
        unique_together = ("poll", "candidate")

    def __str__(self):
        if self.candidate:
            return f"{self.candidate.name} - {self.vote_count} votes"
        else:
            return f"{self.poll.name} results"

    @classmethod
    def compute_for_poll(cls, poll):
        """
        Compute the vote results for all candidates in a specific poll.
        """
        # Retrieve the candidates and their vote counts
        candidates = poll.candidates.annotate(vote_count=Count("votes")).order_by(
            "-vote_count"
        )

        # Update or create the Result for each candidate
        results = []
        for candidate in candidates:
            result, created = cls.objects.update_or_create(
                poll=poll,
                candidate=candidate,
                defaults={"vote_count": candidate.vote_count},
            )
            results.append(result)

        return results

    @classmethod
    def compute_for_election(cls, election):
        """
        Compute the results for all polls in a given election.
        """
        results = []
        for poll in election.polls.all():
            poll_results = cls.compute_for_poll(poll)
            results.extend(poll_results)
        return results
