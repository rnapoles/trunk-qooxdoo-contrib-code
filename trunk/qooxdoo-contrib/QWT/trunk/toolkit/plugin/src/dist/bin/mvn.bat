@echo off

if "%OS%"=="Windows_NT" @setlocal

if not "%QWT_HOME%"=="" goto start
if "%OS%"=="Windows_NT" SET QWT_HOME=%~dp0..
if not "%QWT_HOME%"=="" goto start

echo.
echo Cannot locate QWT_HOME, please define a QWT_HOME environment variable pointing
echo to the install directory.
echo.
goto end

:start
set QWT_OPTS="-Dqwt.repo=file://%QWT_HOME%\repository" "-Dorg.apache.maven.global-settings=%QWT_HOME%\bin\settings.xml"
"%QWT_HOME%\apache-maven-2.0.9\bin\mvn" %QWT_OPTS% %*

:end
