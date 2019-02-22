FROM maven:3.6-jdk-8 as builder


COPY org.opentestmodeling.vstep.ngt.core.parent/ /apps/

WORKDIR /apps
RUN mvn clean install -DskipTests

RUN mkdir -p sources/
RUN cp org.opentestmodeling.vstep.ngt.core.ide/target/*-sources.jar sources/
RUN rm org.opentestmodeling.vstep.ngt.core.ide/target/*-sources.jar

FROM openjdk:8

RUN apt-get update && apt-get install socat -y

WORKDIR /apps
COPY --from=builder /apps/sources/*.jar ./sources/
COPY --from=builder /apps/org.opentestmodeling.vstep.ngt.core.ide/target/*.jar ./
RUN ln -s *.jar server.jar
EXPOSE 4417

CMD socat TCP4-LISTEN:4417,reuseaddr,fork EXEC:"java -jar /apps/server.jar"
