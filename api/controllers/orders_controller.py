"""
Module for the orders controller
"""
from flask import request, jsonify
from flask.views import MethodView

from api.handlers.error_feedback import ErrorFeedback
from api.models.orders import Orders
from api.utils.validation import DataValidation


class OrdersController(MethodView):
    """
    Class defines methods for post and get Orders
    """
    order_ = Orders()
    ordered_by = None
    order_items = None
    order_status = None

    def post(self):
        """
        Post method to handle post orders
        :return:
        """
        post_data = request.get_json()
        try:
            self.ordered_by = post_data['ordered_by'].strip()
            self.order_items = post_data['order_items'].strip()
        except AttributeError:
            return ErrorFeedback.invalid_data_format()

        if not self.ordered_by or not self.order_items:
            return ErrorFeedback.empty_data_fields()
        elif DataValidation.check_string_of_numbers(self.ordered_by) or \
                DataValidation.check_string_of_numbers(self.order_items):
            return ErrorFeedback.invalid_data_format()

        order_feed = self.order_.create_order(self.ordered_by, self.order_items)
        response_object = {
            'status': 'Success',
            'message': 'Your order is submitted',
            'data': order_feed.__dict__
        }
        return jsonify(response_object), 201

    def get(self, order_id=None):
        """
        Get method to return orders
        :return:
        """

        if not self.order_.get_all_orders():
            return ErrorFeedback.empty_data_storage()
        elif order_id:
            return self.get_single_order(order_id)

        response_object = {
            'status': 'success',
            'data': [order.__dict__ for order in self.order_.get_all_orders()]
        }
        return jsonify(response_object), 200

    def get_single_order(self, order_id):
        """
        Method to get a single order
        :param order_id:
        :return:
        """
        for order in self.order_.get_all_orders():
            if order.order_id == order_id:
                response_object = {
                    'status': 'success',
                    'message': 'Order exists',
                    'data': order.__dict__
                }
                return jsonify(response_object), 200

        return ErrorFeedback.order_absent()

    def put(self, order_id=None):
        """
        Method to update the order status
        :param order_id:
        :return:
        """
        order = Orders.find_one_order(order_id)

        post_data = request.get_json()
        key = 'order_status'
        if key not in post_data:
            return ErrorFeedback.missing_key(key)
        try:
            self.order_status = post_data['order_status'].strip()
        except AttributeError:
            return ErrorFeedback.invalid_data_format()

        if not self.order_status:
            return ErrorFeedback.empty_data_fields()
        elif DataValidation.check_string_of_numbers(self.order_status):
            return ErrorFeedback.invalid_data_format()

        if not order:
            return ErrorFeedback.order_absent()

        return Orders.update_order(order_id, self.order_status)
