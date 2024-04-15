FROM openjdk:17
EXPOSE 8080
ADD target/backend-service.jar backend-service.jar
ENTRYPOINT ["java", "-jar", "backend-service.jar"]