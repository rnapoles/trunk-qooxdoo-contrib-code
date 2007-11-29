@echo off

if not "%QWT_HOME%"=="" goto start
if "%OS%"=="Windows_NT" SET QWT_HOME=%~dp0\..\..
if not "%QWT_HOME%"=="" goto start

echo.
echo ERROR: QWT_HOME not found in your environment.
echo Please set the QWT_HOME variable in your environment to match the install location
echo.
goto end

:start
QWT_OPTS=-Dmaven.repo.local=$QWT_HOME/repository -Dorg.apache.maven.global-settings=$QWT_HOME/bin/settings.xml
%QWT_HOME\apache-maven-2.0.8\bin\mvn %QWT_OPTS% %*

:end
