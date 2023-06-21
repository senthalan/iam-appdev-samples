# Use the official Go image as the base image
FROM golang:1.16-alpine

# switch working directory
WORKDIR /app

# Copy the source code into the container
COPY . .

# Build the Go application
RUN go build -o main .

# copy every content from the local file to the image
COPY . /app

# Build arguments for user/group configurations
ARG USER=wso2
ARG USER_ID=10001
ARG USER_GROUP=wso2
ARG USER_GROUP_ID=10001
ARG USER_HOME=/home/${USER}

USER 10001

VOLUME /tmp

# Expose the port on which the application will run
EXPOSE 10000

# Define the command to run the application
CMD ["./main"]