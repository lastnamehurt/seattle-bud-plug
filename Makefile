# Install dependencies
install:
	rm -rf node_modules && npm i

# Build app locally
local-build:
	docker build .

# Build the app
build:
	docker buildx build --platform linux/amd64 -t seattle-bud-plug .

tag:
	docker tag seattle-bud-plug registry.heroku.com/seattle-bud-plug/web

# Start the app
start:
	docker run -p 8000:8000 .

# run local
debug:
	npm start

compose:
	docker-compose up -d

# Test the app
# test:
#     docker run . pytest

# Push to Docker
docker-push:
	docker tag . blerdeyeview/seattlebudplug
	docker push blerdeyeview/seattlebudplug

# Pull from Docker
docker-pull:
	docker pull blerdeyeview/seattlebudplug

# Push to Heroku
heroku-push:
	docker push registry.heroku.com/seattle-bud-plug/web

# Release to Heroku
heroku-release:
	heroku container:release web -a seattle-bud-plug

# Pull from Heroku
heroku-pull:
	heroku container:pull web

# Push to GitHub
github-push:
	git add .
	git commit -m "Committed by Make"
	git push origin HEAD

# Pull from GitHub
github-pull:
	git pull origin HEAD

logs:
	heroku logs -t -a seattle-bud-plug