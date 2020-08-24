import boto3
import botocore
from chalicelib.config import BUCKET_NAME, BUCKET_PREFIX
from botocore.errorfactory import ClientError


def extract_text_textract(body):
    textract = boto3.client('textract')
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': BUCKET_NAME,
                'Name': body['document_name']
            }
        })
    plain_str = ''
    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            plain_str = plain_str + item["Text"]
    return plain_str


def file_exist_bucket(filename):
    s3 = boto3.client('s3')
    try:
        s3.head_object(Bucket=BUCKET_NAME, Key=filename)
    except ClientError:
        return False
    return True


def upload_document_s3(body, file_name):
    tmp_file_name = '/tmp/' + file_name
    with open(tmp_file_name, 'wb') as tmp_file:
        tmp_file.write(body)
    s3_client, bucket = get_s3_resources()
    s3_client.upload_file(tmp_file_name, BUCKET_NAME, file_name)
    return list(bucket.objects.filter(Prefix=file_name))


def get_s3_resources():
    s3_client = boto3.client('s3')
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(BUCKET_NAME)

    return s3_client, bucket
