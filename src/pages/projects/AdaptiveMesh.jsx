import React from 'react';
import Layout from '../../components/Layout';
import ContentBlock from '../../components/ContentBlock';
import { Grid2X2 } from 'lucide-react';
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

const AdaptiveMeshProject = () => {
  return (
    <Layout>
      <ContentBlock title="Adaptive Mesh Generation via Optimal Transport" icon={Grid2X2} githubUrl="https://github.com/DrPrettyman/MRes" maxWidth='4xl'>
        <div className="text-gray-700 dark:text-white">

          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm">
              <strong>MRes Thesis</strong> — Imperial College London, 2015. Supervised by Dr. Hilary Weller & Dr. Phil Browne, Department of Meteorology, University of Reading.
              {' '}<a href="/documents/MResDissertation.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">Read the thesis</a>.
            </p>
          </div>

          <h2 className="text-2xl mb-4 font-bold">The Problem</h2>

          <p className="mb-4 text-justify">
            Numerical weather prediction and climate modelling require solving partial differential equations
            on computational meshes. Traditional <strong>uniform grids</strong> waste computational resources:
            they over-resolve smooth regions while potentially missing important small-scale features like
            weather fronts, convective systems, and boundary layers.
          </p>

          <p className="mb-4 text-justify">
            <strong>Adaptive mesh refinement</strong> addresses this by concentrating mesh points where they're
            most needed. This thesis focuses on <strong>r-adaptive methods</strong> (mesh redistribution) that
            move existing mesh points optimally without changing mesh topology — a particularly elegant approach
            that preserves mesh quality while improving resolution.
          </p>

          <Figure
            src="/images/mres/densityfunction.png"
            caption="Centroidal Voronoi Tessellation: random point distribution (left) vs optimised mesh distribution concentrated around a density function (right)."
          />

          <h2 className="text-2xl mb-4 font-bold">The Mathematical Framework</h2>

          <p className="mb-4 text-justify">
            The goal is to find a mesh transformation that <strong>equidistributes</strong> a monitor
            function M(x). The monitor function is large where we want high resolution (e.g., near weather
            fronts) and small in smooth regions.
          </p>

          <p className="mb-4 text-justify">
            The equidistribution problem can be formulated as finding a map F that satisfies:
          </p>

          <MathBlock>
            {String.raw`M(\mathbf{x}) \cdot |I + H(\phi)| = c`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where φ is a scalar potential, H(φ) is its Hessian matrix, and c is a constant. This is the
            <strong> Monge-Ampère equation</strong> — a fully nonlinear elliptic PDE that arises naturally
            in optimal transport theory.
          </p>

          <p className="mb-4 text-justify">
            The mesh transformation is then given by the gradient of φ:
          </p>

          <MathBlock>
            {String.raw`\mathbf{x}_{new} = \mathbf{x}_{old} + \nabla\phi`}
          </MathBlock>

          <h2 className="text-2xl mb-4 font-bold">Three Numerical Methods</h2>

          <p className="mb-4 text-justify">
            The thesis implements and compares three approaches for solving the Monge-Ampère equation:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Method</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Approach</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Parameters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">PMA</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Parabolic relaxation with time-stepping</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Requires γ tuning</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">FP</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fixed-point iteration</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Requires γ tuning</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">AL (Novel)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Alternative linearisation</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-green-600 dark:text-green-400">Parameter-free</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl mb-3 font-semibold">The Alternative Linearisation (AL) Method</h3>

          <p className="mb-4 text-justify">
            The key contribution of this thesis is the <strong>Alternative Linearisation method</strong>,
            which introduces a novel way to linearise the Monge-Ampère equation:
          </p>

          <MathBlock>
            {String.raw`|I + H(\phi)| = |I + H(\bar{\phi})| + |H(\psi)| + \nabla \cdot (A \cdot \nabla\psi)`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where φ̄ is the previous iterate and ψ is the correction. The crucial advantage is that this
            formulation requires <strong>no tuning parameters</strong> — it converges reliably across
            different monitor functions without adjustment.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Test Cases</h2>

          <p className="mb-4 text-justify">
            Two radially symmetric monitor functions were used to test the methods:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Ring Function</h4>
              <p className="text-sm">Concentrates mesh points in a ring around the origin. A moderately challenging test case.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Bell Function</h4>
              <p className="text-sm">Concentrates mesh points at the centre. More challenging — the FP method fails without careful tuning.</p>
            </div>
          </div>

          <p className="mb-4 text-justify">
            The monitor functions are defined as:
          </p>

          <MathBlock>
            {String.raw`M(r) = 1 + \alpha_1 \exp\left(-\alpha_2 (r - a)^2\right)`}
          </MathBlock>

          <p className="mb-4 text-justify">
            where r is the distance from the origin, a is the location of maximum refinement (a=0.25 for ring, a=0 for bell),
            and α₁, α₂ control the magnitude and sharpness.
          </p>

          <h2 className="text-2xl mb-4 font-bold">Key Results</h2>

          <div className="mt-6 mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Performance Comparison</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>AL method converges in ~50 iterations</strong> for both test cases without any parameter tuning</li>
              <li><strong>FP method fails on the bell function</strong> without very careful γ selection</li>
              <li><strong>PMA method requires different γ values</strong> for different monitor functions</li>
              <li>The <strong>1/d power law</strong> (where d is dimension) significantly improves stability across all methods</li>
            </ul>
          </div>

          <h2 className="text-2xl mb-4 font-bold">Implementation</h2>

          <p className="mb-4 text-justify">
            The methods were implemented using <strong>OpenFOAM</strong> for finite volume discretisation,
            with Python (NumPy, SciPy, Matplotlib) for analysis and visualisation.
          </p>

          <CodeBlock title="Monitor Function (Python)">
{`import numpy as np

def monitor_function(x, y, a=0.25, alpha1=10, alpha2=200):
    """
    Compute monitor function M(r) = 1 + alpha1 * exp(-alpha2 * (r-a)^2)

    Parameters:
        a: location of maximum refinement (0 for bell, 0.25 for ring)
        alpha1: magnitude of refinement
        alpha2: sharpness of refinement region
    """
    r = np.sqrt(x**2 + y**2)
    return 1 + alpha1 * np.exp(-alpha2 * (r - a)**2)

# Example: Ring function
M_ring = monitor_function(X, Y, a=0.25, alpha1=10, alpha2=200)

# Example: Bell function (more challenging)
M_bell = monitor_function(X, Y, a=0, alpha1=50, alpha2=100)`}
          </CodeBlock>

          <h2 className="text-2xl mb-4 font-bold">Applications</h2>

          <p className="mb-4 text-justify">
            Adaptive mesh methods have broad applications across computational science:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
            <li><strong>Numerical Weather Prediction</strong> — resolving weather fronts and convective systems</li>
            <li><strong>Climate Modelling</strong> — adaptive resolution for multi-scale phenomena</li>
            <li><strong>Computational Fluid Dynamics</strong> — tracking shocks and boundary layers</li>
            <li><strong>Astrophysics</strong> — resolving gravitational collapse and accretion disks</li>
          </ul>

          <h2 className="text-2xl mb-4 font-bold">Conclusions</h2>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Key Contributions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Developed a <strong>novel parameter-free linearisation</strong> for the Monge-Ampère equation</li>
              <li>Demonstrated <strong>robust convergence</strong> across different monitor functions</li>
              <li>Provided systematic <strong>comparison of three numerical methods</strong></li>
              <li>Established foundation for <strong>adaptive mesh methods in meteorology</strong></li>
            </ul>
          </div>

          <p className="mt-6 mb-4 text-justify">
            This work contributed to the ongoing development of adaptive mesh methods for weather and climate
            prediction, where efficient resolution of localised features remains a significant computational challenge.
          </p>

        </div>
      </ContentBlock>
    </Layout>
  )
}

export default AdaptiveMeshProject
