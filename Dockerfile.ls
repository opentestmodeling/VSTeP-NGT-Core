FROM maven:3.6-jdk-8 as emf-build

RUN git clone -b R2_17_0 git://git.eclipse.org/gitroot/emf/org.eclipse.emf.git
RUN git clone -b R2_17_0 git://git.eclipse.org/gitroot/xsd/org.eclipse.xsd.git
WORKDIR org.eclipse.emf
RUN mvn install

FROM maven:3.6-jdk-8 as builder

COPY --from=emf-build /root/.m2/ /root/.m2/
COPY org.opentestmodeling.vstep.ngt.core.parent/ /apps/

WORKDIR /apps
RUN mvn clean install -DskipTests



FROM openjdk:8

RUN apt-get update && apt-get install socat -y

WORKDIR /apps
RUN mkdir -p sources/
COPY --from=builder /apps/org.opentestmodeling.vstep.ngt.core.ide/target/*-sources.jar ./sources/
COPY --from=builder /apps/org.opentestmodeling.vstep.ngt.core.ide/target/*-ls.jar ./
RUN ln -s *.jar server.jar
EXPOSE 4417

CMD socat TCP4-LISTEN:4417,reuseaddr,fork EXEC:"java -jar /apps/server.jar"
