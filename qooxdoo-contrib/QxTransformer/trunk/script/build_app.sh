#!/bin/bash
function create_build
{
    cp -R "../application/$name" "../build/$name" ;
    
    cd ../build ;

    #deleting all unnecessary stuff
    find "./$name" -name .svn -print0 | xargs -0 rm -rf ;
    find "./$name" -name .DS_Store -print0 | xargs -0 rm -rf ;
    
    mv $name "qxtransformer-$version-$name" ;
     
    zip -r "qxtransformer-$version-$name.zip" "qxtransformer-$version-$name" ;
}


echo -n "Please enter name of appication name (application/*) > "
read name

echo -n "Please enter version of application package > "
read version


echo "Building applicaton $name package for version $version ..."

if [ -d ../build ]; then
    create_build
else
mkdir ../build
create_build
fi