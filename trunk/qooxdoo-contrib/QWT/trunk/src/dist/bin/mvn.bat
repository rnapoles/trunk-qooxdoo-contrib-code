@echo off

if "%OS%"=="Windows_NT" @setlocal

if not "%QWT_HOME%"=="" goto start
if "%OS%"=="Windows_NT" SET QWT_HOME=%~dp0..
if not "%QWT_HOME%"=="" goto start

echo.
echo Cannot locate QWT_HOMEm, please set a QWT_HOME environment variable.
echo.
goto end

:start
set QWT_OPTS="-Dmaven.repo.local=%QWT_HOME%\repository" "-Dorg.apache.maven.global-settings=%QWT_HOME%\bin\settings.xml"
%QWT_HOME%\apache-maven-2.0.8\bin\mvn %QWT_OPTS% %*

:end
