.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean-app: ## removed generated files but keep dependencies
	rm -rf .next
	rm -f package-lock.json

clean: clean-app ## clean all
	rm -rf node-modules/

run: build ## run app on local box
	yarn dev

lint: ## lint code
	yarn lint

test: ## test
	yarn test

build: ## build app
	yarn build

check: lint test build

clean-run: clean-app run ## fresh run