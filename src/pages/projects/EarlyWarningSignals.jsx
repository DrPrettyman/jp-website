import React from 'react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import ContentBlock from '../../components/ContentBlock';
import { TrendingUp } from 'lucide-react';

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
  <div className="my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto font-mono text-sm">
    {children}
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

const EarlyWarningSignalsProject = () => {
  return (
    <Layout>
      <SEO title="Early Warning Signals" description="PhD research on detecting early warning signals of critical transitions in dynamical systems." path="/projects/early-warning-signals" />
      <ContentBlock title="Early Warning Signals for Critical Transitions" icon={TrendingUp} githubUrl="https://github.com/DrPrettyman/PhD" maxWidth='4xl'>
        <div className="text-gray-700 dark:text-white">

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>PhD Thesis</strong> — University of Reading, Department of Mathematics and Statistics.
              Published in <em>EPL (Europhysics Letters)</em>, <em>Chaos</em>, and <em>Environmental Research Letters</em>.
              {' '}<a href="https://doi.org/10.48683/1926.00098364" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Read the thesis</a>.
            </p>
          </div>

          <h2 className="text-2xl mb-4 font-bold">The Big Picture</h2>

          <p className="mb-4 text-justify">
            Many complex systems in nature — from ecosystems to climate to financial markets — can undergo sudden,
            dramatic shifts known as <strong>tipping points</strong> or <strong>critical transitions</strong>. A lake can flip
            from clear to turbid seemingly overnight. The Sahara transformed from a green savanna to desert over
            just a few centuries. The 2008 financial crisis cascaded through the global economy in weeks.
          </p>

          <p className="mb-4 text-justify">
            The question that drove my PhD research was: <em>Can we detect warning signs before these
            catastrophic shifts occur?</em> It turns out that many systems exhibit characteristic behaviours
            as they approach a tipping point — a phenomenon called <strong>critical slowing down</strong>.
          </p>

          <Figure
            src="/images/phd/potential_bifurcation.png"
            caption="A system approaching a tipping point. The 'ball' represents the system state, and the landscape is the potential energy. As conditions change, the well becomes shallower until the system tips into a new state."
          />

          <h2 className="text-2xl mb-4 font-bold">Critical Slowing Down</h2>

          <p className="mb-4 text-justify">
            Imagine a ball sitting in a bowl. Push it slightly and it rolls back to the centre. Now imagine
            the bowl slowly becoming flatter. The ball still returns to equilibrium, but <em>more slowly</em>.
            Eventually, when the bowl is nearly flat, even a small push sends the ball over the edge.
          </p>

          <p className="mb-4 text-justify">
            This is <strong>critical slowing down</strong>: as a system approaches a tipping point, it takes
            longer to recover from perturbations. This manifests in measurable statistical properties of
            the system's time series:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><strong>Increased autocorrelation</strong> — the system's state becomes more similar to its recent past</li>
            <li><strong>Increased variance</strong> — fluctuations grow larger as stability weakens</li>
            <li><strong>Spectral reddening</strong> — low-frequency variations dominate the signal</li>
          </ul>

          <Figure
            src="/images/phd/changing_potential.png"
            caption="The changing shape of a potential well as a system approaches a bifurcation. The stable equilibrium (trough) becomes shallower until it disappears at the critical point."
          />

          <h2 className="text-2xl mb-4 font-bold">Early Warning Signal Indicators</h2>

          <p className="mb-4 text-justify">
            My research focused on developing and comparing methods to detect critical slowing down in time
            series data. The core technique is <strong>sliding window analysis</strong>: calculate a statistical
            indicator in overlapping windows of data to track how it changes over time. A rising trend in the
            indicator can serve as an early warning signal.
          </p>

          <h3 className="text-xl mb-3 font-semibold">ACF1 Indicator (Lag-1 Autocorrelation)</h3>

          <p className="mb-4 text-justify">
            The most established indicator measures how correlated a time series is with itself at a one-step
            lag. As critical slowing down increases, the system "remembers" its past state longer, and
            autocorrelation rises toward 1.
          </p>

          <h3 className="text-xl mb-3 font-semibold">DFA Indicator (Detrended Fluctuation Analysis)</h3>

          <p className="mb-4 text-justify">
            DFA quantifies long-range correlations by measuring how fluctuations scale with time window size.
            It's particularly useful for non-stationary signals where simple autocorrelation may be misleading.
            This method was developed for tipping point analysis by Livina and colleagues.
          </p>

          <h3 className="text-xl mb-3 font-semibold">PS Indicator (Power Spectrum Scaling)</h3>

          <p className="mb-4 text-justify">
            A novel contribution of my thesis was using the <strong>power spectrum scaling exponent</strong> as
            an early warning indicator. By transforming the time series to the frequency domain and measuring
            how power scales with frequency, we can detect the "reddening" of the spectrum that accompanies
            critical slowing down.
          </p>

          <Figure
            src="/images/phd/PowerSpectrum.png"
            caption="Power spectrum of a time series showing scaling behaviour. The slope on a log-log plot gives the PS exponent β."
          />

          <p className="mb-4 text-justify">
            The key insight is that all three indicators are mathematically related for autoregressive processes,
            but the PS indicator has a practical advantage: it's insensitive to periodic components in the data,
            making it useful for signals with daily or seasonal cycles.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Types of Tipping Points</h2>

          <p className="mb-4 text-justify">
            Not all tipping points are alike. My thesis examined three categories:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Mechanism</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">EWS Detectable?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">Bifurcational</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Stable state disappears as parameters change</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-green-600 dark:text-green-400">Yes</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">Noise-induced</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Random fluctuations push system to alternate state</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400">Limited</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">Forced transition</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">External forcing shifts the equilibrium</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-yellow-600 dark:text-yellow-400">Sometimes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Figure
            src="/images/phd/differentbifurcations.png"
            caption="Different types of bifurcations studied: fold (saddle-node), transcritical, and pitchfork. Each has distinct early warning signatures."
          />

          <h2 className="text-2xl mb-4 font-bold">Multidimensional Systems</h2>

          <p className="mb-4 text-justify">
            Real-world systems rarely have just one variable. Climate involves temperature, pressure, humidity,
            and countless other factors. My thesis extended the one-dimensional EWS techniques to handle
            multivariate data using two approaches:
          </p>

          <h3 className="text-xl mb-3 font-semibold">Empirical Orthogonal Functions (EOFs)</h3>

          <p className="mb-4 text-justify">
            EOF analysis (equivalent to Principal Component Analysis) finds the linear combination of variables
            that captures the most variance. An important theoretical contribution of my thesis was proving that
            the EOF projection is optimal not just for capturing variance, but specifically for detecting
            <em>increases in variance</em> — exactly what we need for early warning signals.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Jacobian Eigenvalue Analysis</h3>

          <p className="mb-4 text-justify">
            For systems where we can estimate the dynamics, tracking the eigenvalues of the Jacobian matrix
            directly reveals approaching bifurcations. When an eigenvalue crosses from negative to positive
            real part, the system becomes unstable.
          </p>

          <Figure
            src="/images/phd/spiral.png"
            caption="A Hopf bifurcation in a two-dimensional system. The stable equilibrium becomes unstable and gives birth to a limit cycle."
          />

          <h2 className="text-2xl mb-4 font-bold">Application: Tropical Cyclones</h2>

          <p className="mb-4 text-justify">
            To test these methods on real geophysical data, I applied them to an unconventional problem:
            detecting the approach of tropical cyclones from sea-level pressure measurements. While not a
            classical bifurcation, the sudden drop in pressure as a hurricane arrives is certainly an
            "abrupt change" in the system.
          </p>

          <Figure
            src="/images/phd/Katrina.png"
            caption="Sea-level pressure data from weather stations during Hurricane Katrina's approach. The sudden pressure drop is the 'tipping point' we aim to predict."
          />

          <p className="mb-4 text-justify">
            I analysed 14 major tropical cyclones using data from HadISD weather stations, examining
            sea-level pressure time series in the days before landfall. Key findings:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li>The <strong>PS indicator</strong> showed rising trends 24-48 hours before the pressure drop</li>
            <li>The <strong>ACF1 indicator</strong> was confounded by 12-hour tidal oscillations in the pressure data</li>
            <li>Spatial analysis of multiple weather stations revealed the approaching storm as a "wave" of increasing indicator values</li>
          </ul>

          <Figure
            src="/images/phd/one_and_many_timeseries.png"
            caption="Sea-level pressure time series from multiple weather stations in a region during a hurricane event."
          />

          <p className="mb-4 text-justify">
            I also developed a stochastic model of hurricane approach, parameterised using the observed EWS
            indicator behaviour. This model successfully reproduced the statistical signatures seen in real data,
            validating the use of these indicators for this application.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Climate Applications</h2>

          <p className="mb-4 text-justify">
            Beyond tropical cyclones, my research connected to broader climate tipping point research. The same
            techniques can potentially detect warning signs for major climate transitions:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><strong>Atlantic thermohaline circulation collapse</strong> — slowdown of the Gulf Stream</li>
            <li><strong>Arctic sea ice loss</strong> — ice-albedo feedback instability</li>
            <li><strong>Amazon rainforest dieback</strong> — precipitation-vegetation feedback</li>
            <li><strong>Sahara greening/desertification</strong> — vegetation-climate coupling</li>
          </ul>

          <Figure
            src="/images/phd/temp_proxy.png"
            caption="Paleoclimate proxy data showing past abrupt climate transitions. Can we detect early warning signals in such records?"
          />

          <h2 className="text-2xl mb-4 font-bold">Publications</h2>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold">Paper 1 — EPL (Europhysics Letters)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                "A novel scaling indicator of early warning signals helps anticipate tropical cyclones"
              </p>
              <p className="text-sm mt-1">
                Introduced the PS indicator and demonstrated its use on model systems and tropical cyclone data.
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold">Paper 2 — Chaos</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                "Generalized early warning signals in multivariate and gridded data with an application to tropical cyclones"
              </p>
              <p className="text-sm mt-1">
                Extended EWS methods to multivariate systems using EOF analysis and spatial gridded data.
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-semibold">Paper 3 — Environmental Research Letters</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                "Early warning signals of the termination of the African Humid Period"
              </p>
              <p className="text-sm mt-1">
                Applied EWS techniques to paleoclimate data to study the desertification of the Sahara.
              </p>
            </div>
          </div>

          <h2 className="text-2xl mb-4 font-bold">Codebase & Implementation</h2>

          <p className="mb-4 text-justify">
            The analysis was primarily conducted in MATLAB with supplementary Python scripts. I developed a
            modular codebase with reusable functions for calculating EWS indicators, integrating stochastic
            differential equations, and analysing multivariate time series.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Repository Structure</h3>

          <CodeBlock title="Project Structure">
{`MatlabCode/
├── Core_Functions/
│   ├── Indicator_methods/
│   │   ├── Scaling/          # ACF, DFA, PSE core algorithms
│   │   └── Sliding_window/   # Sliding window implementations
│   ├── Dynamical_Systems/    # Hopf, homoclinic, Van der Pol
│   ├── NumericalIntegration/ # Milstein SDE solver
│   └── Statistics/           # Mann-Kendall trend test
├── Projects/
│   ├── Paper2018_EPL/        # Scaling indicators paper
│   ├── Paper2019_Multidim/   # Multivariate EWS paper
│   └── Thesis/               # Thesis chapter code
├── Data/
│   ├── HadISD/               # Weather station data
│   └── Ice_Cycles/           # Paleoclimate records
└── Tests/                    # Unit tests`}
          </CodeBlock>

          <h3 className="text-xl mt-6 mb-3 font-semibold">Core Indicator Functions</h3>

          <p className="mb-4">
            The three main EWS indicators are implemented as standalone functions that can be applied to any time series:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">Function</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">EWS Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">ACF.m</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Lag-k autocorrelation</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">ACF(1) → 1</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">DFA.m</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Detrended Fluctuation Analysis</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">α → 1.5</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">PSE.m</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Power Spectrum Exponent</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">β → 2</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-mono">VAR_sliding.m</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">Sliding window variance</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">σ² → ∞</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg mt-6 mb-3 font-semibold">ACF Implementation</h4>

          <p className="mb-4">
            The autocorrelation function measures how correlated a time series is with a lagged version of itself:
          </p>

          <CodeBlock title="ACF.m — Autocorrelation Function">
{`function auto_corr = ACF(data, lag)
%% ACF Compute autocorrelation at a given lag
%
% Formula: ACF(k) = E[(X_t - μ)(X_{t+k} - μ)] / Var(X)

    m = mean(data);
    n = size(data, 1);

    data1 = data(1:n-lag) - m;
    data2 = data(1+lag:n) - m;

    auto_corr = mean(data1 .* data2) / var(data);
end`}
          </CodeBlock>

          <h4 className="text-lg mt-6 mb-3 font-semibold">DFA Implementation</h4>

          <p className="mb-4">
            Detrended Fluctuation Analysis quantifies long-range correlations by measuring how the RMS
            fluctuation scales with segment length. The algorithm divides the cumulative sum (profile)
            into segments, fits a polynomial trend to each, and computes the residual variance:
          </p>

          <CodeBlock title="DFA.m — Detrended Fluctuation Analysis">
{`function F = DFA(data, segment_len, order)
%% DFA - Measures long-range correlations
% Reference: Peng et al. (1994)

% Step 1: Compute cumulative sum (profile)
N = size(data, 1);
Y = cumsum(data);

% Step 2: Divide into segments and detrend
Ns = floor(N / segment_len);
Fs = zeros(Ns, 1);

for nu = 1:Ns
    indices = ((nu-1)*segment_len + 1 : nu*segment_len)';

    % Fit polynomial and compute residuals
    poly = polyfit(indices, Y(indices), order);
    trend = polyval(poly, indices);
    residuals = Y(indices) - trend;

    % Segment variance
    Fs(nu) = mean(residuals.^2);
end

% Step 3: RMS fluctuation
F = sqrt(mean(Fs));
end`}
          </CodeBlock>

          <p className="mb-4">
            The DFA exponent α is estimated by computing F(s) for multiple segment lengths and fitting
            log(F) vs log(s). For white noise α ≈ 0.5; for random walk α ≈ 1.5.
          </p>

          <h4 className="text-lg mt-6 mb-3 font-semibold">PSE Implementation (Novel Contribution)</h4>

          <p className="mb-4">
            The Power Spectrum Exponent estimates β from the slope of the power spectrum in log-log space.
            A key insight was selecting the appropriate frequency range for fitting:
          </p>

          <CodeBlock title="PSE.m — Power Spectrum Scaling Exponent">
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

          <h4 className="text-lg mt-6 mb-3 font-semibold">Sliding Window Analysis</h4>

          <p className="mb-4">
            To track indicator evolution over time, each function has a sliding window variant:
          </p>

          <CodeBlock title="ACF_sliding.m — Sliding Window Analysis">
{`function slidingACF = ACF_sliding(data, lag, windowSize)
%% Compute ACF in sliding windows across the time series

    n = size(data, 1);
    slidingACF = zeros(n, 1);

    for i = (windowSize + 1):n
        window = data((i - windowSize):i);
        slidingACF(i) = ACF(window, lag);
    end
end`}
          </CodeBlock>

          <h3 className="text-xl mt-8 mb-3 font-semibold">Numerical Integration of SDEs</h3>

          <p className="mb-4 text-justify">
            Test systems were integrated using the Milstein method for stochastic differential equations
            of the form dX = f(X,t)dt + σdW. The implementation handles both constant and time-varying
            noise amplitudes:
          </p>

          <CodeBlock title="milstein.m — SDE Integration">
{`function [t, Y] = milstein(f, sigma, x0, tBounds, dt)
%% Milstein method for SDEs: dX = f(X,t)dt + σdW

N = floor((tBounds(2) - tBounds(1)) / dt);
t = linspace(tBounds(1), tBounds(2), N)';
m = size(x0, 1);   % System dimension
Y = zeros(m, N);
Y(:,1) = x0;

for i = 2:N
    dW = randn(m, 1);  % Brownian increment

    % Euler-Maruyama step
    Y(:,i) = Y(:,i-1) + f(Y(:,i-1), t(i-1))*dt ...
             + sqrt(dt) * sigma * dW;
end
end`}
          </CodeBlock>

          <h3 className="text-xl mt-8 mb-3 font-semibold">Test Systems</h3>

          <p className="mb-4">
            I implemented several dynamical systems to validate EWS methods under controlled conditions:
          </p>

          <CodeBlock title="Hopf Bifurcation Example">
{`% Hopf bifurcation: stable equilibrium → limit cycle
% System: dr/dt = μr - r³,  dθ/dt = ω

x0 = [0.001; 0];  % Start near origin
T_end = 65;

% μ increases from -2.9 to 0.2 (crosses bifurcation at μ=0)
mu = @(t) -2.9 + 0.05*t;

[t, r] = hopf_fun(0, T_end, x0, mu, 0.01);

% Convert to Cartesian for analysis
x = r(:,1) .* cos(r(:,2));
y = r(:,1) .* sin(r(:,2));

% Apply EWS indicators
acf1 = ACF_sliding([x, y], 1, 100);
dfa_alpha = DFA_sliding([x, y], 2, 100);`}
          </CodeBlock>

          <h3 className="text-xl mt-8 mb-3 font-semibold">The AR(1) Model for Critical Slowing Down</h3>

          <p className="mb-4 text-justify">
            Critical slowing down is often modelled as a first-order autoregressive process:
          </p>

          <MathBlock>
            x(t) = μ · x(t-1) + η(t)
          </MathBlock>

          <p className="mb-4 text-justify">
            where η(t) is Gaussian white noise. As μ approaches 1, the process becomes more "memory-like" —
            perturbations persist longer before decaying. The power spectrum of this process is:
          </p>

          <MathBlock>
            S(f) = σ² / (1 + μ² - 2μ·cos(2πf))
          </MathBlock>

          <p className="mb-4 text-justify">
            A key theoretical contribution was showing that even though this doesn't exhibit true power-law
            scaling, fitting a scaling exponent β still provides a monotonically increasing indicator as
            μ → 1, making it valid for EWS detection.
          </p>

          <h3 className="text-xl mt-8 mb-3 font-semibold">EOF Analysis for Multivariate Data</h3>

          <CodeBlock title="EOF_sliding.m — Dimension Reduction">
{`function eof_ts = EOF_sliding(data, windowSize)
%% Project multivariate data onto principal component

    [n, dim] = size(data);
    eof_ts = zeros(n, 1);

    for i = (windowSize + 1):n
        window = data((i - windowSize):i, :);

        % Compute covariance matrix
        C = cov(window);

        % Find eigenvector with largest eigenvalue
        [V, D] = eig(C);
        [~, idx] = max(diag(D));

        % Project current point onto EOF
        eof_ts(i) = data(i, :) * V(:, idx);
    end
end`}
          </CodeBlock>

          <h3 className="text-xl mt-8 mb-3 font-semibold">Usage Example</h3>

          <CodeBlock title="Complete EWS Analysis Pipeline">
{`%% Generate test data with increasing autocorrelation
N = 1000;
phi = linspace(0.5, 0.95, N);  % AR(1) coefficient → 1
data = zeros(N, 1);

for i = 2:N
    data(i) = phi(i) * data(i-1) + randn;
end

%% Calculate sliding window indicators
windowSize = 100;

acf1 = ACF_sliding(data, 1, windowSize);
dfa_alpha = DFA_sliding(data, 2, windowSize);
pse_beta = PSE_sliding(data, windowSize);
variance = VAR_sliding(data, windowSize);

%% Statistical significance: Mann-Kendall trend test
[~, p_acf] = mannkendall(acf1(windowSize+1:end));
[~, p_dfa] = mannkendall(dfa_alpha(windowSize+1:end));
[~, p_pse] = mannkendall(pse_beta(windowSize+1:end));

%% Plot results
figure
subplot(4,1,1); plot(data); ylabel('Data')
subplot(4,1,2); plot(acf1); ylabel('ACF(1)')
subplot(4,1,3); plot(dfa_alpha); ylabel('DFA α')
subplot(4,1,4); plot(pse_beta); ylabel('PSE β')`}
          </CodeBlock>

          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Key Contributions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Developed the <strong>Power Spectrum (PS) scaling indicator</strong> as a novel EWS method</li>
              <li>Proved theoretical validity of PS indicator for non-power-law-scaling processes</li>
              <li>Justified EOF dimension reduction for variance-based EWS detection</li>
              <li>Applied EWS methods to tropical cyclone prediction — a novel application domain</li>
              <li>Developed a stochastic hurricane model parameterised by EWS indicators</li>
              <li>Published three peer-reviewed papers in physics and climate journals</li>
            </ul>
          </div>

          <h2 className="text-2xl mt-8 mb-4 font-bold">Reflections</h2>

          <p className="mb-4 text-justify">
            This PhD taught me that the most interesting problems often lie at the boundaries between fields.
            Tipping point theory draws on dynamical systems, statistics, time series analysis, and domain-specific
            knowledge from climate science to ecology. The mathematical beauty of critical slowing down is that
            the same signatures appear in systems as different as lakes, climate, and financial markets.
          </p>

          <p className="mb-4 text-justify">
            The practical challenge is that real data is messy. Periodicities, non-stationarity, measurement
            noise, and finite sample sizes all conspire against clean detection. My work on the PS indicator
            was partly motivated by the real-world problem of 12-hour tidal oscillations corrupting the
            autocorrelation signal in sea-level pressure data.
          </p>

          <p className="mb-4 text-justify">
            Perhaps the most important lesson: early warning signals are not predictions. They indicate
            increased risk, not certainty. A rising indicator means "the system is losing resilience" —
            whether or not a tipping point actually occurs depends on factors we may not be measuring.
          </p>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default EarlyWarningSignalsProject
