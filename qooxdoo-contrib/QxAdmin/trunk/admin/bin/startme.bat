@echo off
:: cd to Makefile dir
echo. Changing directory
for /f %%i in ('cd') do set opwd=%%i
cd ..\..
if not exist "Makefile" (
  echo. Looks like the wrong directory _no Makefile_ aborting ...
  cd %opwd%
  exit /b 1
)
:: start mini web server
echo. Starting mini web server
start python admin/bin/cgiserver.py
:: load admin url in browser
echo. Launching admin url in browser
start http://localhost:8000/admin/
:: back to initial dir
cd %opwd%

