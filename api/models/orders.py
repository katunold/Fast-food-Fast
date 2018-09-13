"""
Module orders
"""
from typing import List

from flask import jsonify

from api.models.objects.order import OrderModel


class Orders:

    count = 0

    def create_order(self, ordered_by, order_items) -> OrderModel:
        self.count += 1
        order = OrderModel(ordered_by, order_items)
        order.order_id = self.count
        self.orders.append(order)
        return order

    @classmethod
    def get_all_orders(cls) -> List[OrderModel]:
        return cls.orders

    @classmethod
    def find_one_order(cls, order_id) -> OrderModel or None:
        for order in cls.orders:
            if order_id == order.order_id:
                return order
        return None

    @classmethod
    def update_order(cls, order_id, order_status=None):
        order = cls.find_one_order(order_id)
        if not order:
            return False
        order.order_status = order_status
        response_object = {
            'status': 'success',
            'message': 'Status has been updated'
        }
        return jsonify(response_object), 202

    orders: List[OrderModel] = []
