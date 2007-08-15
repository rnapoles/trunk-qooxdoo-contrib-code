  @echo off
  setlocal ENABLEDELAYEDEXPANSION
  set rc=0
  set pybin=python
:: cd to Makefile dir
  echo. Changing directory
  for /f %%i in ('cd') do set opwd=%%i
  cd ..\..
  if not exist "Makefile" (
    echo. Looks like the wrong directory _no Makefile_ - aborting ...
    set rc=1
    goto:END
  )
:: start mini web server
  :: this needs python
  %pybin% -V >nul 2>&1
  if %errorlevel%==0 (
    goto:GotPython
  )
  :: try to locate python within cygwin
  echo. No python in your path; trying to locate python within cygwin ...
  echo. ... this may take some moments.
  rem cmd /c exit /b 19
  for /f %%L in (admin\bin\drives.txt) do (
    call :_SearchCygwin "%%L"
    set SearchCygwinFound >nul 2>&1
    if !errorlevel!==0 (
      echo. Found cygwin as !SearchCygwinFound!, containing python
      set pybin=!SearchCygwinFound!\bin\python.exe
      goto:GotPython
    )
  )
  :: no python - giving up
  echo. Could not find Python in your environment - aborting ...
  set rc=2
  goto:END

  :GotPython
  echo. Starting mini web server
  start "Use Ctrl-Break to terminate" %pybin% admin/bin/cgiserver.py
  :: TODO check success
:: load admin url in browser
  echo. Launching admin url in browser
  start http://localhost:8000/admin/
:: clean-up
  :END
  cd %opwd%
  exit /b %rc%

:_SearchCygwin
  setlocal
  rem echo. IN SUBROUTINE: %1
  for /r %1\ /d %%G in (*cygwin) do (
    if exist "%%G\bin\python.exe" (
      set myfound=%%G
    ) 
  )
  endlocal & set SearchCygwinFound=%myfound%
  goto:EOF

:EOF
