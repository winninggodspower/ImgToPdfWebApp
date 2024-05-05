import requests
from flask import current_app
from src import app

class PayStack:
    PAYSTACK_SECRET_KEY = None
    with app.app_context():
        PAYSTACK_SECRET_KEY = current_app.config['PAYSTACK_SECRET_KEY']

    base_url =  'https://api.paystack.co/'
    headers = {
            'Authorization': f"Bearer {PAYSTACK_SECRET_KEY}",
            "Cache-Control": "no-cache",
            'Content-Type': 'application/json'
        }

    
    @classmethod
    def generate_checkout_url(self, email, amount, ref=None, currency='NGN', metadata=None):
        path = ('transaction/initialize/')

        if currency not in ['NGN', "USD", "GHS", "ZAR", "KES"]:
            currency = 'NGN'

        url = self.base_url + path
        body = {
            'email': email,
            'amount': amount,
            'currency': currency,
            'metadata': metadata,
        }

        if ref:
            body['ref'] = ref

        response = requests.post(url, headers=self.headers, json=body)
        print(response.text)

        if response.status_code == 200:
            return response.json().get('data').get('authorization_url')
        
        return None
    
    @classmethod
    def verify_payment(self, reference):
        path = (f'transaction/verify/{reference}')
        url = self.base_url + path

        response = requests.get(url, headers=self.headers)
        print(response)
        if response.status_code == 200:
            return response.json().get('data')
        
        return None