
test:
	wrup browser -r ./test/index.js -o ./test/browser.js

test-watch:
	wrup browser -r ./test/index.js -o ./test/browser.js --watch

.PHONY: test
