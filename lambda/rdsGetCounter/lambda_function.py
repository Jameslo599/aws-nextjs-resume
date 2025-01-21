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
  query_params = event.get("queryStringParameters", {})
  count = 0
  conn = None

  try:
    conn = psycopg2.connect(host=rds_host, user=user_name, password=password, dbname=db_name, port=rds_port)
    logging.info("SUCCESS: Connection to RDS Postgres instance succeeded")

    with conn.cursor() as cur:
      query = "SELECT * FROM visitors WHERE website_name = %s"
      cur.execute(query, (query_params['website_name'],))
      row = cur.fetchone()
      count = row[2]


  except psycopg2.Error as e:
    logging.error(f"ERROR: Could not connect to Postgres instance. Error: {e.pgerror}")
    logging.error(f"DETAILS: {e.diag.message_primary}")
    raise Exception(f"Database connection failed. Error: {e.pgerror}")
  
  finally:
    if conn is not None:
      conn.close()

  return {
    "statusCode": 200,
    'headers': {
        "Content-Type" : "application/json",
        "Allow" : "GET, OPTIONS, POST, PUT",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET, OPTIONS, POST, PUT",
        "Access-Control-Allow-Headers" : "*"
    },
    "body": json.dumps(count)
  }