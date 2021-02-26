APP_NAME=social


.PHONY: isort
isort:
	@isort ${APP_NAME}


.PHONY: run
run:
	@${APP_NAME}/manage.py runserver


.PHONY: shell
shell:
	@${APP_NAME}/manage.py shell_plus


.PHONY: test
test:
	@${APP_NAME}/manage.py test
