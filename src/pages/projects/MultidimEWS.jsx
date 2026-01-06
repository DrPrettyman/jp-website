import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { Grid3X3 } from 'lucide-react';
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

const MultidimEWSProject = () => {
  return (
    <Layout>
      <ContentBlock title="Multivariate Early Warning Signals" icon={Grid3X3} githubUrl="https://github.com/DrPrettyman/PhD/tree/main/Papers/Paper2_Chaos/manuscript" maxWidth='4xl'>
        <div className="text-gray-700 dark:text-white">

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Published in Chaos (AIP Publishing)</strong>, 2019.
              {' '}<a href="https://doi.org/10.1063/1.5093495" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Read the paper</a>.
            </p>
            <p className="text-sm mt-2">
              <strong>Authors:</strong> J. Prettyman, T. Kuna, V. Livina
            </p>
          </div>

          <h2 className="text-2xl mb-4 font-bold">Summary</h2>

          <p className="mb-4 text-justify">
            Real-world dynamical systems rarely involve just one variable. Climate involves temperature,
            pressure, humidity, and countless other factors. This paper extends early warning signal (EWS)
            techniques from one-dimensional time series to <strong>multivariate and spatially distributed
            data</strong>.
          </p>

          <p className="mb-4 text-justify">
            The key contributions are: (1) an <strong>analytical justification</strong> for using
            Empirical Orthogonal Functions (EOF) for dimension reduction in EWS contexts, (2) extension
            of EWS techniques to <strong>2D spatial fields</strong>, and (3) development of a
            <strong>stochastic model of a moving cyclone</strong> to validate these methods.
          </p>

          <h2 className="text-2xl mb-4 font-bold">The Challenge of Multidimensional Data</h2>

          <p className="mb-4 text-justify">
            Standard EWS indicators (variance, autocorrelation, scaling exponents) are designed for
            univariate time series. When we have multiple variables or spatially distributed measurements,
            we need strategies to either:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><strong>Reduce dimensionality</strong> to apply 1D techniques to a derived signal</li>
            <li><strong>Extend the indicators</strong> to work directly with multivariate data</li>
            <li><strong>Analyse spatial patterns</strong> across multiple measurement locations</li>
          </ul>

          <h2 className="text-2xl mb-4 font-bold">Empirical Orthogonal Functions (EOF)</h2>

          <p className="mb-4 text-justify">
            The EOF method (also known as Principal Component Analysis) projects multidimensional data
            onto a new basis that maximises variance. The first EOF captures the direction of maximum
            variability in the system.
          </p>

          <p className="mb-4 text-justify">
            A natural question arises: <em>Does the component with maximum variance also capture the
            early warning signal?</em> After all, what matters for EWS detection is not variance itself,
            but the <strong>change in variance</strong> (or autocorrelation) as the system approaches
            a tipping point.
          </p>

          <h3 className="text-xl mb-3 font-semibold">Theoretical Justification</h3>

          <p className="mb-4 text-justify">
            I proved analytically that for a general linear dynamical system approaching bifurcation,
            the first EOF loading vector tends to align with the eigenvector corresponding to the
            critical mode &mdash; exactly where the EWS will be observed.
          </p>

          <p className="mb-4 text-justify">
            Consider a discrete dynamical system:
          </p>

          <MathBlock>
            {String.raw`\mathbf{x}_{n+1} = B \cdot \mathbf{x}_n + S \cdot \boldsymbol{\eta}_n`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where B is a contracting matrix with eigenvalue λ₁ approaching 1 (the bifurcation point).
            The covariance matrix of the system state is:
          </p>

          <MathBlock>
            {String.raw`\mathbb{E}[C] = \sum_{j=0}^{\infty} B^j \cdot S S^T \cdot (B^T)^j`}
          </MathBlock>

          <p className="mb-4 text-justify">
            As λ₁ → 1, the term (1 - λ₁²)⁻¹ dominates, and the principal eigenvector of E[C]
            aligns with the first eigenvector of B &mdash; precisely the direction where the
            bifurcation will occur.
          </p>

          <CodeBlock title="EOF_sliding.m - Dimension Reduction">
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

          <h2 className="text-2xl mb-4 font-bold">The Williamson Method: Direct Jacobian Estimation</h2>

          <p className="mb-4 text-justify">
            An alternative approach directly estimates the Jacobian eigenvalues from multivariate
            time series data. This method, introduced by Williamson et al., extends the 1D
            autocorrelation concept to multiple dimensions.
          </p>

          <p className="mb-4 text-justify">
            The matrix A is computed as a higher-dimensional analogue of the lag-1 autocorrelation:
          </p>

          <MathBlock>
            {String.raw`A = \frac{\sum_t (\mathbf{x}_{t+1} \cdot \mathbf{x}_t^T) - \bar{\mathbf{x}}^2}{\sum_t (\mathbf{x}_t \cdot \mathbf{x}_t^T) - \bar{\mathbf{x}}^2}`}
          </MathBlock>

          <p className="mb-4 text-justify">
            The eigenvalues of A relate to the Jacobian eigenvalues via:
          </p>

          <MathBlock>
            {String.raw`\text{Re}(\lambda_k) = \frac{1}{\Delta t} \ln|a_k|, \quad \text{Im}(\lambda_k) = \frac{1}{\Delta t} \varphi_k`}
          </MathBlock>

          <p className="mb-4 text-justify">
            As the system approaches a bifurcation, the real part of the leading Jacobian eigenvalue
            crosses from negative to positive, providing a direct indicator of the approaching
            instability.
          </p>

          <Figure
            src="/images/phd/spiral.png"
            caption="A Hopf bifurcation in the Van der Pol oscillator. The stable equilibrium becomes unstable and gives birth to a limit cycle as the control parameter crosses zero."
          />

          <h2 className="text-2xl mb-4 font-bold">Application to Tropical Cyclone Data</h2>

          <p className="mb-4 text-justify">
            Both methods were tested on <strong>sea-level pressure (SLP) and wind speed (WS) data</strong>
            from weather stations near tropical cyclone landfalls. The multivariate approach combines
            information from both variables.
          </p>

          <Figure
            src="/images/phd/one_and_many_timeseries.png"
            caption="Sea-level pressure time series from multiple weather stations in a region during a hurricane event."
          />

          <h3 className="text-xl mb-3 font-semibold">Results</h3>

          <p className="mb-4 text-justify">
            Applying the ACF1 indicator to the first EOF score of combined SLP and WS data produced
            an EWS intermediate between the individual variables &mdash; better than SLP alone
            (which showed no signal) but not as strong as WS alone. The PS indicator on EOF data
            performed similarly to PS on SLP alone.
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Data Source</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">ACF1 Trend</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">PS Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Sea-level pressure</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">-0.2</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">0.79</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Wind speed</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">0.91</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">0.70</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">EOF (combined)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold">0.45</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold">0.72</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">
            Mann-Kendall coefficients measuring indicator trend in the 30-hour window before the cyclone event.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Spatial Analysis: Heat Maps Over Geographic Regions</h2>

          <p className="mb-4 text-justify">
            For spatially distributed data, I developed a method to visualise EWS indicators across
            a geographic region. By calculating the PS indicator at each weather station and
            measuring its trend (using the Mann-Kendall coefficient), we can create contour maps
            showing where warning signals are strongest.
          </p>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">Hurricanes Analysed for Spatial Patterns:</p>
            <p className="text-sm">
              Andrew (Florida & Louisiana), Katrina, Wilma, Gustav, Matthew, Harvey, Irma, Nate
            </p>
          </div>

          <p className="mb-4 text-justify">
            The resulting contour maps consistently showed higher indicator values (stronger EWS)
            in the direction from which the hurricane approached &mdash; essentially revealing
            the hurricane's path as a "wave" of increasing indicator values.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Stochastic Hurricane Model</h2>

          <p className="mb-4 text-justify">
            To validate these methods, I developed a <strong>novel stochastic model</strong> of an
            approaching cyclone. The model combines the Holland pressure profile with time-varying
            noise that mimics the critical slowing down observed in real data.
          </p>

          <p className="mb-4 text-justify">
            The Holland model describes the pressure profile of a hurricane as:
          </p>

          <MathBlock>
            {String.raw`p(r) = p_c + (p_n - p_c) \cdot \exp\left(-\frac{A}{r^B}\right)`}
          </MathBlock>

          <p className="mb-4 text-justify">
            I modified this to model pressure at a fixed point as the cyclone approaches:
          </p>

          <MathBlock>
            {String.raw`p(d(t)) = p_c + (p_n(t) - p_c) \cdot \exp\left(-\frac{A}{d(t)^B}\right) + \eta_t`}
          </MathBlock>

          <p className="mb-4 text-justify">
            The noise term η_t has an increasing power spectrum exponent as the cyclone approaches,
            parameterised to match the indicator behaviour observed in real data.
          </p>

          <CodeBlock title="Moving Cyclone Model">
{`function p = cyclone_model(t, d, pc, pn, A, B, alpha)
%% CYCLONE_MODEL - Pressure at distance d from cyclone center
%
% Inputs:
%   t     - time vector
%   d     - distance to cyclone center as function of time
%   pc    - central pressure (e.g., 950 mbar)
%   pn    - ambient pressure function (includes tidal oscillation)
%   A, B  - Holland model parameters
%   alpha - PS exponent (increases as cyclone approaches)

% Ambient pressure with 12-hour tidal oscillation
K = rand() * 12;  % random phase offset
pn_t = 1016 + 5*randn() + 1.6*sin(2*pi*t/12 + K);

% Generate coloured noise with increasing alpha
noise = generate_coloured_noise(length(t), alpha);

% Holland pressure profile
p = pc + (pn_t - pc) .* exp(-A ./ d.^B) + noise;
end`}
          </CodeBlock>

          <p className="mb-4 text-justify">
            Running the model on a 10×10 spatial grid and computing the PS indicator at each
            point reproduced the spatial patterns observed in real hurricane data, validating
            our understanding of the statistics.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Conclusions</h2>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Key Contributions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Analytical justification</strong> for EOF dimension reduction in EWS contexts</li>
              <li>Demonstrated that EOF projections capture the <strong>critical mode</strong> of bifurcating systems</li>
              <li>Extended EWS methods to <strong>2D spatial fields</strong> via contour mapping</li>
              <li>Developed a novel <strong>stochastic hurricane model</strong> for method validation</li>
              <li>Applied multivariate techniques to <strong>real tropical cyclone data</strong></li>
              <li>Showed spatial patterns reveal hurricane approach direction</li>
            </ul>
          </div>

          <p className="mt-6 mb-4 text-justify">
            This work provides a foundation for applying EWS techniques to the rich, multidimensional
            datasets available from modern climate monitoring systems. The methods can be applied
            to any tipping-point phenomenon where high-resolution spatial data is available.
          </p>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>Citation:</strong> Prettyman, J., Kuna, T., & Livina, V. (2019).
              Generalised early warning signals in multivariate and gridded data with an application
              to tropical cyclones.
              <em>Chaos</em>, 29(7), 073105.
            </p>
          </div>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default MultidimEWSProject
