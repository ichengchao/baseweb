#!/bin/bash
cd ..
cp -r baseweb $1
cd $1
rm -rf copy.sh target .*
cp ../baseweb/.gitignore ./
if [ "$(uname)" = "Darwin" ]; then
    echo "mac"
    grep -rl "baseweb" --include="pom.xml" ./|xargs sed -i "" "s/baseweb/$1/g"
    grep -rl "baseweb" --include="MyBaseWebApplication.java" ./|xargs sed -i "" "s/MyBaseWebApplication/My_$1_Application/g"
    cd src
    grep -rl "baseweb" --include="*" ./|xargs sed -i "" "s/baseweb/$1/g" 
elif [ "$(uname)" = "Linux" ]; then
    echo "linux"
    grep -rl "baseweb" --include="pom.xml" ./|xargs sed -i "s/baseweb/$1/g"
    grep -rl "baseweb" --include="MyBaseWebApplication.java" ./|xargs sed -i "s/MyBaseWebApplication/My_$1_Application/g"
    cd src
    grep -rl "baseweb" --include="*" ./|xargs sed -i "s/baseweb/$1/g"
fi

mv main/java/baseweb/MyBaseWebApplication.java main/java/baseweb/My_$1_Application.java
mv main/java/baseweb main/java/$1
mv test/java/baseweb test/java/$1