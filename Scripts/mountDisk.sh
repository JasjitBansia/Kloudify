function mountCheck(){
mountPoint=$(findmnt UUID=4A01-8278)

if [ "$mountPoint" != "" ]; then
echo "mounted"

else
cd ..
sudo mount UUID=4A01-8278 "$1"
mountCheck
fi
}
mountCheck "$1"
