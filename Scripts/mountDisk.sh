function mountCheck(){
mountPoint=$(findmnt UUID=ECFF-3790)

if [ "$mountPoint" != "" ]; then
echo "mounted"

else
cd ..
sudo mount UUID=ECFF-3790 "$1"
mountCheck
fi
}
mountCheck "$1"