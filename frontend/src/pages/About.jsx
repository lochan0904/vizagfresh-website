function About() {
  return (
    <>
      <section className="section">
        <div className="wrap story-flex">
          <div className="founder-card">
            <div>
              <span className="avatar a">A</span>
              <span className="avatar s">S</span>
            </div>
            <h3 style={{ color: 'var(--green-dark)', margin: '14px 0 4px' }}>Anil &amp; Srija</h3>
            <p style={{ color: 'var(--gray)', fontSize: 14 }}>Founders, VizagFresh</p>
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">How VizagFresh Started</h2>
            <p style={{ marginBottom: 16 }}>
              VizagFresh began with a simple frustration: every time we visited home in Visakhapatnam, we couldn't
              find the kind of cold-pressed, no-preservative juice that had become part of our everyday routine
              abroad. What we found instead were sugar-loaded packaged juices, roadside stalls with inconsistent
              hygiene, or nothing at all.
            </p>
            <p style={{ marginBottom: 16 }}>
              Vizag has grown fast — new IT parks, a health-conscious young population, and a city that's clearly
              ready for better everyday food and drink options. What it hasn't had yet is an organized, transparent
              cold-press juice brand: one that shows you exactly what's in the bottle, tests it, and presses it the
              same morning you drink it.
            </p>
            <p className="quote">"Pressed this morning. Yours by noon."</p>
            <p>
              So we decided to build it ourselves — sourcing from local farmers and Rythu Bazaar, cold-pressing in
              small daily batches, and holding ourselves to lab-tested quality standards from day one. VizagFresh is
              our first store, opening soon in Visakhapatnam.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 640, marginBottom: 8 }}>
            <span className="eyebrow">Our Timeline</span>
            <h2 className="section-title">From Idea to Storefront</h2>
          </div>
          <div className="timeline" style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div><strong>The idea.</strong> Noticing the gap in Vizag's market compared to cold-press culture abroad.</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div><strong>Planning.</strong> Building the business plan, sourcing equipment, and designing the menu.</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div><strong>On the ground.</strong> Anil &amp; Srija travel to Visakhapatnam to finalize the store, staff, and suppliers.</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div><strong>Launch.</strong> Doors open — fresh, cold-pressed juice, made daily, for Vizag.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap quality-note">
          <div className="center" style={{ maxWidth: 640 }}>
            <span className="eyebrow">Quality Promise</span>
            <h2 className="section-title">Tested at Every Step</h2>
            <p className="section-sub center">
              Daily pH &amp; sensory checks, weekly microbial testing, monthly nutritional panels, and quarterly
              full compliance audits at an FSSAI-accredited lab.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
