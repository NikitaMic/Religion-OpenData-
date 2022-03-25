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
    africa1945christ = []
    summe = 0
    # For row 0 and column 0
    for a in range(sheet.nrows):
        if sheet.cell_value(a, 0) == int(year):
            if sheet.cell_value(a, 1) == region:
                val = sheet.row_values(a, 2, 8)
                summe = 0
                for i in range(0, len(val)):
                    summe = summe + float(val[i])
                africa1945christ.append(summe)

    return JsonResponse({"data": africa1945christ})
