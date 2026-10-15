# Data schema
- timeline.json: { eras:[{id,title,years,summary}], events:[{id,date(YYYY-MM-DD),era,title,place,text,tags[],media?(image id)}] }
- images.json: [{id,src(1200px url),full(original url),w,h,caption,alt,date,author,license,source(Commons page),era,event?(timeline event id),hero?:true}]
- videos.json: [{id,youtube(11-char id),title,channel,note?,era}]
- writings.json: { intro, sections:[{title,items:[{year,title,kind,summary,link?}]}], resources:[{title,url}] }
- speeches.json: { intro, items:[{date,title,venue,quote,context,source,link?}] }
- appearances.json: { intro, items:[{date,title,place,role}] }
- quotes.json: [{text,source}]   ideas.json: { intro, ideas:[{title,year,where,text,status}] }
- site.json: { name,title,tagline,occasion,dates,nav:[{href,label}],stats:[{value,label}] }

Era ids: early-life (1912–1946), chicago (1946–1976), nobel (1976–1980), public-intellectual (1980–2006), legacy (2006–), places (buildings, images only).
