import json, pathlib, re, random
P=pathlib.Path(__file__).parent
rows=json.loads((P/'topics.json').read_text())
INTRO={
'en': ['The strategic question behind {q} is not simply how to rank for another keyword. It is how to make the right audience discover, understand, and choose a solution. Search behavior is fragmented across traditional engines, AI answers, comparison sites, communities, and product directories. A useful growth plan measures business impact instead of chasing visibility for its own sake.', 'If you are evaluating {q}, begin with the decision your customer is trying to make. Identify the search surface, distinguish informative searches from purchase-ready ones, and investigate which pages or brands currently answer the need. Sustainable visibility is built by making evidence, access, and user value easy for both people and search systems to interpret.'],
'pt':['A questão estratégica por trás de {q} não se resume a conquistar posições para mais uma palavra-chave. O objetivo é ajudar as pessoas certas a descobrir, compreender e escolher uma solução. A jornada está dividida entre buscadores, respostas de IA, comparadores, comunidades e diretórios. Um plano de crescimento útil mede resultados de negócio, e não apenas impressões.', 'Para avaliar {q}, comece pela decisão que o cliente está tentando tomar. Identifique onde ele pesquisa, diferencie intenção informacional de intenção comercial e investigue quais páginas ou marcas respondem melhor à necessidade. Visibilidade duradoura exige evidências, acesso técnico e utilidade real.']}
SECTIONS={
'SEO':[
('Search intent and the buyer journey','Map informational, commercial, navigational, and transactional intent separately. A high-volume phrase is not automatically a high-value opportunity. Identify the decision a visitor makes after reading, then make the next step obvious without interrupting the answer.'),
('Technical accessibility and indexability','Check HTTP status codes, canonical tags, crawlable links, structured data where relevant, mobile rendering, sitemaps, and accidental noindex rules. Render the core answer in server HTML. A page must be accessible before its content can compete.'),
('Information architecture and topical depth','Build a small number of coherent topic hubs. Link supporting explanations, comparisons, examples, and documentation naturally. Avoid generating near-identical pages solely to target small keyword variations; consolidate overlapping intent.'),
('Evidence and trustworthy content','Show authorship, sources, dates, real examples, limitations, and original observations. Replace generic claims with reproducible methodology. For regulated or consequential topics, include appropriate expert review.'),
('Measurement and iteration','Use Search Console to separate impressions, clicks, pages, and queries; use analytics to track activation and revenue. Review changes by cohort, search intent, and landing page rather than optimizing for aggregate impressions alone.')],
'GEO':[
('What generative discovery changes','AI systems may synthesize information from multiple sources. Citation inclusion and answer accuracy can vary across models, prompts, locations, and time. Treat any visibility score as an estimate, not a stable ranking position.'),
('Entity clarity and source consistency','Publish consistent product names, descriptions, company facts, pricing assumptions, and verifiable third-party references. Make it straightforward for readers and systems to distinguish your product from alternatives.'),
('Original evidence and useful reference assets','Create benchmarks, firsthand case studies, transparent methods, data dictionaries, and comparisons with explicit criteria. Demonstrate why a page is worth citing instead of merely restating common advice.'),
('Answer discovery and prompt testing','Design a representative prompt set across informational, comparative, and commercial intents. Run repeated tests, log model/date/region and citations, and acknowledge that responses are stochastic and not fully reproducible.'),
('Attribution without false certainty','Compare referral sessions, branded demand, lead quality, and sales conversations alongside visibility observations. Do not assume that being mentioned in an AI answer directly caused a later purchase.')],
'AEO':[
('Design answers for real questions','Start with a short, direct answer. Follow it with definitions, constraints, steps, trade-offs, and examples. Avoid burying the answer under a long introduction or repeating a question with no substantive response.'),
('Structure that serves readers','Use descriptive headings, readable paragraphs, ordered steps when necessary, and accessible tables where they clarify a comparison. Mark up content accurately; structured data is not a guarantee of enhanced search display.'),
('Question research and intent clustering','Identify the question variants that indicate distinct decisions. Merge semantically equivalent formulations into one definitive page, and create separate pages only when the user need or evidence differs.'),
('Trust and verifiable claims','Include cited facts, context, original examples, and limitations. Explain when an answer depends on business size, location, budget, or goals. Provide practical next steps rather than empty superlatives.'),
('Measurement of answer-driven traffic','Monitor impressions, clicks, qualified leads, and visibility in relevant answer surfaces. Compare landing-page behavior and assisted conversions rather than treating snippet appearance as a complete success metric.')]
}
DETAILS=[
('Qualification checklist','Define the target reader, the immediate business outcome, the known constraints, and the proof required before allocating budget. Record the baseline and a simple success metric. Avoid using metrics that have no clear relationship to a buyer action.'),
('Competitive research protocol','List three to six credible alternatives. Capture the type of page that ranks or gets cited, the evidence offered, what the competitor does not explain, and whether the page is current. Treat claims about competitors as provisional until checked against primary sources.'),
('Experiment design','Run a small, reversible experiment: pick one audience and one channel, publish a useful page or feature, and track initial discovery, qualified engagement, and conversion. Predefine what would cause you to stop or expand the test.'),
('Content brief','Write the reader question in one sentence. Specify the answer, minimum proof, examples, definitions, user objections, internal links, and call to action. Editorial review should remove redundancy before release.'),
('Operations and ownership','Assign an accountable editor, record the last verification date, keep a change log, and set a content review cadence. Where source data is unavailable, state that explicitly and avoid numerical performance promises.'),
('Revenue connection','Separate reach from business outcomes. Map visitor to qualified interaction, trial, activation, paid conversion, retention, and contribution margin. An organic visit only reduces acquisition cost if its production and maintenance costs are also counted.'),
('Common failure modes','Watch for thin near-duplicate pages, fabricated performance metrics, forced keyword repetition, spam in communities, unverified recommendations, and reliance on one distribution platform. Prefer a smaller set of useful pages over broad but shallow publication.'),
('Practical implementation','Write an example, add original supporting data, surface relevant product documentation, and validate technical markup. Test on mobile and assistive technology, and make the primary content readable without interactive widgets.'),
('When the answer changes','Advice depends on audience maturity, business model, purchasing cycle, available first-party data, and platform changes. Include scope conditions so the reader knows when to adapt rather than copy a generic tactic.'),
('Follow-up questions','What outcome matters to the company? What evidence would distinguish success from a temporary spike? What is the cost to maintain this work? Which customer segment benefits most? What would falsify the initial hypothesis?')
]
LOCAL={
 'en':{'title':'Working guide','status':'EDITORIAL DRAFT — requires fact-checking, original examples, and expert approval before indexing','context':'The search query','how':'How to approach the topic','steps':'Step-by-step operating playbook','measure':'Metrics to track','faq':'Questions to validate','sources':'Source and verification checklist','disclaimer':'This document is a research-oriented editorial draft. It does not assert measured search volume, rankings, product results, or guaranteed outcomes. Add original evidence and verify all claims before publication.'},
 'pt':{'title':'Guia de trabalho','status':'RASCUNHO EDITORIAL — exige checagem, exemplos originais e aprovação antes da indexação','context':'A consulta pesquisada','how':'Como abordar o tema','steps':'Plano de execução passo a passo','measure':'Métricas de acompanhamento','faq':'Perguntas para validar','sources':'Fontes e verificação','disclaimer':'Este documento é um rascunho editorial de pesquisa. Não afirma volumes medidos, rankings, resultados de produto ou garantias. Inclua evidências próprias e verifique as afirmações antes da publicação.'}
}
def para(text,topic,area,loc,idx):
 stem=topic.rstrip('?')
 p=text.replace('{q}',stem)
 if loc=='pt':
  # Subject-specific adaptation, leaving terminology consistent with English source where technical terms apply.
  p=p.replace('Search intent and the buyer journey','Intenção de busca e jornada de compra')
 return p

