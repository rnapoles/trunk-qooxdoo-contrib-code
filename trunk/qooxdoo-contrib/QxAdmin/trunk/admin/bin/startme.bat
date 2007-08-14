  @echo off
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
  %pybin% -V >nul 2>&1
  if not %errorlevel%==0 (
    for /r c:\ /d %%F in (*cygwin) do (
      if exist "%%F\bin\python.exe" (
        echo. %%F
        set pybin=%%F\bin\python.exe
        echo. %pybin%
        goto:GotPython
      ) 
    )
    echo. Python not in your path - aborting ...
    set rc=2
    goto:END
  )
  :GotPython
  echo. Starting mini web server
  start "Use Ctrl-Break to terminate" %pybin% admin/bin/cgiserver.py
:: load admin url in browser
  echo. Launching admin url in browser
  start http://localhost:8000/admin/
:: clean-up
  :END
  cd %opwd%
  exit /b %rc%

