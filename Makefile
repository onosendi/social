APP_NAME=social


.PHONY: run
run:
	@${APP_NAME}/manage.py runserver


.PHONY: shell
shell:
	@${APP_NAME}/manage.py shell_plus
