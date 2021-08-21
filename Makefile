all: deploy

build:
	~/smartpy-cli/SmartPy.sh compile ./contracts/FracIt.py ./contracts/out

deploy: build
	~/smartpy-cli/SmartPy.sh originate-contract \
		--code ./contracts/out/FracIt/*_contract.tz \
		--storage ./contracts/out/FracIt/*_storage.tz \
		--rpc https://florencenet.smartpy.io
