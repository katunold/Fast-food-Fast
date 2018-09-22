"""
Module to for the order object
"""
from datetime import datetime


class OrderModel:

    def __init__(self, ordered_by=None, order_items=None):
        self.order_id = None
        self.ordered_by = ordered_by
        self.order_items = order_items
        self.order_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.order_status = 'pending'



