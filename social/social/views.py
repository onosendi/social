class PaginationMixin:
    """ Pagination mixin for views that do not inherit generic DRF views. """

    pagination_class = None

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                raise NotImplementedError("pagination_class must be implemented")
            self._paginator = self.pagination_class()
        return self._paginator
