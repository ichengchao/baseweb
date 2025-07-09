# Gemini Project: baseweb

This file contains project-specific information to help Gemini assist you more effectively.

## Project Overview

This is a Java Spring Boot web application named "baseweb". It includes a backend with a RESTful API and a frontend with static HTML and JavaScript files.

## Key Technologies

- **Language:** Java 21
- **Framework:** Spring Boot 3.4.3
- **Build Tool:** Maven
- **Dependencies:**
  - `spring-boot-starter-web` (for web applications)
  - `spring-boot-starter-aop` (for aspect-oriented programming)
  - `fastjson` (for JSON processing)
  - `okhttp3` (for HTTP requests)
  - `junit` (for testing)

## Common Commands

- **Build the project:**
  ```bash
  mvn clean package
  ```

- **Run the application:**
  ```bash
  mvn spring-boot:run
  ```
  Alternatively, after building, you can run the packaged JAR:
  ```bash
  java -jar target/baseweb.jar
  ```

- **Run tests:**
  ```bash
  mvn test
  ```

- **View dependency tree:**
  ```bash
  mvn dependency:tree
  ```
