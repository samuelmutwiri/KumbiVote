from rest_framework import viewsets

from .models import Ballot, Candidate, Election, Poll, Result
from .serializers import (BallotSerializer, CandidateSerializer,
                          ElectionSerializer, PollSerializer, ResultSerializer)


class ElectionViewSet(viewsets.ModelViewSet):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class BallotViewSet(viewsets.ModelViewSet):
    queryset = Ballot.objects.all()
    serializer_class = BallotSerializer


class ResultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
