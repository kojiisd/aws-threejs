# aws-threejs
This is a sample program to connect Three.js demo and AWS.

Thrree.js demo:
https://threejs.org/examples/#css3d_periodictable

# Preparation
1. Create API Gateway
2. Data preparation with data/sample-data.csv and tools/data-insert.py
3. Create conditions for data searching

# Create API Gateway
To accept GET access to call Lambda function, create API Gateway and deploy to production stage.
As calling of Lambda function, you can use

https://github.com/kojiisd/lambda-dynamodb-aggregator

and deploy to AWS Lambda.

After that generate API Gateway SDK.

# Data preparation with data/sample-data.csv and tools/data-insert.py
data sample

```csv
id,score,timestamp
"H",0,"2017-07-23T16:00:00"
"H",0,"2017-07-23T16:01:00"
"H",0,"2017-07-23T16:02:00"
"H",0,"2017-07-23T16:03:00"
"H",0,"2017-07-23T16:04:00"
"H",1,"2017-07-23T16:05:00"
"H",0,"2017-07-23T16:06:00"
```

# Create conditions for data searching

In script.js, body contents can be modified.

example:

```json
var body = {

    "label_id": "id",
    "label_range": "timestamp",
    "id": [
    "H"
    ],
    "aggregator": "latest",
    "time_from": "2017-07-23T16:00:00.000",
    "time_to": "2017-07-23T16:06:00.000",
    "params": {
    "range": "timestamp"
    }
};
```
