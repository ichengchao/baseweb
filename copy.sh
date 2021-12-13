#!/bin/bash
cd ..
cp -r baseweb $1
cd $1
rm -f copy.sh
rm -rf .* 
rm -rf target
grep -rl "baseweb" --include="pom.xml" ./|xargs sed -i "" "s/baseweb/$1/g"
grep -rl "baseweb" --include="MyApplication.java" ./|xargs sed -i "" "s/MyApplication/My_$1_Application/g"
cd src
grep -rl "baseweb" --include="*" ./|xargs sed -i "" "s/baseweb/$1/g"
cd main/java/
mv baseweb $1
cd $1
mv MyApplication.java My_$1_Application.java
