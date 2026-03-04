import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { ShoppingCart } from 'lucide-react';

export const meta = () => generateMeta({ title: "Private Label Opportunity Engine", description: "Data pipeline analysing 2.57M EU food products to identify where retailers can launch health-positioned private label products into underserved nutritional gaps.", path: "/projects/private-label" });

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

const PrivateLabelProject = () => {
  return (
    <Layout>
      <ContentBlock title="Private Label Opportunity Engine" icon={ShoppingCart} githubUrl="https://github.com/DrPrettyman/PrivateLabelOpportunities" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Question</h2>

            <p className="mb-4 text-justify">
              European grocery retailers earn 25-30% margins on private label products, compared to roughly 1% on national
              brands. So if you're a supermarket deciding where to invest in your own-brand range, the question isn't
              really <em>whether</em> to do it, but <em>where</em>. Which product categories have the biggest gap between
              what consumers are looking for (healthier options) and what's actually on the shelves?
            </p>

            <p className="mb-4 text-justify">
              I built a pipeline to answer this using open data. The core dataset is Open Food Facts, a crowd-sourced
              database of 2.57 million food products across 27 EU countries, enriched with pricing scraped from
              Mercadona (Spain) and Albert Heijn (Netherlands). The idea is to quantify, per product category, how
              unhealthy the current offerings are and how little private label has done to fill that gap.
            </p>

            <p className="mb-4 text-justify">
              The headline finding: 73% of EU food products score Nutri-Score C or worse, while private label penetration
              among healthy (A/B) alternatives sits at about 10%.
            </p>

            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>Interactive dashboard:</strong> Explore the full results in the <a href="https://pl-dashboard-production.up.railway.app" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">live Streamlit app</a>, with filterable category landscapes, nutritional gap quadrants, and opportunity rankings.
              </p>
            </div>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/executive_dashboard.webp"
                alt="Four-panel executive dashboard showing unhealthy product dominance, healthy PL gap, overall opportunity ranking, and sweet-spot scatter"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Data Collection</h2>

            <p className="mb-4 text-justify">
              Open Food Facts is large but messy. Product names are nested arrays of structs, nutriments are stored the
              same way, and country tags come back as numpy arrays rather than plain lists. About 68% of products
              are missing their official Nutri-Score grade, so I computed it for 706,000 of those using the published 2023
              algorithm. That brought coverage from 32% up to 59%.
            </p>

            <p className="mb-4 text-justify">
              For pricing data I scraped two retailers. Mercadona's API is straightforward REST with a three-level
              category hierarchy, but it doesn't include barcodes, so matching to Open Food Facts required fuzzy name
              matching (51% match rate via <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">rapidfuzz</code>).
              Albert Heijn's mobile API needs anonymous auth with a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">clientId: "appie"</code> header,
              but it does return brand names and Nutri-Score grades directly. Match rate there was 41%.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Source</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Products</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Join Method</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Match Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Open Food Facts</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2,568,269</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Base dataset</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Mercadona (Spain)</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3,225</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fuzzy name matching</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">51%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Albert Heijn (NL)</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">11,209</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">EAN barcode + fuzzy</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">41%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-8 text-justify">
              Private label detection is its own problem. I compiled a list of 80+ known PL brand names across 15
              European retailers (Hacendado, AH Biologisch, etc.), but that only catches products where the brand field
              is actually populated. To fill the gaps I trained a TF-IDF character n-gram classifier on the
              labelled supermarket data. It achieves a cross-validated F1 of 0.996, which makes sense given how
              distinctive PL product naming patterns are.
            </p>

            <h2 className="text-2xl mb-4 font-bold">The Nutritional Landscape</h2>

            <p className="mb-4 text-justify">
              Sorting 45 food categories by the proportion of products scoring C, D, or E on Nutri-Score
              gives you a pretty stark picture. Categories like Taralli, Sweet Pies, and Bread Coverings are almost
              entirely unhealthy. Even broad categories like Snacks (96% CDE) and Breakfast (98% CDE) have almost no
              healthy products on offer.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/nutriscore_by_category.webp"
                alt="Stacked bar chart showing Nutri-Score grade distribution across 45 food categories, sorted by percentage of unhealthy products"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              But a category being unhealthy isn't by itself an opportunity. What matters is whether private label
              has already moved into the healthy end of that category. The quadrant chart below puts these two
              dimensions together. The x-axis is the percentage of products scoring C/D/E (unhealthiness), and
              the y-axis is private label penetration among A/B products. Bottom-right is where you want to look:
              lots of unhealthy products, very little healthy private label.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/nutritional_gap_quadrant.webp"
                alt="Scatter plot with %CDE on x-axis and PL penetration at A/B grades on y-axis, bubble size indicating product count, coloured by nutritional gap score"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-8 text-justify">
              I combine these into a single "nutritional gap" metric: the fraction of products scoring CDE,
              multiplied by one minus the PL penetration at healthy grades. Breakfast leads at 0.935, followed
              by Snacks (0.879) and Desserts (0.839).
            </p>

            <h2 className="text-2xl mb-4 font-bold">What's Making Them Unhealthy?</h2>

            <p className="mb-4 text-justify">
              Looking at the median nutrient profile of CDE products in each high-opportunity category tells you what
              a reformulation effort would actually need to target. The heatmap below shows the six nutrients that
              feed into the Nutri-Score algorithm, with values normalised so the colour scale is comparable across
              nutrients.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/nutrient_heatmap_top10.webp"
                alt="Heatmap of median nutrient values for CDE products across top opportunity categories"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              Breakfast products are overwhelmingly a sugar problem (55g/100g median). Fats & Oils is, unsurprisingly,
              saturated fat (28g/100g). Snacks have high sugar <em>and</em> high fat, which makes reformulation
              harder because you're fighting on two fronts.
            </p>

            <p className="mb-4 text-justify">
              To quantify how feasible reformulation actually is, I ran a binary search on each category's median
              nutrient profile: what's the minimum reduction in sugar, salt, or saturated fat needed to push the
              Nutri-Score from its current grade to a B?
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/reformulation_reductions.webp"
                alt="Bar chart showing required nutrient reductions to achieve Nutri-Score B for each high-gap category"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-8 text-justify">
              Crepes & Galettes needs a 37% sugar reduction and 56% sat fat reduction, which is aggressive but
              within range for food science. Taralli needs about 40% salt reduction. But Breakfast needs an 84%
              sugar reduction, which essentially means making a different product. And Fats & Oils needs 96% sat fat
              reduction, which is physically impossible while remaining oil.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Composite Scoring</h2>

            <p className="mb-4 text-justify">
              The nutritional gap alone doesn't tell you where to invest. You also want to know: is the category
              big enough to matter? Is it dominated by a few brands (hard to enter) or fragmented (easy)?
              Can the products actually be reformulated? What kind of price premium can PL capture?
            </p>

            <p className="mb-4 text-justify">
              I built a six-component composite score, with each component normalised to [0, 1]:
            </p>

            <CodeBlock title="Opportunity score components">
{`opportunity = 0.25 × nutritional_gap       # how big is the health gap?
            + 0.15 × (1 - HHI)              # brand fragmentation (lower = easier entry)
            + 0.15 × log(category_size)      # market size
            + 0.15 × reformulation_ease      # can it actually be made healthier?
            + 0.15 × (1 - PL_saturation)     # room for new PL entrants
            + 0.15 × price_gap_margin        # brand-to-PL price premium`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              Nearly all categories have low brand concentration (HHI below 0.05), meaning the markets are highly
              fragmented. That's good news for a new entrant. The median PL discount across all categories is 22.4%
              below branded equivalents, which gives decent margin headroom.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/opportunity_scores_breakdown.webp"
                alt="Stacked bar chart showing the six opportunity score components for the top 20 categories"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              Crepes & Galettes comes out on top (0.689), mainly because its reformulation path is the most realistic.
              Condiments & Sauces (0.672) benefits from being a large market with a clear salt-reduction path.
              Breakfast (0.663) has the highest raw nutritional gap but gets penalised on reformulation feasibility.
              Snacks (0.657) is the biggest market by far at 119,000 products.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Sensitivity Analysis</h3>

            <p className="mb-4 text-justify">
              Any composite index raises the question of how sensitive the rankings are to the choice of weights.
              I ran 1,000 Monte Carlo simulations drawing weights from a Dirichlet distribution, then checked how
              much each category's rank shifts under different weighting schemes.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/private-label/weight_sensitivity_heatmap.webp"
                alt="Heatmap showing rank sensitivity of top 15 categories under different weight emphasis scenarios"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-8 text-justify">
              The top four (Crepes & Galettes, Condiments & Sauces, Breakfast, Snacks) stay in the top five across
              almost all scenarios. Snacks jumps to 1st under a size-heavy weighting (it's the largest
              market). Taralli is the most volatile, jumping between 1st and 37th depending on whether you
              prioritise brand fragmentation or reformulation ease.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Predictive Modelling</h2>

            <p className="mb-4 text-justify">
              As a supplementary analysis, I trained a gradient boosted classifier to predict which products become
              PL "leaders" (top 3 by scan count in each category). The model uses 17 features (9 nutrients,
              Nutri-Score grade, NOVA classification, and 5 label flags) and achieves a cross-validated AUC of 0.653.
              That's modest, which isn't surprising given that scan counts are a noisy proxy for actual sales.
            </p>

            <p className="mb-8 text-justify">
              The useful output here isn't prediction accuracy, it's the feature importances. Energy, sugars, salt,
              and protein are the top predictors, and PL leaders tend to have slightly lower sugar (2.8 vs
              3.6g/100g) than the category average. The direction is consistent with the gap analysis: there's a
              demonstrated consumer preference for marginally healthier products within PL ranges.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Dashboard and Pipeline</h2>

            <p className="mb-4 text-justify">
              The full pipeline runs as a sequence of CLI scripts: download the 4.4 GB OFF Parquet from Hugging Face,
              run the supermarket scrapers, then build the cleaned and joined dataset. The analysis
              notebooks go through EDA, category landscape, nutritional gaps, opportunity scoring, and predictive
              modelling in order.
            </p>

            <p className="mb-4 text-justify">
              Everything feeds into
              a <a href="https://pl-dashboard-production.up.railway.app" className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">Streamlit dashboard</a> with
              four tabs: category landscape (treemap and HHI bar chart), nutritional gaps (quadrant scatter with
              interactive filtering), opportunity ranking (sortable composite scores with component breakdown), and
              data quality (coverage stats and limitations). It loads from pre-computed sample Parquets, so there's
              no heavy processing at runtime.
            </p>

            <p className="mb-8 text-justify">
              There are 51 tests covering Nutri-Score computation, EAN and fuzzy joining, gap analysis,
              opportunity scoring, and the brand classifier. All run on synthetic data, no downloads needed.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>2.57M EU food products analysed across 27 countries</li>
                <li>Multi-retailer scraping pipeline (Mercadona, Albert Heijn) with EAN and fuzzy matching</li>
                <li>Nutri-Score computed for 706K products missing official grades</li>
                <li>73% of products score C/D/E; PL penetration at A/B grades is ~10%</li>
                <li>6-component composite opportunity score with Monte Carlo sensitivity analysis</li>
                <li>Top opportunities: Crepes & Galettes, Condiments & Sauces, Breakfast, Snacks</li>
                <li>Interactive Streamlit dashboard deployed on Railway</li>
                <li>51 tests on synthetic data</li>
              </ul>
            </div>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default PrivateLabelProject
