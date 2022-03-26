import json

import xlrd
from django.http import JsonResponse
from django.middleware import csrf
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, "./calendar/index.html")


@csrf_exempt
def africa(request):
    loc = "calendarproject/data/newdata.xls"
    data = json.loads(request.body)

    year = data.get("year")
    region = data.get("region")
    religion = data.get("religion")
    # To open Workbook
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    summe = 0
    if religion == "Christians":
        colA = 2
        colB = 8
    elif religion == "Jews":
        colA = 9
        colB = 13
    elif religion == "Muslims":
        colA = 14
        colB = 21
    elif religion == "Buddhists":
        colA = 22
        colB = 25
    for a in range(sheet.nrows):
        if sheet.cell_value(a, 0) == int(year):
            if sheet.cell_value(a, 1) == region:
                val = sheet.row_values(a, colA, colB)
                summe = 0
                for i in range(0, len(val)):
                    summe = summe + int(val[i])

    return JsonResponse({"data": f"{summe:,}"})
