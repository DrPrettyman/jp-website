import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import ContentBlock from '../../components/ContentBlock';
import { Activity } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

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

const PSIndicatorProject = () => {
  return (
    <Layout>
      <SEO title="Power Spectrum Indicator" description="Research on using the power spectrum as a novel early warning indicator for critical transitions." path="/projects/ps-indicator" />
      <ContentBlock title="A Novel Power Spectrum Indicator for Early Warning Signals" icon={Activity} githubUrl="https://github.com/DrPrettyman/PhD/tree/main/Papers/Paper1_EPL/manuscript" maxWidth='4xl'>
        <div className="text-gray-700 dark:text-white">

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Published in EPL (Europhysics Letters)</strong>, 2018.
              {' '}<a href="https://doi.org/10.1209/0295-5075/121/10002" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Read the paper</a>.
            </p>
            <p className="text-sm mt-2">
              <strong>Authors:</strong> J. Prettyman, T. Kuna, V. Livina
            </p>
          </div>

          <h2 className="text-2xl mb-4 font-bold">Summary</h2>

          <p className="mb-4 text-justify">
            This paper introduces a <strong>novel early warning signal (EWS) indicator</strong> based on the
            power spectrum scaling exponent. The indicator detects changes in the temporal scaling properties
            of time series data, which can signal an approaching tipping point in dynamical systems.
          </p>

          <p className="mb-4 text-justify">
            The key innovation is showing that the <strong>power spectrum (PS) indicator</strong> can provide
            useful early warning signals in contexts where traditional indicators (lag-1 autocorrelation and
            detrended fluctuation analysis) fail &mdash; specifically in real geophysical data with periodic
            oscillations.
          </p>

          <h2 className="text-2xl mb-4 font-bold">The Three Scaling Indicators</h2>

          <p className="mb-4 text-justify">
            Critical slowing down in dynamical systems can be detected by measuring how the temporal scaling
            properties of time series change over time. Three related indicators are commonly used:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Indicator</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Method</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">EWS Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">ACF(1)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Lag-1 autocorrelation</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Rises toward 1</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">DFA</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Detrended Fluctuation Analysis exponent</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Rises toward 1.5</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">PS (Novel)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Power spectrum scaling exponent</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Rises toward 2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4 text-justify">
            The three exponents are analytically related by the equation:
          </p>

          <MathBlock>
            {String.raw`\alpha = \frac{1 + \beta}{2} = 1 - \frac{\gamma}{2}`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where α is the DFA exponent, β is the PS exponent, and γ is the ACF scaling exponent.
          </p>

          <Figure
            src="/images/phd/PowerSpectrum.png"
            caption="Power spectrum of a time series showing scaling behaviour. The slope on a log-log plot gives the PS exponent β."
          />

          <h2 className="text-2xl mb-4 font-bold">The Power Spectrum Method</h2>

          <p className="mb-4 text-justify">
            The power spectrum scaling exponent β is calculated by estimating the slope of the power
            spectrum S(f) plotted on logarithmic axes:
          </p>

          <MathBlock>
            {String.raw`S(f) \sim f^{-\beta}`}
          </MathBlock>

          <p className="mb-4 text-justify">
            The power spectrum is approximated by the periodogram (the squared magnitude of the
            Fast Fourier Transform). The exponent is estimated by fitting a line to the periodogram
            in the frequency range 10<sup>-2</sup> ≤ f ≤ 10<sup>-1</sup>, corresponding to time
            scales of 10 to 100 units.
          </p>

          <CodeBlock title="PSE.m - Power Spectrum Scaling Exponent">
{`function pse_value = PSE(Y)
%% PSE - Estimate β from power spectrum slope
% For S(f) ~ f^(-β): β=0 for white noise, β=2 for Brownian motion

    % Compute periodogram
    [pxx, f] = periodogram(Y, [], [], 1);

    % Remove DC component
    f = f(2:end);
    pxx = pxx(2:end);

    % Fit line in log-log space
    % Frequency range [0.01, 0.1] chosen for AR(1) processes
    window = (f <= 0.1) & (f >= 0.01);

    logf = log10(f(window));
    logp = log10(pxx(window));

    pfit = polyfit(logf, logp, 1);
    pse_value = -pfit(1);  % Negative slope = positive β
end`}
          </CodeBlock>

          <h2 className="text-2xl mb-4 font-bold">Validation on Model Data</h2>

          <p className="mb-4 text-justify">
            The PS indicator was first validated on a classical pitchfork bifurcation model:
          </p>

          <MathBlock>
            {String.raw`\frac{dz}{dt} = -\frac{\partial}{\partial z}\left(z^4 + \left(3 - \frac{t}{200}\right)z^2\right) + \sigma\eta_t`}
          </MathBlock>

          <p className="mb-4 text-justify">
            This system has a stable equilibrium at z=0 for t&lt;600, then bifurcates into a
            double-well potential. All three indicators (ACF1, DFA, PS) successfully detected
            the approaching bifurcation, with the ACF1 indicator providing the clearest signal.
          </p>

          <Figure
            src="/images/phd/changing_potential.png"
            caption="The changing shape of a potential well as a system approaches a bifurcation. The stable equilibrium becomes shallower until it disappears at the critical point."
          />

          <h2 className="text-2xl mb-4 font-bold">Application: Tropical Cyclones</h2>

          <p className="mb-4 text-justify">
            The real test came when applying these indicators to <strong>sea-level pressure data from
            14 major tropical cyclones</strong> at landfall. The data was obtained from the HadISD
            weather station dataset, selecting stations within 2km of landfall locations.
          </p>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">Tropical Cyclones Analysed:</p>
            <p className="text-sm">
              Atlantic hurricanes: Andrew (1992), Opal (1995), Floyd (1999), Charley (2004),
              Frances (2004), Jeanne (2004), Katrina (2005), Rita (2005), Ivan (2006), Ernesto (2006)
            </p>
            <p className="text-sm mt-1">
              Typhoons: Zeb (1998), Megi (2010), Flo (1990); Cyclone Hudhud (2014)
            </p>
          </div>

          <Figure
            src="/images/phd/Katrina.png"
            caption="Sea-level pressure data from weather stations during Hurricane Katrina's approach. The sudden pressure drop is the 'tipping point' we aim to predict."
          />

          <h3 className="text-xl mb-3 font-semibold">Key Finding: PS Succeeds Where ACF1 Fails</h3>

          <p className="mb-4 text-justify">
            The striking result was that the <strong>ACF1 indicator failed to provide any clear
            early warning signal</strong> for the cyclone data, while the <strong>PS indicator
            showed a clear rising trend starting approximately 50 hours before</strong> the
            minimum pressure.
          </p>

          <p className="mb-4 text-justify">
            Why did ACF1 fail? The sea-level pressure data contains strong <strong>12-hour tidal
            oscillations</strong>. These periodic components create a high "background correlation"
            that masks the critical slowing down signal. The PS indicator, by operating in the
            frequency domain, is naturally insensitive to these periodic components.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Sensitivity Analysis</h2>

          <p className="mb-4 text-justify">
            An important aspect of the sliding window method is the choice of window size.
            A sensitivity analysis revealed an interesting pattern: the PS indicator's
            performance varied periodically with window size, with optimal performance
            at window sizes of approximately 12n±1 for integer n.
          </p>

          <p className="mb-4 text-justify">
            This periodic pattern directly reflects the 12-hour tidal oscillations in the
            pressure data. Window sizes that are multiples of the oscillation period
            capture complete cycles and avoid artefacts.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Implementation</h2>

          <CodeBlock title="Sliding Window PS Indicator">
{`function slidingPS = PSE_sliding(data, windowSize)
%% Compute PS exponent in sliding windows across the time series

    n = size(data, 1);
    slidingPS = zeros(n, 1);

    for i = (windowSize + 1):n
        window = data((i - windowSize):i);
        slidingPS(i) = PSE(window);
    end
end

%% Example usage
% Load sea-level pressure data
slp = load('katrina_slp.mat');

% Calculate PS indicator with 100-hour window
ps_indicator = PSE_sliding(slp, 100);

% Statistical significance: Mann-Kendall trend test
[tau, p] = mannkendall(ps_indicator(101:end));`}
          </CodeBlock>

          <h2 className="text-2xl mb-4 font-bold">Conclusions</h2>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Key Contributions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Introduced the <strong>power spectrum (PS) scaling exponent</strong> as a novel EWS indicator</li>
              <li>Demonstrated analytical relationship to established ACF and DFA indicators</li>
              <li>Showed PS indicator <strong>detects EWS where ACF1 fails</strong> due to periodic oscillations</li>
              <li>First application of EWS methods to <strong>tropical cyclone prediction</strong></li>
              <li>Identified optimal window sizes related to data periodicity</li>
            </ul>
          </div>

          <p className="mt-6 mb-4 text-justify">
            This work opened up new possibilities for early warning signal detection in systems
            with complex periodicities, which are ubiquitous in ecological and geophysical
            contexts. The PS indicator has since been further developed and applied to
            multivariate systems and paleoclimate data.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Citation:</strong> Prettyman, J., Kuna, T., & Livina, V. (2018).
              A novel scaling indicator of early warning signals helps anticipate tropical cyclones.
              <em>EPL (Europhysics Letters)</em>, 121(1), 10002.
            </p>
          </div>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default PSIndicatorProject
