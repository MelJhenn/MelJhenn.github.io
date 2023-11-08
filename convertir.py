#to support encodings
import os
import codecs
path='./json/base.json'
path2='./json/base2.json'
#read input file
blockSize = 1048576
with codecs.open(path,"r",encoding="mbcs") as sourceFile:
    with codecs.open(path2,"w",encoding="UTF-8") as targetFile:
        while True:
            contents = sourceFile.read(blockSize)
            if not contents:
                break
            targetFile.write(contents)
os.remove(path)
os.rename(path2, path)