import logging
import psycopg2
import json
import os

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

# environment variables
rds_host = os.environ['RDS_HOST']
user_name = os.environ['USER_NAME']
password = os.environ['PASSWORD']
db_name = os.environ['DB_NAME']
rds_port = os.environ['RDS_PORT']

def lambda_handler(event, context):
  try:
    # Parse the request body from the event (Lambda Proxy integration)
    body = json.loads(event['body'])
    # Safely access the parsed data
    website_name = body.get('website_name')
    total_visitors = body.get('total_visitors', 0)  # Default to 0 if not present
    conn = psycopg2.connect(host=rds_host, user=user_name, password=password, dbname=db_name, port=rds_port)
    logging.info("SUCCESS: Connection to RDS Postgres instance succeeded")

    with conn.cursor() as cur:
      update_query = "UPDATE visitors SET total_visitors = %s WHERE website_name = %s"
      cur.execute(update_query, (total_visitors+1, website_name))
      conn.commit()

      query = "SELECT * FROM visitors WHERE website_name = %s"
      cur.execute(query, (website_name,))
      row = cur.fetchone()
      total_visitors = row[2]

    return {
      "statusCode": 200,
      "headers": {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET, OPTIONS, POST, PUT",
        "Access-Control-Allow-Headers" : "*"
      },
      "body": json.dumps(total_visitors)
    }
    
  except Exception as e:
    return {
      "statusCode": 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        "Access-Control-Allow-Headers": "*"
      },
      "body": json.dumps(f"Database connection failed. Error: {e}")
    }
  


