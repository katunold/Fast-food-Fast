"""
Routes module to handle request urls
"""
from api.controllers.orders_controller import OrdersController


class Links:
    """
    Class to generate urls
    """
    @staticmethod
    def generate(app):
        """
        Generate urls on the app context
        :param app:
        :return:
        """
        app.add_url_rule('/api/v1/orders/', view_func=OrdersController.as_view('make_order'),
                         methods=['POST'], strict_slashes=False)
        app.add_url_rule('/api/v1/orders/', view_func=OrdersController.as_view('get_orders'),
                         methods=['GET'], strict_slashes=False)
        app.add_url_rule('/api/v1/orders/<int:order_id>/', view_func=OrdersController.as_view('get_single_order'),
                         methods=['GET'], strict_slashes=False)
        app.add_url_rule('/api/v1/orders/<int:order_id>/', view_func=OrdersController.as_view('update_order_status'),
                         methods=['PUT'], strict_slashes=False)
