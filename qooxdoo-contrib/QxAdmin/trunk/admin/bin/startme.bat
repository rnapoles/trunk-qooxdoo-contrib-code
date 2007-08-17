  @echo off
  setlocal ENABLEDELAYEDEXPANSION
  set DEBUG=0
  set rc=0
  set adminUrl=http://localhost:8000/admin/
  set pybin=python
:: find cygwin (needed for make etc.)
  echo. I try to find your cygwin installation (needed for make etc.)
  echo. ... this may take some moments
  call :_searchCygwin
  set CygwinPath >nul 2>&1
  if not !errorlevel!==0 (
    :: no cygwin found
    echo.
    echo. I cannot find a cygwin installation; cygwin is necessary for the build process.
    echo. Can you provide the path to your cygwin installation?
    call :_readAndCheckCygwin
    set CygwinPath >nul 2>&1
    if not !errorlevel!==0 (
      echo. We may be able to start the admin interface, but without cygwin you will
      echo. not be able run the build commands; shall I continue?
      call :_yesNo
      if !YesNo!==0 (
        echo. Ok, aborting ...
        goto:END
      ) else (
        echo. Ok, I'll do my very best ...
      )
    ) else (
      echo. Found cygwin as !CygwinPath!, containing bash
    )
  ) else (
    echo. Found cygwin as !CygwinPath!, containing bash
  )
:: cd to Makefile dir
  echo. Changing directory
  pushd ..\..
  if not exist "Makefile" (
    echo. Looks like the wrong directory _no Makefile_ - aborting ...
    set rc=1
    goto:END
  )
:: find python
  :: in cygwin
  set CygwinPath >nul 2>&1
  if !errorlevel!==0 (
    if exist !CygwinPath!\bin\python.exe (
      set pybin=!CygwinPath!\bin\python.exe
      goto:GotPython
    )
  )
  :: in path
  %pybin% -V >nul 2>&1
  if %errorlevel%==0 (
    goto:GotPython
  )
  :: in assoc
  call :_errReset
  assoc .py >nul
  if %errorlevel%==0 (
    :: start knows about .py
    set pybin=""
    goto:GotPython
  )
  :: no python - giving up
  echo.
  echo. Could not find python in your environment - aborting ...
  set rc=2
  goto:END

:: start mini web server
  :GotPython
  if %pybin%=="" (
    set pcmd=admin/bin/cgiserver.py
  ) else (
    set pcmd=%pybin% admin/bin/cgiserver.py
  )
  echo. Starting mini web server
  if %DEBUG%==1 (
    start "Use Ctrl-Break to terminate" %pcmd%
  ) else (
    start "Use Ctrl-Break to terminate" /b %pcmd% >nul 2>&1
  )
  echo. Waiting a few seconds for the web server
  call :_sleepDot 3
  :: TODO check success
:: load admin url in browser
  echo. Launching admin url in browser
  start %adminUrl%
:: clean-up
  :END
  popd
  endlocal
  call :_shutdown
  exit /b %rc%

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
  echo. Press Ctrl-Break^<RET^> to terminate this script ...
  pause >nul
  endlocal
  goto:EOF

:_SearchDir
  rem Searches directories from %1 ending in %2 and returns the path found, but
  rem only if a subdir of %3 exists (as a further criterion)
  setlocal
  set root=%1
  set dir=%2
  set subdir=%3
  rem echo. IN SUBROUTINE: %1
  for /r %root%\ /d %%G in (*%dir%) do (
    call :_dot "."
    if exist "%%G\%subdir%" (
      set myfound=%%G
    ) 
  )
  endlocal & set _SearchDirFound=%myfound%
  goto:EOF

:_searchCygwin
  rem Trying to locate a cygwin installation on the machine, using bash.exe
  rem as an criterion
  setlocal
  set dir=cygwin
  set test=bin\bash.exe
  call :_dot " ."
  :: try likely paths
  for %%L in (%ProgramFiles% %HOMEDRIVE% %SystemDrive%) do (
    call :_dot "."
    if exist "%%L\%dir%\%test%" (
      set myfound="%%L\%dir%"
      goto:f1End
    )
  )
  goto:f1End
  :: do an exhaustive search of some paths
  rem for /f %%L in (admin\bin\drives.txt) do (
  for %%L in (%ProgramFiles% %HOMEDRIVE% %SystemDrive% c: d: e:) do (
    call :_dot "."
    call :_SearchDir "%%L" "%dir%" "%test%"
    set _SearchDirFound >nul 2>&1
    if !errorlevel!==0 (
      set myfound="%_SearchDirFound%"
      set _SearchDirFound=
      goto:f1End
    )
  )
  :f1End
  echo.
  endlocal & set CygwinPath=%myfound%
  goto:EOF

:_readAndCheckCygwin
  setlocal
  set/p cpath=Enter path to cygwin: 
  if exist %cpath%\bin\bash.exe (
    set myfound=%cpath%
  ) else (
    echo. Sorry, but this doesn't look like a proper cygwin installation
  )
  endlocal & set CygwinPath=!myfound!
  goto:EOF

:_yesNo
  setlocal
  set/p answ=(Please enter [y]/n:) 
  if "%answ%"=="n" set myfound=0
  if "%answ%"=="N" (
    set myfound=0
  ) else (
    set myfound=1
  )
  endlocal & set YesNo=%myfound%
  goto:EOF

:EOF
