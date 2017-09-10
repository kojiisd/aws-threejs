import sys

import csv
import math
from decimal import Decimal

import pandas

import boto3
from boto3.dynamodb.conditions import Key, Attr
from boto3.session import Session


args = sys.argv

if len(args) < 4:
    print "Usage: python data-insert.py <FileName> <Region> <Table>"
    sys.exit()

dynamodb = boto3.resource('dynamodb', region_name=args[2])
table = dynamodb.Table(args[3])

if __name__ == "__main__":
    print "Data insert start."
    target = pandas.read_csv(args[1])
    for rowIndex, row in target.iterrows():
        itemDict = {}
        for col in target:
            if row[col] != None and type(row[col]) == float and math.isnan(float(row[col])) and row[col] != float('nan'):
                continue
            elif row[col] == float('inf') or row[col] == float('-inf'):
                continue
            elif type(row[col]) == float:
                itemDict[col] = Decimal(str(row[col]))
            else:
                itemDict[col] = row[col]
        print itemDict

        table.put_item(Item=itemDict)
    
    print "Data insert finish."
