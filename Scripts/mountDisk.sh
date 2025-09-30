tries=0
function mountCheck(){
mountPoint=$(findmnt UUID=4A01-8278)

if [ "$mountPoint" != "" ]; then
echo 0

else
cd ..
sudo mount -t exfat UUID=4A01-8278 "$1" -o uid=1000,gid=1000,umask=0000 
echo $?
fi
}
mountCheck "$1"