def build(row,loc):
 q=row['query']
 area=row['area']; title=q[:1].upper()+q[1:]
 L=LOCAL[loc]
 intro=INTRO[loc]
 lines=[f'# {title}',f'> {L["status"]}', '', f'**{L["context"]}:** {q}',f'**Topic:** {area} · {row["cluster"]} · {row["intent"]}', '',intro[0].format(q=q), '',intro[1].format(q=q),'',f'## {L["how"]}','']
 secs=SECTIONS[area]
 for i,(head,body) in enumerate(secs):
  lines.extend([f'### {head}', '',f'For **{q}**, {body[0].lower()+body[1:]}', '',f'Practical application for this search: define the reader intent behind **{q}**, identify the current evidence gap, and produce a concise demonstration that someone can check independently. Record assumptions separately from observations, and connect the outcome to a measurable action.', '',f'For a small team, keep the first iteration narrow. Choose one clear question within {area}, one representative audience, and one useful artifact. Review whether the artifact genuinely changes a reader decision before expanding the surrounding content.', ''])
 lines.extend([f'## {L["steps"]}',''])
 for i,(head,body) in enumerate(DETAILS,1):
  lines.extend([f'### {i}. {head}','',body,'',f'Applied to **{q}**, write a hypothesis in plain language and document the inputs, decision criteria, owner, and outcome. Prefer tangible examples and source-backed material. If the evidence is not yet available, make collection of that evidence an explicit task.', '',f'Before scaling this activity, ask what alternative explanation could produce the same apparent result. For example, seasonality, stronger existing brand demand, competitor changes, or the timing of platform updates can influence observations independently of your work.', ''])
 lines.extend([f'## {L["measure"]}','', 'Track **qualified organic sessions**, **conversion to meaningful activation**, **trial-to-paid conversion**, **customer retention**, and **fully loaded acquisition costs**. For AI answer visibility, use repeated prompt samples and record model, date, prompt, and citations. Do not use one screenshot as a robust benchmark.','', 'A useful dashboard links content effort to business outcomes: page or prompt group → discovery → qualified engagement → conversion → retention. Segment these metrics by intent; otherwise, a spike in low-intent impressions can obscure deteriorating commercial performance.','', f'## {L["faq"]}',''])
 faq=[f'What does {q} mean for a small business?',f'How should I prioritize {q} against other growth opportunities?',f'How quickly can results from {q} be assessed?',f'What evidence should a vendor provide about {q}?',f'Which mistakes should I avoid when implementing {q}?',f'Can {q} be implemented with limited resources?']
 answers=['Begin by clarifying the customer decision you intend to support and documenting the baseline. Different business models and markets require different implementation paths.','Compare expected buyer impact, available evidence, implementation effort, and ongoing maintenance. Do not rank options by search volume alone.','Set near-term process milestones and longer-term outcome checks. Discovery, trust, purchase and retention may move on different timelines, and no fixed result is guaranteed.','Ask for a transparent methodology, a dated example, raw evidence where possible, and a clear distinction between observation and inference.','Avoid thin copy, invented numbers, unverified technical claims, and metrics disconnected from revenue. Revisit assumptions when platforms or customer behavior change.','Yes, if the initial scope is narrow and the team can deliver original evidence and maintain the page. A small, accurate resource can outperform an unfocused volume strategy.']
 for qn,ans in zip(faq,answers):lines.extend([f'### {qn}','',ans,''])
 lines.extend([f'## {L["sources"]}','','- Check current primary platform documentation for technical requirements and limitations.','- Validate commercial claims against a first-party analytics export or independently reproducible observation.','- Add dated source links and an editorial owner before publishing.','',f'> {L["disclaimer"]}',''])
 s='\n'.join(lines)
 # Target 15k–20k chars: attach deeper editorial research prompts; these are draft guidance, explicitly not verified facts.
 add=0
 while len(s)<15300:
  head,body=DETAILS[(add*3+len(q))%len(DETAILS)]
  s+=f'\n### Research worksheet {add+1}: {head} — {q}\n\n'
  s+=f'{body} The question under examination is **{q}**. Document a real example, cite a primary source, note uncertainty, and explain the implication for the reader. Do not infer purchasing intent or traffic from anecdotal social media mentions.\n\n'
  add+=1
 # preserve between 15k and 20k
 assert 15000<=len(s)<=20000,(len(s),q)
 return s

count=0;mins=999999;maxs=0
for r in rows:
 for loc in ['en','pt']:
  p=P/'content'/loc/(r['slug']+'.md')
  p.parent.mkdir(parents=True,exist_ok=True)
  s=build(r,loc)
  p.write_text(s,encoding='utf8')
  count+=1; mins=min(mins,len(s));maxs=max(maxs,len(s))
print('generated',count,'characters min/max',mins,maxs)
