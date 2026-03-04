import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { ShieldAlert } from 'lucide-react';

export const meta = () => generateMeta({ title: "Fraud Detection", description: "A machine learning project tackling the IEEE-CIS fraud detection Kaggle competition.", path: "/projects/fraud-detection" });

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

const FraudDetectionProject = () => {
  return (
    <Layout>
      <ContentBlock title="Fraud Detection" icon={ShieldAlert} githubUrl="https://github.com/DrPrettyman/ieee-fraud-detection" maxWidth='4xl'>

          <div className="text-gray-700 dark:text-white">

            <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

            <p className="mb-4 text-justify">
              The <a href='https://www.kaggle.com/competitions/ieee-fraud-detection' className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">IEEE-CIS Fraud Detection</a> Kaggle
              competition from 2019 caught my eye as an interesting side project. What drew me in was the combination of challenges
              that make fraud detection genuinely tricky: severe class imbalance (only 3.5% of transactions are fraudulent),
              high dimensionality (590K transactions with 450+ features), and hundreds of anonymized features whose meaning
              must be inferred from patterns in the data.
            </p>

            <p className="mb-8 text-justify">
              Beyond the technical challenges, fraud detection presents an interesting business problem: aggressive prevention
              blocks legitimate customers, while lenient policies increase losses. You have to find the right trade-off.
              I was curious to see how far I could push a fairly simple approach, and
              the results turned out better than I expected: <strong>97.4% AUC</strong> on holdout data and, with some reasonable
              cost assumptions, potential savings of around <strong>$447K</strong> compared to no model at all.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Exploratory Data Analysis</h2>

            <p className="mb-4 text-justify">
              The dataset comes from Vesta Corporation and contains real e-commerce transactions. There are two tables:
              transaction data (590K rows, 394 columns) and identity data (144K rows, 41 columns). The identity data only
              exists for about 24% of transactions. Interestingly, transactions <em>with</em> identity data have a
              higher fraud rate (7.8%) than those without (2.1%). Counterintuitive, but it probably reflects
              that identity verification is triggered when fraud detection systems flag something suspicious.
            </p>

            <p className="mb-4 text-justify">
              A significant portion of the features are anonymized: 339 "V" features (Vesta's proprietary engineered features),
              14 "C" features (counts), and 15 "D" features (time deltas). With no documentation on what these mean, the only
              option is to analyse their distributions and correlations with fraud to infer their usefulness. Missing values
              are pervasive: 374 of 395 columns have at least some nulls, with many exceeding 50%:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/missing_values_distribution.webp"
                alt="Distribution of missing values across columns"
                className="rounded-lg max-w-xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">Temporal Patterns</h3>

            <p className="mb-4 text-justify">
              Fraud rates vary significantly by time of day. The plot below shows fraud rate binned by hour—there's a clear
              cyclical pattern, though without knowing the actual timezone we can't say whether fraud peaks at night or during
              business hours. What matters is that the pattern exists and can be captured:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/fraud_rate_by_time.webp"
                alt="Fraud rate by hour of day and day of week"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">Email Domain Signals</h3>

            <p className="mb-4 text-justify">
              One of the most striking findings was the <strong>email domain matching</strong> pattern. When the
              purchaser's email domain (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">P_emaildomain</code>) matches
              the recipient's (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">R_emaildomain</code>), the fraud
              rate jumps to 9.7%, compared to just 2.2% when they differ. This makes sense: legitimate purchases
              often involve shipping to someone else (gifts, different delivery address), while fraudsters typically ship to themselves.
            </p>

            <CodeBlock title="Email domain match analysis">
{`# From EDA notebook
train['email_match'] = train['P_emaildomain'] == train['R_emaildomain']
fraud_by_email = train.groupby('email_match')['isFraud'].mean()

# Results:
# email_match
# False    0.022070   (2.2% fraud rate)
# True     0.096504   (9.7% fraud rate - 4.4x higher!)`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              Similarly, <strong>new cards</strong> showed elevated fraud rates. The D1 feature represents "days since card
              was first used", and cards less than 7 days old had notably higher fraud rates than established cards. Mobile
              devices also showed 10.2% fraud versus 6.5% for desktop (about 1.6x higher).
            </p>

            <h3 className="text-xl mb-3 font-semibold">Identity Features: Not What They Seem</h3>

            <p className="mb-4 text-justify">
              The identity table contains 38 <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_XX</code> columns,
              many with numeric dtypes. But plotting their distributions reveals that most aren't truly continuous—they have
              discrete peaks suggesting categorical meaning:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/identity_column_distributions.webp"
                alt="Identity column distributions showing discrete categorical patterns"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              Take <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_32</code>: it only has 4 unique values
              (0, 16, 24, 32), probably screen color depth. Treating this as continuous would
              be misleading; it should be label-encoded. Similarly, columns like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_01</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_05</code>,
              and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_06</code> show discrete peaks rather than
              smooth distributions, so frequency encoding works better. Only a handful
              (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_02</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_07</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">id_08</code>)
              show genuinely continuous distributions and can be left as-is.
            </p>

            <h3 className="text-xl mb-3 font-semibold">V Feature Block Structure</h3>

            <p className="mb-4 text-justify">
              For the 339 anonymized V features, I analysed their missing value patterns. The heatmap revealed clear block
              structure: features V1-V11 are always missing together, V12-V34 form another block, and so on. This suggests
              Vesta collected these features in groups, and knowing <em>which</em> block is missing could be more predictive
              than just counting missing values.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/v_features_missing_heatmap.webp"
                alt="V features missing value co-occurrence heatmap showing block structure"
                className="rounded-lg max-w-xl w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Feature Engineering</h2>

            <p className="mb-4 text-justify">
              Based on the EDA insights, I built a feature engineering pipeline using scikit-learn transformers. This keeps
              the code modular and ensures the same transformations are applied consistently to training and test data.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Cyclical Time Encoding</h3>

            <p className="mb-4 text-justify">
              The transaction timestamp is given as seconds from some reference point. To capture daily and weekly patterns
              without the model thinking hour 23 and hour 0 are far apart, I used sine/cosine encoding:
            </p>

            <CodeBlock title="transformers.py — TimeFeatures">
{`class TimeFeatures(BaseEstimator, TransformerMixin):
    """Add cyclical time features from TransactionDT."""

    def transform(self, X):
        X = X.copy()
        hour = (X['TransactionDT'] / 3600) % 24
        day = (X['TransactionDT'] / 86400) % 7

        # Sine/cosine encoding preserves cyclical relationships
        # Hour 23 and hour 0 are now neighbors (both map to similar values)
        X['hod_sin'] = np.sin(2 * np.pi * hour / 24)
        X['hod_cos'] = np.cos(2 * np.pi * hour / 24)
        X['dow_sin'] = np.sin(2 * np.pi * day / 7)
        X['dow_cos'] = np.cos(2 * np.pi * day / 7)

        return X`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Customer-Level Aggregations</h3>

            <p className="mb-4 text-justify">
              The dataset doesn't have an explicit customer ID, but we can construct one from card and address information.
              With this pseudo-UID, we can compute each customer's typical spending pattern and flag transactions that
              deviate from it:
            </p>

            <CodeBlock title="transformers.py — AggregationFeatures">
{`class AggregationFeatures(BaseEstimator, TransformerMixin):
    """Statistics per customer UID to detect unusual spending."""

    def __init__(self, uid_cols=None):
        self.uid_cols = uid_cols or ['card1', 'addr1']

    def fit(self, X, y=None):
        X = X.copy()
        X['_uid'] = self._create_uid(X)

        # Calculate per-customer statistics from training data
        self.uid_stats_ = X.groupby('_uid')['TransactionAmt'].agg(
            ['mean', 'std', 'count']
        )
        return self

    def transform(self, X):
        X = X.copy()
        X['_uid'] = self._create_uid(X)

        # Merge customer statistics
        X = X.merge(self.uid_stats_, left_on='_uid', right_index=True, how='left')

        # Z-score: how unusual is this transaction for this customer?
        X['amt_zscore'] = (
            (X['TransactionAmt'] - X['amt_mean']) /
            X['amt_std'].clip(lower=1e-6)
        )
        return X`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              This is based on insights from top Kaggle solutions. The 1st place solution used
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">['card1', 'addr1', 'P_emaildomain']</code> as
              their customer identifier—I kept it simpler with just card and address.
            </p>

            <h3 className="text-xl mb-3 font-semibold">Amount Patterns</h3>

            <p className="mb-4 text-justify">
              EDA revealed a non-monotonic relationship between transaction amount and fraud rate: it increases from 2.4%
              ($0-25) to 5.5% ($500-1000), but then drops back to 3.4% for $1000+. Explicit amount buckets help tree
              models find these patterns. I also added cents-based features—fraudsters often use round amounts or specific
              patterns like $X.99:
            </p>

            <CodeBlock title="transformers.py — AmountFeatures">
{`class AmountFeatures(BaseEstimator, TransformerMixin):
    AMT_BINS = [0, 25, 50, 100, 200, 500, 1000, float('inf')]

    def transform(self, X):
        X = X.copy()

        X['TransactionAmt_log'] = np.log1p(X['TransactionAmt'])
        X['amt_bucket'] = np.digitize(X['TransactionAmt'], bins=self.AMT_BINS) - 1

        # Cents analysis (fraud detection best practice)
        cents = (X['TransactionAmt'] * 100 % 100).astype(int)
        X['cents'] = cents
        X['cents_00'] = (cents == 0).astype(int)  # Round amounts
        X['cents_99'] = (cents == 99).astype(int)  # Fake pricing pattern

        return X`}
            </CodeBlock>

            <h3 className="text-xl mb-3 font-semibold">Two Encoding Pipelines</h3>

            <p className="mb-8 text-justify">
              I built two separate pipelines: one using <strong>label encoding</strong> for tree-based models (LightGBM can
              learn arbitrary splits on numeric values), and one using <strong>one-hot encoding</strong> for linear models
              (which would incorrectly interpret label-encoded categories as ordinal). The tree pipeline produced 484 features;
              the linear pipeline expanded to 613 due to one-hot encoding.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Modeling Approach</h2>

            <h3 className="text-xl mb-3 font-semibold">Why Time-Based Cross-Validation?</h3>

            <p className="mb-4 text-justify">
              Standard k-fold cross-validation randomly shuffles data, letting the model "peek" at future fraud patterns
              when training. This inflates performance estimates unrealistically. In production, we can only use historical
              data to predict future transactions.
            </p>

            <p className="mb-4 text-justify">
              <strong>TimeSeriesSplit</strong> trains on earlier transactions and validates on later ones, which mirrors
              production deployment. It also helps detect concept drift: fraudsters constantly adapt their tactics, so
              a model trained on January data might perform differently on March data.
            </p>

            <CodeBlock title="Time-based cross-validation">
{`from sklearn.model_selection import TimeSeriesSplit

# Data is already sorted by TransactionDT
tscv = TimeSeriesSplit(n_splits=5)

for fold, (train_idx, val_idx) in enumerate(tscv.split(X_train)):
    # Each fold trains on EARLIER data, validates on LATER data
    # Fold 1: Train on 0-100k,  validate on 100k-200k
    # Fold 2: Train on 0-200k,  validate on 200k-300k
    # ...and so on`}
            </CodeBlock>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/time_series_cv_splits.webp"
                alt="Time series cross-validation splits visualization"
                className="rounded-lg max-w-xl w-full"
              />
            </div>

            <h3 className="text-xl mb-3 font-semibold">Model Comparison</h3>

            <p className="mb-4 text-justify">
              I compared Logistic Regression (baseline) against LightGBM. LightGBM was a natural choice for this problem:
              it handles missing values natively (no imputation needed for 374 columns with nulls), works well with
              categorical features, and the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">scale_pos_weight</code> parameter
              handles class imbalance.
            </p>

            <CodeBlock title="LightGBM configuration">
{`params = {
    'objective': 'binary',
    'metric': 'auc',
    'boosting_type': 'gbdt',
    'scale_pos_weight': 27.58,  # (569877 legitimate) / (20663 fraud)
    'learning_rate': 0.05,
    'num_leaves': 31,
    'feature_fraction': 0.8,
    'bagging_fraction': 0.8,
    'bagging_freq': 5,
}`}
            </CodeBlock>

            <p className="mb-8 text-justify">
              LightGBM significantly outperformed logistic regression: <strong>0.9088 AUC</strong> vs 0.8423 (a 7.9%
              improvement). The gap was consistent across all five CV folds.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/model_comparison_bar.webp"
                alt="Model comparison showing LightGBM outperforming Logistic Regression"
                className="rounded-lg max-w-lg w-full"
              />
            </div>

            <h2 className="text-2xl mb-4 font-bold">Cost-Benefit Optimization</h2>

            <p className="mb-4 text-justify">
              This is where things get interesting. Traditional ML metrics like F1 score balance precision and
              recall equally, but the business costs aren't symmetric. I defined a simple cost matrix based on
              reasonable assumptions:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Outcome</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Cost</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">False Negative (missed fraud)</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">$150</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Average fraud amount</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">False Positive (blocked legitimate)</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">$10</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Customer friction, lost goodwill</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">True Positive (caught fraud)</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">$5</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Manual review cost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
              With these costs, I swept through different classification thresholds to find the one that minimizes
              total cost:
            </p>

            <CodeBlock title="Cost-optimal threshold search">
{`def calculate_cost(y_true, y_pred, costs):
    tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
    total_cost = (
        fn * costs.false_negative_cost +  # $150 per missed fraud
        fp * costs.false_positive_cost +  # $10 per blocked legitimate
        tp * costs.true_positive_cost     # $5 per caught fraud
    )
    return total_cost

# Sweep thresholds
for thresh in np.arange(0.01, 0.99, 0.01):
    y_pred = (y_pred_proba >= thresh).astype(int)
    cost = calculate_cost(y_holdout, y_pred, costs)
    # Track minimum...`}
            </CodeBlock>

            <p className="mb-4 text-justify">
              The results were revealing: the <strong>F1-optimal threshold was 0.82</strong>, but the <strong>cost-optimal
              threshold was 0.54</strong>. That's a huge difference! The lower threshold catches more fraud (higher recall)
              at the expense of more false positives—but given that a missed fraud costs 15x more than a blocked legitimate
              transaction, this is the right trade-off.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/cost_analysis.webp"
                alt="Cost analysis showing optimal threshold differs from F1-optimal"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-8 text-justify">
              At the cost-optimal threshold, the model achieves <strong>73% cost reduction</strong> compared to approving
              all transactions (the "no model" baseline). On this dataset, that translates to roughly <strong>$447K in
              savings</strong>, from $610K baseline cost down to $163K with the model.
            </p>

            <h2 className="text-2xl mb-4 font-bold">Results</h2>

            <p className="mb-4 text-justify">
              The final model achieves excellent class separation. The score distribution plot shows fraud transactions
              concentrated near 1.0 and legitimate transactions near 0.0, with relatively little overlap:
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/score_distribution.webp"
                alt="Score distribution showing clear separation between fraud and legitimate transactions"
                className="rounded-lg max-w-lg w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              The ROC and Precision-Recall curves tell a similar story. The ROC-AUC of 0.9738 indicates excellent
              discrimination ability. The PR curve is particularly informative for imbalanced datasets: a PR-AUC of 0.7369
              is strong given the 3.5% base rate (the baseline for a random classifier would be just 0.035).
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/roc_pr_curves.webp"
                alt="ROC and Precision-Recall curves"
                className="rounded-lg max-w-2xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              Feature importance analysis confirmed that Vesta's anonymized features (V258, V294) are highly predictive,
              which isn't surprising given they've been engineered specifically for fraud detection. My engineered
              features also ranked highly: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">card1_addr1_amt_mean</code> (customer
              average spend) and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">card1_freq</code> (how common
              is this card) both appeared in the top 20.
            </p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/fraud-detection/feature_importance_top30.webp"
                alt="Top 30 features by importance"
                className="rounded-lg max-w-xl w-full"
              />
            </div>

            <p className="mb-4 text-justify">
              The top 93 features (of 484) account for 90% of total importance, which suggests plenty of
              room for model simplification in production. Fewer features means faster inference and easier maintenance.
            </p>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>ROC-AUC (Holdout): <strong>0.9738</strong></li>
                <li>PR-AUC: 0.7369</li>
                <li>CV Mean AUC: 0.9088 ± 0.01</li>
                <li>F1-optimal threshold: 0.82 | Cost-optimal threshold: <strong>0.54</strong></li>
                <li>Cost Reduction: <strong>73%</strong> vs. no model</li>
                <li>Estimated Savings: <strong>$446,985</strong></li>
              </ul>
            </div>

            <h2 className="text-2xl mt-8 mb-4 font-bold">Takeaways</h2>

            <p className="mb-4 text-justify">
              The biggest lesson here was about <strong>framing the problem correctly</strong>. Optimizing for F1 score
              would have given a threshold of 0.82, missing 18% of fraud. Optimizing for business cost gave 0.54, catching
              significantly more fraud at an acceptable false positive rate.
            </p>

            <p className="mb-4 text-justify">
              In production you'd want to refine the cost assumptions with actual business data and monitor for
              concept drift (fraud patterns change!). But as a weekend project to explore cost-sensitive classification,
              I'm happy with how it turned out.
            </p>

          </div>
      </ContentBlock>
    </Layout>
  )
}

export default FraudDetectionProject
