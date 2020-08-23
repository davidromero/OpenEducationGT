import logging

import boto3
from chalice import Chalice
from chalicelib import custom_responses
from chalicelib.config import BUCKET_NAME, BUCKET_PREFIX, cors_config

app = Chalice(app_name='document_storage')
logger = logging.getLogger()
logger.setLevel(logging.INFO)

CONTENT_TYPES = ['image/jpeg', 'image/jpg', 'image/png']


@app.route('/', methods=['GET'])
def index():
    return custom_responses.get_base_res()


@app.route('/upload/{file_name}', methods=['PUT'], content_types=CONTENT_TYPES, cors=cors_config)
def upload_to_s3(file_name):
    body = app.current_request.raw_body
    logger.info('Uploading document')
    tmp_file_name = '/tmp/' + file_name
    with open(tmp_file_name, 'wb') as tmp_file:
        tmp_file.write(body)

    s3_client, bucket = get_s3_resources()
    s3_client.upload_file(tmp_file_name, BUCKET_NAME, file_name)

    objs = list(bucket.objects.filter(Prefix=file_name))
    if len(objs) > 0 and objs[0].key == file_name:
        public_url = f'{BUCKET_PREFIX}/{BUCKET_NAME}/{file_name}'
        logger.info(f'Document successfully saved in {public_url}')
        return custom_responses.post_response(public_url)
    else:
        logger.error('Document could not be saved')
        return custom_responses.post_response()


@app.route('/sms', methods=['GET'], cors=cors_config)
def sms_message():
    body = app.current_request.json_body
    sns = boto3.client('sns')
    sns.publish(
        Subject='OpenEduGT',
        PhoneNumber=['number'],
        Message=body['message']
    )
    return custom_responses.get_base_res()


@app.route('/textract', methods=['GET'], cors=cors_config)
def extract_text():
    textract = boto3.client('textract')
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': BUCKET_NAME,
                'Name': 'test.jpg'
            }
        })

    plain_str = ''
    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            plain_str = plain_str + item["Text"]

    print(plain_str[:160])

    return custom_responses.get_base_res()


def get_s3_resources():
    s3_client = boto3.client('s3')
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(BUCKET_NAME)

    return s3_client, bucket
