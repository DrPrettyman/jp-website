import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import ContentBlock from '../../components/ContentBlock';
import { Gamepad2 } from 'lucide-react';

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

const SteamMarketGapProject = () => {
  return (
    <Layout>
      <SEO title="Steam Market Gap Analysis" description="A data-driven analysis of the Steam games marketplace to identify underserved genres and market opportunities." path="/projects/steam-market-gap" />
      <ContentBlock title="Steam Market Gap Analysis" icon={Gamepad2} githubUrl="https://github.com/DrPrettyman/SteamMarketGapAnalysis" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Idea</h2>

            <p className="mb-4 text-justify">
              Say you wanted to build a game for Steam. You could look at what's popular and try to compete, but the
              more interesting question is: where is there demand that nobody is serving well? I wanted to see if I could
              answer that with data, so I built a pipeline that pulls from three different APIs, trains a recommendation
              engine, and scores over 140,000 market niches by how much opportunity they represent.
            </p>

            <p className="mb-8 text-justify">
              It's part recommendation system, part market research tool. The recommender tells you what games a
              given user would like; the market gap analysis tells you where a new game could actually make money.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Data Collection</h2>

            <p className="mb-4 text-justify">
              No single API gives you everything you need here. The Steam Web API has user behaviour (who plays what,
              and for how long) but not much about the games themselves. SteamSpy has ownership estimates, pricing, and
              review scores. RAWG fills in genres, platforms, Metacritic scores, and release dates. So the pipeline
              collects from all three:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Source</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">What it provides</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Steam Web API</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">User game libraries and playtime</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10,000 users via BFS friend-graph crawl</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">SteamSpy</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Ownership estimates, price, review scores, tags</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">50,005 games</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">RAWG</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Genres, platforms, Metacritic scores, release dates</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">9,951 matched titles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
              The Steam collection stage is probably the most interesting part. It starts from a few seed user IDs
              and does a breadth-first crawl of the Steam friend graph, picking up each user's game library along the way.
              Playtime is the key signal here: someone who's put 200 hours into a game is telling you something very
              different from someone who bought it and never opened it. About 54% of the user-game pairs in the
              dataset have zero playtime, so those get filtered out.
            </p>

            <p className="mb-4 text-justify">
              Since Steam and RAWG don't share game IDs, matching titles across the three sources required fuzzy
              string matching (via the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">thefuzz</code> library).
              The whole pipeline supports checkpointing too, which turned out to be essential given RAWG's rate limits.
            </p>

            <p className="mb-4 text-justify">
              Once the data is merged, you can start looking at how genres relate to each other. The co-occurrence
              matrix is a good place to start. Action + Indie is by far the most common pairing, which won't surprise
              anyone, but the clusters around Simulation, Strategy, and RPG are more interesting:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/steam-market-gap/genre_cooccurrence_heatmap.webp"
                alt="Genre co-occurrence matrix showing which genre pairs appear together most frequently"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Hybrid Recommendation Engine</h2>

            <p className="mb-4 text-justify">
              The recommender has two halves. The collaborative filtering side uses ALS (Alternating Least Squares,
              via the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">implicit</code> library) to learn
              64-dimensional embeddings for users and games from the playtime matrix. I log-transform the playtime
              values with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">log1p</code> so that someone
              with 5,000 hours in a game doesn't have 50x the weight of someone with 100 hours.
            </p>

            <p className="mb-4 text-justify">
              The content-based side computes cosine similarity over feature vectors built from genre one-hot encoding,
              tag TF-IDF (up to 200 terms), price buckets, platform flags, and normalised Metacritic scores. This is
              mainly useful for the cold-start problem: new games with few interactions can still get recommended
              based on what they look like.
            </p>

            <p className="mb-4 text-justify">
              The two scores are blended per-item, with a confidence weight based on how many interactions that game has.
              Popular games lean on collaborative filtering; obscure ones lean on content:
            </p>

            <CodeBlock title="Hybrid blending">
{`# Per-item confidence weight
alpha = min(interaction_count / threshold, 1.0)  # threshold = 100

# Popular games trust CF; cold-start games trust content similarity
hybrid_score = alpha * cf_score + (1 - alpha) * cb_score`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              The scatter below gives a sense of the data the model is working with. Each point is a game, plotted by
              median playtime against estimated owners, coloured by genre. The range is enormous: four orders of magnitude
              on both axes.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/steam-market-gap/playtime_vs_owners_scatter.webp"
                alt="Playtime vs ownership scatter plot coloured by genre"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">Revenue-Weighted Evaluation</h3>

            <p className="mb-8 text-justify">
              Standard recommendation metrics like Precision@K treat all correct recommendations equally. But if the
              goal is market intelligence, recommending a $30 game matters more than recommending a free-to-play one.
              So I added a revenue-weighted hit rate that weights each hit by price times estimated ownership. The hybrid
              model scored 14.8% at K=20 on this metric, versus 4.8% for a popularity baseline (about 3x better).
            </p>

            <h2 className="text-2xl mb-4 font-bold">Market Gap Scoring</h2>

            <p className="mb-4 text-justify">
              This is really the point of the whole project. I define a "niche" as a combination of 2 or 3 Steam tags
              (e.g. "Multiplayer + Open World + RPG"). Since every game has multiple tags, the combinatorial explosion
              gives you over 140,000 distinct niches. For each one I compute four things:
            </p>

            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Supply</strong>: how many games exist in this niche</li>
              <li><strong>Demand</strong>: total estimated ownership across all games in the niche</li>
              <li><strong>Engagement</strong>: median playtime</li>
              <li><strong>Satisfaction</strong>: median review score</li>
            </ul>

            <p className="mb-4 text-justify">
              These get normalised to [0, 1] and combined into an opportunity score. The idea is simple: you want
              niches where lots of people play, they play for a long time, they're happy with what they find, but
              there aren't that many games competing:
            </p>

            <CodeBlock title="Opportunity scoring">
{`# Normalise each component to [0, 1]
# Inverse supply: fewer competitors = higher opportunity
opportunity_score = (demand_norm * engagement_norm * satisfaction_norm) / supply_inv_norm`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              The heatmap shows the top-scoring niches with their individual component scores. "Multiplayer + Open World"
              scores well across the board. Some of the e-sports niches have very high revenue but low competition,
              though that's partly because a few massive titles (CS2, Valorant) dominate those categories:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/steam-market-gap/niche_metrics_heatmap.webp"
                alt="Niche quality scorecard heatmap showing normalised scores for top market niches"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              I also added a recency trend: comparing revenue from games released in the last 3 years against older
              titles in the same niche. A ratio above 1.0 means newer games are outperforming the older ones, which
              is a decent signal that the niche is growing rather than stagnating.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Top Opportunities</h3>

            <p className="mb-4 text-justify">
              "Multiplayer + Open World" came out on top (690 games, 1.47B total players). "Adventure + Open World"
              had the strongest new-entrant potential, with estimated revenue of $217K to $20M and a 2.9x recency trend.
              "Multiplayer + Shooter" had the highest growth signal at 3.9x, meaning recent titles were earning nearly
              four times what older games in the same space managed.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/steam-market-gap/revenue_range_comparison.webp"
                alt="Revenue potential by market niche showing median and interquartile range"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Price Sensitivity</h2>

            <p className="mb-4 text-justify">
              I also fitted a log-linear model to see how price relates to ownership across genres:
            </p>

            <CodeBlock title="Price model">
{`# Observational model (not causal!)
log(owners_mid) ~ price_dollars + genre + review_score + platform_count`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              The global coefficient is actually positive (+0.74% per dollar), which sounds wrong until you think about
              it: better games cost more <em>and</em> sell more. It's a textbook endogeneity problem, and the model
              isn't trying to hide that. The R² is only 0.18. Quality dominates pricing as a predictor of sales.
            </p>

            <p className="mb-4 text-justify">
              The genre-level breakdown is more useful. Free-to-Play and MMO categories are the most price-sensitive,
              while other genres are more tolerant. The violins below show revenue distribution by genre on a log
              scale. The spread in some genres is huge, which suggests the market isn't very efficient: there's room at
              lots of price points.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/steam-market-gap/revenue_by_genre_violin.webp"
                alt="Revenue distribution by genre shown as violin plots on a log scale"
                className="rounded-lg max-w-xl w-full"
              />
            </div>

            <h2 className="text-2xl mt-8 mb-4 font-bold">Dashboard and Pipeline</h2>

            <p className="mb-4 text-justify">
              Everything feeds into a Streamlit dashboard with five tabs: market overview, niche explorer,
              recommender results, price analysis, and data quality. The niche explorer is the most useful one,
              letting you filter by tag combination, sort by opportunity score, and drill into individual niches.
            </p>

            <p className="mb-4 text-justify">
              The full pipeline runs as CLI commands:
            </p>

            <CodeBlock title="Running the pipeline">
{`python -m src.collect    # Steam crawl → SteamSpy → RAWG → clean & merge
python -m src.train      # Train hybrid recommender
python -m src.analyse    # Market gap scoring & price analysis
python -m src.visualise  # Generate charts
streamlit run src/visualisation/dashboard.py  # Interactive dashboard`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              There are 82 tests covering the data cleaning, merging, feature engineering, recommender, market gap
              scoring, and evaluation metrics. They all run on synthetic data, so no API keys needed.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Multi-source pipeline: Steam API + SteamSpy + RAWG (50K+ games)</li>
                <li>Hybrid recommender (ALS + content-based), 3x popularity baseline on revenue-weighted hit rate</li>
                <li>140,000+ niches scored by opportunity, with revenue estimates ($200K–$21M for top niches)</li>
                <li>Recency trend detection for emerging niches</li>
                <li>Genre-level price sensitivity modelling (R² = 0.18, quality dominates)</li>
                <li>Streamlit dashboard with 5 tabs</li>
                <li>82 unit tests on synthetic data</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default SteamMarketGapProject
