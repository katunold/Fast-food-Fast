"""
Module orders
"""
from typing import List

from api.models.objects.order import OrderModel


class Orders:

    count = 0

    def create_order(self, ordered_by, order_items) -> OrderModel:
        self.count += 1
        order = OrderModel(ordered_by, order_items)
        order.order_id = self.count
        self.orders.append(order)
        return order

    def get_all_orders(cls) -> List[OrderModel]:
        return cls.orders

    orders: List[OrderModel] = []
