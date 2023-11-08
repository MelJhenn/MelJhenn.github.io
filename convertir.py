#to support encodings
import codecs
path='./json/base.json'
#read input file
with codecs.open(path, 'r', encoding = 'utf8') as file:
  lines = file.read()

#write output file
with codecs.open(path, 'w', encoding = 'utf8') as file:
  file.write(lines)