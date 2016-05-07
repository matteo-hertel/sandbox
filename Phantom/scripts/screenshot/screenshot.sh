WEBSITE=$1;

if [ -z "$WEBSITE" ] ; then
    echo "please provide a website e.g. https://example.com"
    exit
fi

DIMENSIONS=(
750px*1334px
640px*1136px
2550px*3096px
);

FILE=$WEBSITE
FILE=${FILE#*//} #removes stuff upto // from begining
FILE=${FILE%/*} #removes stuff from / all the way to end
FILENAME=""
for i in "${DIMENSIONS[@]}"
do
   :
    FILENAME=$(echo $i | sed "s/\*//")

    phantomjs ./screenshot.js $WEBSITE ./output/$FILE/$FILENAME.png $i
    echo "$FILE-$FILENAME.png";
done
