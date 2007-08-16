  @echo off
  setlocal ENABLEDELAYEDEXPANSION
  set DEBUG=0
  set rc=0
  set pybin=python
:: cd to Makefile dir
  echo. Changing directory
  pushd ..\..
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
  call :_searchPython
  set SearchCygwinFound >nul 2>&1
  if !errorlevel!==0 (
    echo.
    echo. Found cygwin as !SearchCygwinFound!, containing python
    set pybin=!SearchCygwinFound!\bin\python.exe
    goto:GotPython
  )
  :: no python - giving up
  echo.
  echo. Could not find python in your environment - aborting ...
  set rc=2
  goto:END

  :GotPython
  echo. Starting mini web server
  if %DEBUG%==1 (
    start "Use Ctrl-Break to terminate" %pybin% admin/bin/cgiserver.py
  ) else (
    start "Use Ctrl-Break to terminate" /b %pybin% admin/bin/cgiserver.py >nul 2>&1
  )
  echo. Waiting a few seconds for the web server
  call :_sleepDot 3
  :: TODO check success
:: load admin url in browser
  echo. Launching admin url in browser
  start http://localhost:8000/admin/
:: clean-up
  :END
  popd
  endlocal
  call :_shutdown
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
  endlocal & set _SearchCygwinFound=%myfound%
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

:_shutdown
  setlocal
  rem taskkill /f /im python.exe
  rem tasklist /fi "imagename eq python.exe"
  rem TODO: if you call this script on an existing shell, and you dont use
  ::  use ctrl-break, the python process will continue to run
  echo. Press Ctrl-Break^<RET^> to terminate the application ...
  pause >nul
  endlocal
  goto:EOF

:_searchPython
  setlocal
  call :_dot " ."
  :: try likely paths
  :: HOMEDRIVE\cygwin ProgramFiles\cygwin SystemDrive\cygwin
  for %%L in (%ProgramFiles% %HOMEDRIVE% %SystemDrive%) do (
    call :_dot "."
    if exist "%%L\cygwin\bin\python.exe" (
      set myfound="%%L\cygwin"
      goto:f1End
    )
  )
  goto:f1End
  :: do an exhaustive search of some paths
  rem for /f %%L in (admin\bin\drives.txt) do (
  for %%L in (%ProgramFiles% %HOMEDRIVE% %SystemDrive% c: d: e:) do (
    call :_dot "."
    call :_SearchCygwin "%%L"
    set _SearchCygwinFound >nul 2>&1
    if !errorlevel!==0 (
      set myfound="%_SearchCygwinFound%"
      set _SearchCygwinFound=
      goto:f1End
    )
  )
  :f1End
  endlocal & set SearchCygwinFound=%myfound%
  goto:EOF

:EOF
