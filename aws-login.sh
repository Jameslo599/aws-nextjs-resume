#!/bin/bash

if grep -q WSL /proc/version; then
	export BROWSER=wslview
fi


aws sso login --sso-session=Master
