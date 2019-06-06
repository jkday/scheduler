#!/usr/bin/env bash

echo "Dev env ready. Just waiting with nothing to do..."
# just read and halt. 
i="0"

while [ 1 ]
do
    sleep 1
    i=$[$i+1]
    echo "$i    Dev running $(date)"
done