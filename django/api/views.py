import json
from django.shortcuts import render
from django.http import HttpResponse

import numpy as np
import joblib
import os

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

import json

# Create your views here.

class PredictionView(APIView):
    def post(self, request):
        mod_path=os.path.join(os.path.dirname(__file__),"model_joblib")
        body_post=request.body.decode('utf-8')
        parameter=json.loads(body_post)
        
        arr=[]
        arr.append(parameter.get('class'))
        
        if parameter.get('gender')=='M':
            arr.append(1.0)
            arr.append(0.0)
        elif parameter.get('gender')=='F':
            arr.append(0.0)
            arr.append(1.0)
        
        arr.append(float(parameter.get('age')))
        arr.append(parameter.get('sibSp'))
        arr.append(parameter.get('parch'))
        
        arr.append(float(parameter.get('fare')))
        
        if parameter.get('embarked')=='S':
            arr.append(1.0)
            arr.append(0.0)
            arr.append(0.0)
        elif parameter.get('embarked')=='C':
            arr.append(0.0)
            arr.append(1.0)
            arr.append(0.0)
        elif parameter.get('embarked')=='Q':
            arr.append(0.0)
            arr.append(0.0)
            arr.append(1.0)
        
        print(arr)
        try:
            modd=joblib.load(mod_path)
            a = np.asarray(arr).reshape(1,-1)
            predicted_value= modd.predict(a)
            return Response({'response':True,'prediction':predicted_value[0]},status=status.HTTP_200_OK)
        except:
            return Response({'response':False},status=status.HTTP_200_OK)
    
def main(request):
    mod_path=os.path.join(os.path.dirname(__file__),"model_joblib")
    print(mod_path)
    modd=joblib.load(mod_path)
    array = [3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0]
    a = np.asarray(array).reshape(1,-1)
    predicted_value= modd.predict(a)
    print(predicted_value)
    return HttpResponse("Hello, world. You're at the polls index.")