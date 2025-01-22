import json
import boto3
import logging
from decimal import Decimal

logging.basicConfig(level=logging.INFO)

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('aws-nextjs-resume-production-visitorsTable')

def lambda_handler(event, context):
    try:
        # Parse the request body from the event (Lambda Proxy integration)
        body = json.loads(event['body'])
        logging.info(f"Parsed body: {body}")
        # # Safely access the parsed data
        website_name = body.get('website_name')
        website_id = body.get('website_id')
        total_visitors = body.get('total_visitors', 0)  # Default to 0 if not present

        response = table.put_item(Item={"website":website_name, "id": website_id, "total_visitors": int(total_visitors+1)})
        data = table.get_item(Key={"website":website_name, "id": website_id})

        # Function to convert Decimal to float or int
        def convert_decimal(obj):
            if isinstance(obj, Decimal):
                return float(obj) if obj % 1 else int(obj)  # Convert to int if it's a whole number
            elif isinstance(obj, dict):
                return {k: convert_decimal(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_decimal(i) for i in obj]
            else:
                return obj

        # Convert Decimal values in the response to native Python types
        response_data = convert_decimal(data.get('Item', {}))

        return {
            "statusCode": 200,
            'headers': {
                "Content-Type" : "application/json",
                "Allow" : "GET, OPTIONS, POST",
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers" : "*"
            },
            "body": json.dumps(response_data)
        }
    except Exception as e:
        logging.error(f"Error occurred: {e}")
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