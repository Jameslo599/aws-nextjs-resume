import json
import boto3
import logging
from datetime import datetime

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('aws-nextjs-resume-production-ipTable')

def lambda_handler(event, context):
    try:
        # Check if IP exists
        ip = event['requestContext']['identity']['sourceIp']
        response = table.query(
            KeyConditionExpression=boto3.dynamodb.conditions.Key('ip_address').eq(ip)
        )
        today_date = datetime.now().replace(microsecond=0)

        if response['Count'] >= 1:
            prev_date = response['Items'][0]['last_update']
            prev_unix = datetime.strptime(prev_date, '%Y-%m-%d %H:%M:%S').timestamp()

            today_unix = today_date.timestamp()
            seconds_diff = today_unix - prev_unix
            days_diff = seconds_diff / 86400
            if days_diff < 7:
                return {
                    "statusCode": 200,
                    'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT'
                    },
                    "body": json.dumps(False)
                }

        date_str = today_date.strftime('%Y-%m-%d %H:%M:%S')
        # Parse the request body from the event (Lambda Proxy integration)
        body = json.loads(event['body'])
        logging.info(f"Parsed body: {body}")
        # Safely access the parsed data
        website_name = body.get('website_name')

        response = table.put_item(Item={"website_name":website_name, "last_update": date_str, "ip_address": ip})
        data = table.get_item(Key={"ip_address": ip})

        return {
            "statusCode": 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT'
            },
            "body": json.dumps(data)
        }
    except Exception as e:
        print(f"Error occurred: {e}")
        return {
            "statusCode": 200,
            'headers': {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps(f"error: {str(e)}")
        }