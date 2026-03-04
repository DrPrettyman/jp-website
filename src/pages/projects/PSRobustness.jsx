import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { generateMeta } from '../../utils/seo';
import { ShieldCheck } from 'lucide-react';

export const meta = () => generateMeta({ title: "Power Spectrum Robustness", description: "Research investigating the robustness of power spectrum scaling as an indicator of critical slowing down.", path: "/projects/ps-robustness" });
import 'katex/dist/katex.min.css';
import katex from 'react-katex';
const { BlockMath } = katex;

const Figure = ({ src, caption, alt }) => (
  <figure className="my-6">
    <img
      src={src}
      alt={alt || caption}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
    />
    {caption && (
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

const MathBlock = ({ children }) => (
  <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto">
    <BlockMath math={children} />
  </div>
);

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

const PSRobustnessProject = () => {
  return (
    <Layout>
      <ContentBlock title="Power Spectrum Scaling and Critical Slowing Down" icon={ShieldCheck} githubUrl="https://github.com/DrPrettyman/PhD/tree/main/Papers/Paper3_ERL/manuscript" maxWidth='4xl'>
        <div className="text-gray-700 dark:text-white">

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Published in Environmental Research Letters</strong>, October 2021.
              {' '}<a href="https://doi.org/10.1088/1748-9326/ac2bf1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Read the paper</a>.
            </p>
            <p className="text-sm mt-2">
              <strong>Authors:</strong> Joshua Prettyman, Tobia Kuna, Valerie Livina
            </p>
          </div>

          <h2 className="text-2xl mb-4 font-bold">Summary</h2>

          <p className="mb-4 text-justify">
            This paper provides the <strong>rigorous analytical foundation</strong> for using the
            power spectrum (PS) scaling exponent as a tipping point indicator. A key insight is that
            the PS indicator is useful even when the power spectrum doesn't exhibit true power-law
            scaling &mdash; which is the case for most real dynamical systems.
          </p>

          <p className="mb-4 text-justify">
            Most importantly, the paper demonstrates that the PS indicator is <strong>remarkably robust
            against trends and periodic oscillations</strong> in the data, making it particularly valuable
            for ecological and geophysical systems with seasonal or diurnal cycles.
          </p>

          <h2 className="text-2xl mb-4 font-bold">The AR(1) Model of Critical Slowing Down</h2>

          <p className="mb-4 text-justify">
            Critical slowing down (CSD) is commonly modelled using a lag-1 autoregressive (AR(1)) process:
          </p>

          <MathBlock>
            {String.raw`z(t_{n+1}) = \mu \cdot z(t_n) + \sigma \cdot \eta_n`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where μ is the autoregressive parameter (related to the return rate), σ is the noise
            amplitude, and η_n is white noise. As a system approaches a tipping point, μ increases
            toward 1 &mdash; this is the "slowing down" as the system takes longer to return to
            equilibrium.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Power Spectrum of AR(1)</h3>

          <p className="mb-4 text-justify">
            The power spectrum of an AR(1) process has an analytical form:
          </p>

          <MathBlock>
            {String.raw`S(f) = \frac{\sigma^2}{1 + \mu^2 - 2\mu\cos(2\pi f)}`}
          </MathBlock>

          <p className="mb-4 text-justify">
            This is <strong>not</strong> a power law. It exhibits a crossover between "white noise"
            (flat) behaviour at low frequencies and "red noise" (decreasing) behaviour at higher
            frequencies. Nevertheless, estimating a scaling exponent in this regime proves to be
            a valid EWS indicator.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Determining the Optimal Frequency Range</h2>

          <p className="mb-4 text-justify">
            A critical question for practical implementation: <em>In what frequency range should we
            estimate the PS exponent?</em> By differentiating the log-log power spectrum, I derived
            an expression for the PS indicator as a function of frequency and autoregressive parameter:
          </p>

          <MathBlock>
            {String.raw`B_f(\mu) = \frac{4\pi\mu f \cdot \sin(2\pi f)}{1 + \mu^2 - 2\mu\cos(2\pi f)}`}
          </MathBlock>

          <p className="mb-4 text-justify">
            The maximum value of B_f(μ) occurs when μ = 1 (at the tipping point) and approaches 2
            as f → 0. For the indicator to be useful, we need a frequency range where:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>The indicator shows significant change as μ varies from 0 to 1</li>
            <li>The periodogram is reliable (not too noisy at very low frequencies)</li>
          </ul>

          <p className="mb-4 text-justify">
            Analysis shows the optimal range is <strong>10⁻² ≤ f ≤ 10⁻¹</strong> (corresponding to
            time scales of 10 to 100 units). In this range, the PS indicator increases monotonically
            as CSD progresses.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Validity Without Power-Law Scaling</h2>

          <p className="mb-4 text-justify">
            A key theoretical contribution is proving that estimating a "scaling exponent" is
            meaningful even when true power-law scaling doesn't exist. I demonstrated this with
            two cases:
          </p>

          <h3 className="text-xl mb-3 font-semibold">1. Sum of Red and White Noise</h3>

          <p className="mb-4 text-justify">
            For a signal z(t) that is the sum of a random walk W(t) and white noise η(t):
          </p>

          <MathBlock>
            {String.raw`z(t) = W(t) + \mu \cdot \eta(t)`}
          </MathBlock>

          <p className="mb-4 text-justify">
            The power spectrum shows a clear crossover, dominated by red noise at low frequencies
            and white noise at high frequencies. As μ decreases (less white noise), the PS exponent
            estimated in the crossover region increases &mdash; successfully tracking the "reddening"
            of the signal.
          </p>

          <h3 className="text-xl mb-3 font-semibold">2. AR(1) Process with Changing Parameter</h3>

          <p className="mb-4 text-justify">
            For AR(1) processes with μ ranging from 0 to 1, I derived the exact relationship between
            μ and the estimated PS exponent β when using the optimal frequency range:
          </p>

          <MathBlock>
            {String.raw`\beta(\mu) = \log\left[\frac{1 + \mu^2 - 2\mu\cos(0.2\pi)}{1 + \mu^2 - 2\mu\cos(0.02\pi)}\right]`}
          </MathBlock>

          <p className="mb-4 text-justify">
            Numerical experiments confirmed that the estimated exponent closely follows this
            theoretical curve, validating the PS indicator for CSD detection.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Sensitivity Analysis</h2>

          <h3 className="text-xl mb-3 font-semibold">Sensitivity to Time Series Length</h3>

          <p className="mb-4 text-justify">
            Comparing the PS indicator to the standard ACF1 indicator as estimators of the AR(1)
            parameter μ reveals an interesting trade-off:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Series Length</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">ACF1 Error</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">PS Error</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10²</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Low</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">High</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10³</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Low</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-yellow-600 dark:text-yellow-400">Moderate</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10⁵</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Low</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Low</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-justify">
            For short time series, ACF1 is more accurate. However, this changes dramatically when
            the data contains trends or oscillations.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Robustness to Trends</h3>

          <p className="mb-4 text-justify">
            When a parabolic trend is added to AR(1) data, the ACF1 indicator's performance degrades
            significantly &mdash; it consistently <strong>overestimates</strong> the AR parameter
            because the trend creates spurious correlation.
          </p>

          <p className="mb-4 text-justify">
            The PS indicator, by contrast, shows <strong>no degradation</strong> for time series
            longer than 10³ points. The trend affects only very low frequencies, which fall outside
            the estimation range.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Robustness to Periodic Oscillations</h3>

          <p className="mb-4 text-justify">
            This is the most striking result. When sine waves are superimposed on AR(1) data:
          </p>

          <CodeBlock title="Test signals">
{`% Original AR(1)
z1(t) = μ·z1(t-1) + η(t)

% AR(1) + simple sine wave
z2(t) = z1(t) + sin(t)

% AR(1) + complex periodic function
z3(t) = z1(t) + 2·sin(50t) + 3·sin(7t)`}
          </CodeBlock>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Indicator</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Pure AR(1)</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">+ Simple Sine</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">+ Complex Periodic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">ACF1</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Accurate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">Biased</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">Biased</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">DFA</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Accurate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">Biased</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-red-600 dark:text-red-400">Biased</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">PS</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Accurate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Accurate</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-green-600 dark:text-green-400">Accurate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-justify">
            <strong>The PS indicator is practically unchanged</strong> when periodic components
            are added. Oscillations create spikes in the periodogram at specific frequencies,
            but these are averaged out in the linear fit. This makes the PS indicator ideal
            for systems with tidal, diurnal, or seasonal cycles.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Application to Paleoclimate Data</h2>

          <p className="mb-4 text-justify">
            The methods were tested on the <strong>GISP2 δ¹⁸O ice-core record</strong> from Greenland,
            which contains evidence of the Bølling warming event approximately 14,700 years before
            present &mdash; a dramatic temperature transition at the end of the last ice age.
          </p>

          <Figure
            src="/images/phd/temp_proxy.webp"
            caption="Paleoclimate proxy data showing past abrupt climate transitions. The Bølling warming event (~14.7 kyr BP) represents a dramatic temperature shift."
          />

          <p className="mb-4 text-justify">
            Previous work by Lenton et al. had detected early warning signals in this data using
            DFA. Applying the PS indicator with a 4,000-year sliding window (approximately 200
            data points) confirmed the presence of critical slowing down, though the signal
            appeared with a lag rather than preceding the transition.
          </p>

          <p className="mb-4 text-justify">
            This result highlights a practical limitation: for low-resolution paleoclimate data,
            the DFA indicator may be more appropriate than the PS indicator, which requires longer
            time series for optimal performance.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Implications for Modern Climate Monitoring</h2>

          <p className="mb-4 text-justify">
            The PS indicator is most valuable for <strong>high-resolution modern data</strong> where:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>Time series length exceeds 10³ points</li>
            <li>Tipping points occur over periods of months (with hourly data available)</li>
            <li>Periodic oscillations (tidal, diurnal, seasonal) are difficult to remove</li>
          </ul>

          <p className="mb-4 text-justify">
            Potential applications include detecting early warning signals for:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><strong>Coral bleaching events</strong> linked to ocean temperature increases</li>
            <li><strong>Ecosystem regime shifts</strong> in response to climate change</li>
            <li><strong>Extreme weather events</strong> monitored by modern meteorological networks</li>
          </ul>

          <h2 className="text-2xl mb-4 font-bold">Conclusions</h2>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Key Contributions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Analytical justification</strong> for PS indicator based on AR(1) model of CSD</li>
              <li>Determined <strong>optimal frequency range</strong> (10⁻² to 10⁻¹) for PS estimation</li>
              <li>Proved PS indicator is valid <strong>without true power-law scaling</strong></li>
              <li>Demonstrated <strong>robustness to trends</strong> for series &gt; 10³ points</li>
              <li>Showed <strong>remarkable robustness to periodic oscillations</strong></li>
              <li>Validated on <strong>paleoclimate ice-core data</strong></li>
              <li>Identified applications for <strong>modern high-resolution climate monitoring</strong></li>
            </ul>
          </div>

          <p className="mt-6 mb-4 text-justify">
            This paper completes the theoretical foundation for the PS indicator, establishing
            when and why it works, and identifying its comparative advantages over traditional
            methods. The robustness to periodicities makes it particularly valuable for the
            many ecological and geophysical systems where seasonal and diurnal cycles are
            present in the data.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Citation:</strong> Prettyman, J., Kuna, T., & Livina, V. (2021).
              Power spectrum scaling as a measure of critical slowing down and precursor to
              tipping points in dynamical systems.
              <em>Environmental Research Letters</em>, 16, 114034.
            </p>
          </div>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default PSRobustnessProject
