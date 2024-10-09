from rest_framework import serializers

from .models import Ballot, Candidate, Election, Poll, Result


class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = "__all__"


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = "__all__"


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = "__all__"


class ResultSerializer(serializers.ModelSerializer):
    candidate = serializers.CharField(source="candidate.name")
    poll = serializers.CharField(source="poll.name")

    class Meta:
        model = Result
        fields = ["poll", "candidate", "votes"]
