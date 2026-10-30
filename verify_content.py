import pathlib,json
root=pathlib.Path(__file__).parent
entries=json.loads((root/'topics.json').read_text())
for loc in ('en','pt'):
 docs=list((root/'content'/loc).glob('*.md'))
 lengths=[len(p.read_text()) for p in docs]
 assert len(docs)==1200,(loc,len(docs))
 assert min(lengths)>=15000 and max(lengths)<=20000
 print(loc,len(docs),min(lengths),max(lengths))
assert len(entries)==1200
