"""
Module orders
"""
from api.models.objects.order import OrderModel, orders


class Orders:

    count = 0

    def create_order(self, ordered_by, order_items) -> OrderModel:
        self.count += 1
        order = OrderModel(ordered_by, order_items)
        order.order_id = self.count
        orders.append(order)
        return order
