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
