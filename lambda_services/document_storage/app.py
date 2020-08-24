import logging

import boto3
from chalice import Chalice
from chalicelib import custom_responses
from chalicelib.config import BUCKET_NAME, BUCKET_PREFIX, SECRET_KEY, cors_config
from chalicelib.aws_api import file_exist_bucket, upload_document_s3, extract_text_textract

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
    objs = upload_document_s3(body, file_name)
    if len(objs) > 0 and objs[0].key == file_name:
        public_url = f'{BUCKET_PREFIX}/{BUCKET_NAME}/{file_name}'
        logger.info(f'Document successfully saved in {public_url}')
        return custom_responses.post_response(public_url)
    else:
        logger.error('Document could not be saved')
        return custom_responses.post_response(None)


@app.route('/sms', methods=['POST'], cors=cors_config)
def sms_message():
    body = app.current_request.json_body
    if body['secret_key'] == SECRET_KEY:
        print("SEND SMS")
        # sns = boto3.client('sns')
        # sns.publish(
        #    Subject='OpenEduGT',
        #    PhoneNumber=['number'],
        #    Message=body['message']
        # )
        return custom_responses.post_response(body['message'])
    else:
        return custom_responses.post_response(None)


@app.route('/textract', methods=['POST'], cors=cors_config)
def extract_text():
    body = app.current_request.json_body
    if file_exist_bucket(body['document_name']):
        plain_str = extract_text_textract(body)
        return custom_responses.post_response(plain_str[:160])
    else:
        return custom_responses.post_response(None)
