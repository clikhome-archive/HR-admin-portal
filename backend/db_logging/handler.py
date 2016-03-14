import logging
import logging.handlers


class DBLoggingHandler(logging.Handler):
    def emit(self, record):
        from models import Log
        try:
            Log.objects.create_from_record(record)
        except (KeyboardInterrupt, SystemExit):
            raise
        except:
            self.handleError(record)
