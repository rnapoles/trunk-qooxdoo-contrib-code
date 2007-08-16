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
  echo. ... this may take some moments
  call :_dot " ."
  rem cmd /c exit /b 19
  rem for /f %%L in (admin\bin\drives.txt) do (
  for %%L in (c: d: e:) do (
    call :_SearchCygwin "%%L"
    set SearchCygwinFound >nul 2>&1
    if !errorlevel!==0 (
      echo.
      echo. Found cygwin as !SearchCygwinFound!, containing python
      set pybin=!SearchCygwinFound!\bin\python.exe
      goto:GotPython
    )
  )
  :: no python - giving up
  echo.
  echo. Could not find python in your environment - aborting ...
  set rc=2
  goto:END

  :GotPython
  echo. Starting mini web server
  start "Use Ctrl-Break to terminate" %pybin% admin/bin/cgiserver.py
  echo. Wait a few seconds for the web server
  call :_sleepDot 3
  :: TODO check success
:: load admin url in browser
  echo. Launching admin url in browser
  start http://localhost:8000/admin/
:: clean-up
  :END
  cd %opwd%
  endlocal
  pause
  exit /b %rc%

:_SearchCygwin
  setlocal
  rem echo. IN SUBROUTINE: %1
  for /r %1\ /d %%G in (*cygwin) do (
    call :_dot "."
    if exist "%%G\bin\python.exe" (
      set myfound=%%G
    ) 
  )
  endlocal & set SearchCygwinFound=%myfound%
  goto:EOF

:_dot
  setlocal
  <nul (set/p xxx=%1)
  endlocal
  cmd /c exit /b 0
  goto:EOF

:_sleep
  setlocal
  ping -n %1 127.0.0.1 >nul
  endlocal
  goto:EOF

:_sleepDot
  setlocal
  for /l %%Y in (1,1,%1) do (
    call :_sleep 1
    call :_dot "."
  )
  call :_errReset
  echo.
  endlocal
  goto:EOF

:_errReset
  cmd /c exit /b 0
  goto:EOF

:EOF
