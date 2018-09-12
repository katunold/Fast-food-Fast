"""
Tests module
"""
from unittest import TestCase

from flask import json

from run import APP


class TestFastFoodFast(TestCase):
    """
    Tests run for the api
    """
    def setUp(self):
        self.app = APP
        self.client = self.app.test_client

    def make_order(self, ordered_by, order_items):
        """
        Method takes to parameters to make an order
        :param ordered_by:
        :param order_items:
        :return:
        """
        post_data = self.client().post(
            '/api/v1/orders/',
            data=json.dumps(dict(
                ordered_by=ordered_by,
                order_items=order_items
            )),
            content_type='application/json'
        )
        return post_data

    def test_make_order(self):
        post = self.make_order('Rubarema', 'Posho and Beans')
        post_response = json.loads(post.data.decode())
        self.assertTrue(post_response['status'], 'Success')
        self.assertTrue(post_response['message'], 'Your order is submitted')
        self.assertTrue(post_response['data'])
        self.assertTrue(post.content_type, 'application/json')
        self.assertEqual(post.status_code, 201)

    def test_order_with_invalid_data(self):
        post = self.make_order(123535, 'Posho and Beans')
        post_response = json.loads(post.data.decode())
        self.assertTrue(post_response['status'], 'fail')
        self.assertTrue(post_response['error_message'], 'Please use character strings')
        self.assertFalse(post_response['data'])
        self.assertTrue(post.content_type, 'application/json')
        self.assertEqual(post.status_code, 400)

    def test_order_with_empty_data_field(self):
        post = self.make_order('Rubarema', '')
        post_response = json.loads(post.data.decode())
        self.assertTrue(post_response['status'], 'fail')
        self.assertTrue(post_response['error_message'], 'Some fields have no data')
        self.assertFalse(post_response['data'])
        self.assertTrue(post.content_type, 'application/json')
        self.assertEqual(post.status_code, 400)

    def test_order_with_a_string_of_numbers(self):
        post = self.make_order('Rubarema', '23413451')
        post_response = json.loads(post.data.decode())
        self.assertTrue(post_response['status'], 'fail')
        self.assertTrue(post_response['error_message'], 'Please use character strings')
        self.assertFalse(post_response['data'])
        self.assertTrue(post.content_type, 'application/json')
        self.assertEqual(post.status_code, 400)

    def test_get_empty_orders(self):
        request_data = self.client().get('/api/v1/orders/')

        response_data = json.loads(request_data.data.decode())
        self.assertTrue(response_data['status'], 'success')
        self.assertTrue(response_data['message'], 'No orders currently')
        self.assertFalse(response_data['data'])
        self.assertEqual(request_data.status_code, 200)

    def test_get_orders(self):
        self.make_order('Rubarema', 'Posho and Beans')
        self.make_order('Arnold', 'Pasted Gnuts and Matooke')
        self.make_order('Acram', 'Pasted Gnuts, Matooke and sweet potatoes')
        self.make_order('Apple', 'Chips and Chicken')

        request_data = self.client().get('/api/v1/orders/')

        response_data = json.loads(request_data.data.decode())
        self.assertTrue(response_data['status'], 'success')
        self.assertTrue(response_data['data'])
        self.assertEqual(request_data.status_code, 200)
