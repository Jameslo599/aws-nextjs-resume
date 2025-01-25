import json
import boto3
from decimal import Decimal

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('aws-nextjs-resume-production-visitorsTable')

def lambda_handler(event, context):
    try:
        query_params = event.get("queryStringParameters", {})
        response = table.get_item(Key={'website': query_params['website_name'], 'id': int(query_params['website_id'])})

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
        response_data = convert_decimal(response.get('Item', {}))

        return {
            "statusCode": 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            },
            "body": json.dumps(response_data['total_visitors'])
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