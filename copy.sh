#!/bin/bash
cd ..
cp -r baseweb $1
cd $1
rm -rf copy.sh target .* 
if [ "$(uname)" = "Darwin" ]; then
    echo "mac"
    grep -rl "baseweb" --include="pom.xml" ./|xargs sed -i "" "s/baseweb/$1/g"
    grep -rl "baseweb" --include="MyApplication.java" ./|xargs sed -i "" "s/MyApplication/My_$1_Application/g"
    cd src
    grep -rl "baseweb" --include="*" ./|xargs sed -i "" "s/baseweb/$1/g" 
elif [ "$(uname)" = "Linux" ]; then
    echo "linux"
    grep -rl "baseweb" --include="pom.xml" ./|xargs sed -i "s/baseweb/$1/g"
    grep -rl "baseweb" --include="MyApplication.java" ./|xargs sed -i "s/MyApplication/My_$1_Application/g"
    cd src
    grep -rl "baseweb" --include="*" ./|xargs sed -i "s/baseweb/$1/g"
fi
cd main/java/
mv baseweb $1
cd $1
mv MyApplication.java My_$1_Application.java
