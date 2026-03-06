import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { Scale } from 'lucide-react';

export const meta = () => generateMeta({ title: "EU Food Regulation Intelligence", description: "A RAG pipeline that parses 243 EU food regulations, routes products to applicable laws via deterministic matching, and extracts compliance requirements with zero hallucinations.", path: "/projects/eu-food-regulation" });

const CodeBlock = ({ children, title }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    {title && (
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        {title}
      </div>
    )}
    <pre className="bg-gray-50 dark:bg-gray-900 p-4 overflow-x-auto text-sm">
      <code className="text-gray-800 dark:text-gray-200">{children}</code>
    </pre>
  </div>
);

const EUFoodRegulationProject = () => {
  return (
    <Layout>
      <ContentBlock title="EU Food Regulation Intelligence" icon={Scale} githubUrl="https://github.com/DrPrettyman/FoodSafetyIntelligence" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

            <p className="mb-4 text-justify">
              If you're a food company launching a product into the EU, you face dozens of overlapping regulations
              across 17 regulatory categories. Compliance consultants charge €300-500 an hour to navigate EUR-Lex
              and tell you which articles apply to your product. Most of what they're doing is structured lookup:
              given a product type, its ingredients, any health claims, and its packaging, which regulations are
              relevant and what do they require?
            </p>

            <p className="mb-4 text-justify">
              I wanted to see how far you could automate that with a RAG pipeline. The system parses 243 EU
              regulations from EUR-Lex, extracts defined terms and cross-references, routes products to applicable
              laws deterministically (no LLM involved), then uses semantic search and LLM extraction to produce
              article-level compliance checklists.
            </p>

            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>Try it:</strong> The <a href="https://foodsafetyintelligence.up.railway.app" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">live Streamlit app</a> lets
                you select a product type, ingredients, and claims, then generates a compliance checklist with
                links back to EUR-Lex for each cited article.
              </p>
            </div>

            <h2 className="text-2xl mb-4 font-bold">Pipeline Architecture</h2>

            <p className="mb-4 text-justify">
              The pipeline has five stages. The first three are deterministic and run without any LLM calls,
              which is deliberate: the routing layer guarantees the LLM can only see regulations that were
              already selected by structured matching. It can't hallucinate a regulation that wasn't routed.
            </p>

            <h3 className="text-xl mb-3 font-semibold">1. Corpus Ingestion</h3>

            <p className="mb-4 text-justify">
              EUR-Lex documents come in at least three different HTML formats spanning two decades of web
              standards. The parser handles all three (XHTML, old HTML, and a mid-2000s variant) and extracts
              2,823 articles across 243 regulations. Along the way it builds an entity index: 702 defined terms
              (e.g. "novel food means...", "traceability shall mean...") and 1,032 cross-references between
              regulations.
            </p>

            <p className="mb-4 text-justify">
              The corpus is heavily skewed. Official controls alone account for 1,909 of the 5,152 chunks,
              while food supplements has just 22. This matters for retrieval: a broad semantic search over the
              whole corpus would drown in official controls articles. The routing layer exists partly to solve
              this problem.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/eu-food-regulation/chunk_distribution.webp"
                alt="Horizontal bar chart showing chunk counts across 17 regulatory categories, with Official Controls dominating at 1,909 chunks"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">2. Deterministic Routing</h3>

            <p className="mb-4 text-justify">
              Given structured product parameters (product type, ingredients, claims, packaging, keywords), the
              router maps them to applicable CELEX numbers. It draws on two sources: a manual category routing
              table encoding domain knowledge, and the entity index for term-level matching. The General Food
              Law and FIC labelling regulation are always included since they apply to everything.
            </p>

            <CodeBlock title="routing.py — category mapping (excerpt)">
{`CATEGORY_ROUTING = {
    "novel food": ["novel_food"],
    "food supplement": ["food_supplements"],
    "health claim": ["nutrition_health_claims"],
    "food additive": ["food_additives"],
    "allergen": ["labelling_fic"],
    "plastic packaging": ["food_contact_materials"],
    "contaminant": ["contaminants"],
    ...
}`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              This is the key design decision. A lot of RAG systems use the LLM to decide what's relevant, but
              for regulatory compliance you really don't want that. Missed regulations are false negatives
              with real consequences, and the routing logic is structured enough that a lookup table with
              entity matching handles it well.
            </p>

            <h3 className="text-xl mb-3 font-semibold">3. Cross-Reference Expansion</h3>

            <p className="mb-4 text-justify">
              EU regulations reference each other constantly. After initial routing, the system does a 1-hop
              expansion: if Regulation A was routed and cites Regulation B, B gets added to the search pool
              with lower retrieval priority. This catches tangential requirements that the routing table
              wouldn't hit directly. It's a trade-off though, and it's the main source of false positives
              in the evaluation (more on that below).
            </p>

            <p className="mb-4 text-justify">
              The network below shows 136 regulations and 328 directed cross-references. The General Food
              Law sits at the centre (nearly everything references it), with Food Additives, Food Hygiene,
              and Novel Foods forming dense hubs. The structure explains why 1-hop expansion is both useful
              and noisy: a single hop from the General Food Law could pull in half the corpus.
            </p>

            <div className="my-8 flex justify-center">
              <img
                src="/images/eu-food-regulation/crossref_network.webp"
                alt="Network graph of 136 EU regulations connected by 328 directed cross-references, with General Food Law at the centre"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">4. Semantic Retrieval</h3>

            <p className="mb-4 text-justify">
              The retrieval stage uses all-MiniLM-L6-v2 via ONNX Runtime (no PyTorch dependency, just NumPy
              and a 15 MB model). Articles are chunked at the article level with paragraph sub-chunking, giving
              about 5,152 chunks. Search is hybrid: a broad query across all routed regulations, plus targeted
              per-regulation queries with tiered allocation (3+ results for core regulations, 1 for cross-refs).
            </p>

            <p className="mb-4 text-justify">
              The UMAP projection below gives a sense of the embedding space. Regulations cluster by category,
              which is what you'd hope for: food contact materials (orange) sit apart from novel foods (pink),
              and official controls (grey, the largest blob) separate cleanly from the rest. The
              second scatter shows a retrieval example for "novel food insect protein labelling requirements".
              The top 10 results (red) pull from several clusters, reflecting the cross-cutting nature of
              the query.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/eu-food-regulation/umap_scatter.webp"
                alt="UMAP scatter plot of 5,152 regulation chunks coloured by regulatory category, showing clear clustering"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <div className="my-6 flex justify-center">
              <img
                src="/images/eu-food-regulation/query_retrieval.webp"
                alt="UMAP scatter with query embedding and top 10 retrieval results highlighted, showing results spanning multiple clusters"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">5. LLM Extraction</h3>

            <p className="mb-4 text-justify">
              The retrieved articles go to an LLM (Anthropic, OpenAI, or a local Claude Code CLI call) with
              structured output via tool use / function calling. The LLM extracts <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ComplianceRequirement</code> objects:
              regulation ID, article number, requirement summary, type (labelling, composition, safety, etc.),
              priority, confidence, and a source text snippet. Because it only sees pre-routed articles, it
              can't fabricate citations.
            </p>

            <CodeBlock title="Structured extraction output (Pydantic schema)">
{`class ComplianceRequirement(BaseModel):
    regulation_id: str          # e.g. "32015R2283"
    article_number: str         # e.g. "Article 6(2)"
    requirement_summary: str    # plain-language description
    requirement_type: str       # labelling | composition | safety | procedural | ...
    priority: str               # mandatory | recommended | conditional
    confidence: float           # 0.0 - 1.0
    applicable_to: list[str]    # which product aspects trigger this
    conditions: str             # when this requirement applies
    cross_references: list[str] # related regulations/articles
    source_text_snippet: str    # verbatim from the regulation`}
            </CodeBlock>

            <h2 className="text-2xl mb-4 font-bold">Evaluation</h2>

            <p className="mb-4 text-justify">
              I built three evaluation scenarios with hand-curated ground truth: an insect protein bar (novel
              food, 18 requirements), a vitamin D supplement (food supplement, 17 requirements), and an
              allergen labelling case (17 requirements). 52 ground-truth requirements total, each annotated
              with regulation, article, type, and priority.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Precision</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.58</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Recall</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.69</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">F1</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.63</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Hallucination rate</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
              The zero hallucination rate is the number I care about most. In a compliance context, a
              fabricated citation is worse than a missed one: a user can always check what else might apply,
              but acting on a requirement that doesn't exist in the regulation is actively dangerous.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Failure Analysis</h3>

            <p className="mb-4 text-justify">
              The more interesting part of the evaluation is the failure analysis. Every false negative and
              false positive gets classified by root cause:
            </p>

            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>100% of false negatives are retrieval failures.</strong> The relevant articles existed
                in routed regulations but ranked outside the search window. The LLM never failed to extract
                a requirement from an article it actually saw.</li>
              <li><strong>56% of false positives come from cross-reference expansion.</strong> The 1-hop
                expansion adds tangential regulations that are technically relevant but not core to the
                query. Valid but noisy.</li>
            </ul>

            <p className="mb-8 text-justify">
              This tells you exactly where to invest next: a re-ranking layer (cross-encoder or LLM-based)
              between retrieval and extraction would address both problems. Push relevant articles higher
              in the search results to fix recall, and demote tangential cross-references to fix precision.
              The extraction layer itself is working well.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Deployment</h2>

            <p className="mb-4 text-justify">
              The system ships with three interfaces. The Streamlit app has a form where you select product
              type, ingredients, claims, and packaging from dropdowns extracted from the corpus, then
              generates a compliance checklist with tabs for requirements, retrieved articles, and routing
              detail. Each cited regulation links back to EUR-Lex.
            </p>

            <p className="mb-4 text-justify">
              There's also a FastAPI REST API with three endpoints (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/health</code>,{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/entities</code>,{' '}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">/compliance-check</code>), and a
              CLI for local use. The whole thing runs in Docker with no PyTorch dependency, just ONNX Runtime
              and NumPy for the embeddings.
            </p>

            <CodeBlock title="Running the pipeline">
{`python -m src.pipeline build      # parse EUR-Lex, build indexes (~30s)
python -m src.pipeline query       # CLI query
streamlit run app.py               # Streamlit dashboard
uvicorn src.api:app                # REST API`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              314 tests cover corpus loading, HTML parsing, chunking, routing, vector search, extraction,
              evaluation matching, and failure analysis.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>243 EU regulations parsed (2,823 articles, 702 defined terms, 1,032 cross-references)</li>
                <li>Deterministic routing layer — no LLM decides which regulations apply</li>
                <li>Semantic retrieval via ONNX embeddings (all-MiniLM-L6-v2, 15 MB, no PyTorch)</li>
                <li>Structured LLM extraction with zero hallucination rate across 52 ground-truth requirements</li>
                <li>Precision 0.58 / Recall 0.69 / F1 0.63 — bottleneck is retrieval, not extraction</li>
                <li>Streamlit UI + FastAPI REST API + CLI, Docker-deployable</li>
                <li>314 tests passing</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default EUFoodRegulationProject
