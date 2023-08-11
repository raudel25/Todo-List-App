.PHONY: front-run
front-run:
	yarn --cwd front-end start

.PHONY: back-run
back-run:
	dotnet run --project back-end

.PHONY: install
install:
	yarn --cwd front-end install

.PHONY: restore
restore:
	dotnet restore

.PHONY: db
db:
	dotnet ef database update --project back-end

.PHONY: build
build:
	dotnet build