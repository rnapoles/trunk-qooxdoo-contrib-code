#!/bin/bash
echo 'Select qooxdoo version to use:'
PS3='Version ? '

select version in 1.4.2 1.5 trunk
do
    case $REPLY in
        1 ) VER=1.4.2 ;;
        2 ) VER=1.5 ;;
        3 ) VER=trunk ;;
        * ) print 'invalid.' ;;
    esac
    if [[ -n $version ]]; then
        echo 'Working directory: '
        read WORK_PATH

        make VERSION=$VER WORK_PATH=$WORK_PATH
        break
    fi
done

