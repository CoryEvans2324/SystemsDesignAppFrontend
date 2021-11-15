DOCKER_BUILD_CONTEXT=.

IMAGE_NAME="sysdesign-frontend"
CWD=$(shell pwd)

.PHONY : all run_container build
all: build run_container

run_container :
	@docker run --rm --user $(shell id -u):$(shell id -g) -v ${CWD}:/app ${IMAGE_NAME}

build :
	@docker build -t ${IMAGE_NAME} ${DOCKER_BUILD_CONTEXT}
