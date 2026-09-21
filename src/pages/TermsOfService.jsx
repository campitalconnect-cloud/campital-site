import React from 'react';
import { LegalLayout } from '../components/legal/LegalLayout';

export const TermsOfService = () => {
  return (
    <LegalLayout
      title="Terms of Service (Draft)"
      summary="Preliminary terms governing website access, platform information, and non-binding inquiry submissions."
    >
      <h3>1. Acceptance of Terms</h3>
      <p>
        By accessing or using the Campital website ("Site"), you acknowledge that you have read, understood, and agreed to these preliminary draft terms.
      </p>

      <h3>2. Nature of Platform Services</h3>
      <p>
        Campital is an evaluation, discovery, and capital-introduction platform designed to connect campus-affiliated founders, campus incubators, independent SMEs, and capital providers.
      </p>
      <ul>
        <li><strong>Not an Investment Adviser or Broker:</strong> Campital is not a registered broker-dealer, funding portal, investment adviser, bank, or crowdfunding entity under federal or state securities laws.</li>
        <li><strong>No Guaranteed Funding:</strong> Participation in hackathons, demo days, pitch showcases, or inquiry submissions does not guarantee investment capital, term sheets, valuation minimums, or commercial partnerships.</li>
        <li><strong>Non-Binding Inquiries:</strong> Submitting an inquiry form or generating an email draft does not constitute a contractual agreement, equity commitment, or official application approval.</li>
      </ul>

      <h3>3. Intellectual Property</h3>
      <p>
        All brand names, geometric wordmarks, layouts, text copy, and original visual elements on this website are the property of Campital or its co-founders, protected by applicable copyright and intellectual property laws.
      </p>

      <h3>4. User Conduct & Accuracy of Information</h3>
      <p>
        When preparing an inquiry or application via the website, you agree to provide truthful and accurate information regarding your startup, academic affiliation, or organization. Fabricating entity status, revenue figures, or affiliations is strictly prohibited.
      </p>

      <h3>5. Limitation of Liability</h3>
      <p>
        The content on this Site is provided for informational and preliminary evaluation purposes only on an "as is" and "as available" basis. To the maximum extent permitted by law, Campital disclaims all warranties, express or implied, regarding site accuracy, uptime, or investment outcomes.
      </p>

      <h3>6. Modifications & Governing Law</h3>
      <p>
        Campital reserves the right to modify these terms at any time. Finalized commercial terms, incubator partnership agreements, and capital provider framework agreements will be executed through formal written legal contracts.
      </p>
    </LegalLayout>
  );
};
