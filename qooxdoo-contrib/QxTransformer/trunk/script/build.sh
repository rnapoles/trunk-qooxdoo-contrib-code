#!/bin/bash
function create_build
{
    mkdir ../build ;
    
    cp -R ../toolkit ../build/toolkit ;
    
    cd ../build ;
    #deleting all unnecessary stuff
    find ./toolkit -name .svn -print0 | xargs -0 rm -rf ;
    find ./toolkit -name .DS_Store -print0 | xargs -0 rm -rf ;
    
    #find ../build/toolkit -name .DS_Store -exec rm -rf {} \;
    #find ../build/toolkit -name .svn -exec rm -rf {} \;
    #rm -rf ../build/toolkit/dialects/qxml/templates/tmp
    
    mv toolkit "qxtransformer-$version" ;
     
    zip -r "qxtransformer-$version.zip" "qxtransformer-$version" ;
}


echo -n "Please enter version of QxTransformer package > "
read version

echo "Building package for version $version ..."

if [ -d ../build ]; then
    echo -n "../build folder exists. Do you want to remove it and continue? [y/n]"
    read del_build
    if [ $del_build = "y" ]; then
        rm -rf ../build
        create_build
    else
        exit
    fi
else
create_build
fi