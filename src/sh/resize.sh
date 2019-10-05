#!/bin/sh

image="$1"

scale_x="$2"
scale_y="$3"
max_size="$4"

tmp_png="$(mktemp --suffix=.png)"
tmp_txt="$(mktemp --suffix=.txt)"

convert $1 -resize ${scale_x}x${scale_y} $tmp_png
convert $tmp_png -resize "$max_size>" $tmp_txt
cat $tmp_txt

rm $tmp_png $tmp_txt
