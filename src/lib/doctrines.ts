export type DoctrineSection = {
  heading: string;
  paragraphs: string[];
  /** Optional wine-ink margin note rendered alongside this section. */
  margin?: string;
};

export type Doctrine = {
  slug: string;
  number: string;
  title: string;
  version: string;
  date: string;
  thesis: string;
  tagline: string;
  imagePrompt: string;
  sections: DoctrineSection[];
  closing: string;
};

export const DOCTRINES: Doctrine[] = [
  {
    slug: "end-of-the-hierarchy",
    number: "01",
    title: "The End of the Hierarchy",
    version: "1.0",
    date: "May 2026",
    tagline: "The hierarchy was a workaround. The workaround is obsolete.",
    imagePrompt:
      "An abstract architectural diagram of an organizational hierarchy dissolving into a network of glowing cyan nodes against a near-black void background. Top-down org chart pyramid disassembling at the edges, the boxes turning into translucent particles that re-form as a horizontal mesh of equal nodes. Sharp engineering aesthetic, technical blueprint feel, terminal-green/cyan accent on deep navy. Wide aspect 16:9. No text, no logos.",
    thesis:
      "The organizational hierarchy was never a management philosophy. It was a technology workaround — a system of human-powered information routing built to compensate for the computational and communication constraints of pre-digital organizations. Those constraints no longer exist.",
    sections: [
      {
        heading: "What the Hierarchy Actually Is",
        margin: "fn. derived from communications theory — a hierarchy is a slow biological packet-routing network.",
        paragraphs: [
          "Strip away the org charts, the job titles, the management theories, and the leadership books, and what you find underneath the organizational hierarchy is a communications architecture. Nothing more.",
          "The fundamental problem every organization has always faced is this: work requires context, and context is distributed. The person building a product needs to know what the customer wants. The person managing the budget needs to know what the work costs. The person making the strategic call needs to know what is actually happening on the ground. None of these people can be in all places simultaneously. Information must travel.",
          "The hierarchy solved this by assigning humans to carry it. Managers existed because organizations needed a mechanism to aggregate information from the people doing the work, filter it, synthesize it, and route it to the people making decisions — and then reverse the direction, carrying decisions back down into action. The management layer was, in its purest functional form, a biological computer network. Slow, expensive, lossy, and prone to distortion at every relay — but capable of coordinating complexity at scales that would otherwise be impossible.",
          "This was not a design flaw. Given the constraints of the era — no persistent digital records, no real-time communication across distance, no system capable of storing and querying the full context of an organization's operations — the hierarchy was the best available solution to a genuine engineering problem. The problem is that most organizations still treat it as such.",
        ],
      },
      {
        heading: "The Cost the Hierarchy Has Always Imposed",
        paragraphs: [
          "**Speed.** Information moving through a hierarchy degrades in velocity at every layer. A signal that originates at the edge of the organization — a customer complaint, a delivery risk, a market observation — must travel through multiple relay points before it reaches the person capable of acting on it strategically. By the time it arrives, it has been filtered through the priorities, interpretive frames, and risk tolerances of every human it passed through. The decision it triggers travels back down the same slow path.",
          "**Accuracy.** Each relay in a human information chain is a potential point of distortion. Not necessarily through dishonesty — though that happens too — but through the inevitable compression that occurs when a human summarizes, prioritizes, or reframes information before passing it on. The famous \"telephone game\" is not a children's game. It is an accurate model of how information behaves in a hierarchy.",
          "**Talent.** The hierarchy creates a specific type of career incentive: advancement means moving from doing work to managing people who do work. The most skilled practitioners are systematically promoted away from the domain of their skill into an administrative function they may be entirely unsuited for. The organization loses a skilled practitioner and gains a mediocre manager.",
          "**Decision quality.** The hierarchy centralizes decision-making authority at the levels furthest from the information those decisions depend on. The executive team, operating with the most compressed and filtered version of organizational reality, makes the highest-stakes calls. The people closest to the actual work — who hold the richest, most accurate context — are structurally excluded from decisions that affect them most directly.",
        ],
      },
      {
        heading: "What Changed",
        paragraphs: [
          "**First: persistent, structured, queryable organizational memory became possible.** Every decision, every communication, every delivery event, every financial transaction, every client interaction can now be captured as a digital artifact and stored in a system that any authorized party — human or AI — can query at any time, with full context.",
          "**Second: AI systems can now maintain and operate on that model at a scale no human layer can match.** An AI system can hold the full operational context of an entire organization and use it to coordinate work, surface signals, answer questions, and generate recommendations in real time. It does not get tired. It does not compress information to protect itself politically. It does not promote comfortable interpretations of uncomfortable data.",
          "The information routing problem — the problem the hierarchy was built to solve — is solved. The question is what organizations do with that fact.",
        ],
      },
      {
        heading: "What Replaces the Hierarchy",
        margin: "see also Doctrine 03 — the model is the replacement.",
        paragraphs: [
          "Replacing the hierarchy does not mean removing structure. It means replacing a structure built for human information routing with a structure built for intelligence-driven coordination. The replacement has two components: the model and the edge.",
          "**The model** is the continuously updated, machine-readable, queryable representation of everything the organization knows about itself. Every Skill held by every contributor — human or AI agent. Every Capability the organization has mastered, with its cost profile, quality history, and efficiency trend. Every client relationship and its full history. Every financial event and its attribution.",
          "This is not a database. It is an organizational intelligence — a living system that reflects reality as it changes and provides every actor in the organization with the context they need to act correctly without waiting for a human relay to provide it. The model is the replacement for management. It does what managers were always trying to do — maintain shared context and align action — without the speed penalty, the accuracy loss, or the political distortion.",
          "**The edge** is where humans operate. Not as information routers — as judgment engines. In the hierarchy-free organization, human attention is reallocated to the domains where it is genuinely irreplaceable: ethical decisions in novel situations, creative direction where taste matters as much as pattern recognition, relationship depth that no data model fully captures, and strategic calls where the cost of being wrong is existential.",
        ],
      },
      {
        heading: "What This Looks Like in Practice",
        paragraphs: [
          "The hierarchy-free organization does not look like anarchy. It looks like an operating system. Work is coordinated not by managers but by context — everyone who needs to act has access to the same accurate, current picture of what is happening and why.",
          "Decisions are made at the level where the best information lives — which is almost never the top of a hierarchy. Operational decisions are made by the people doing the work, with the model providing the context. Strategic decisions are made by the people accountable for the organization's direction, with the model providing the ground truth they need.",
          "Communication is written, not verbal. Not because verbal communication is inherently inferior, but because information that exists only in a conversation is invisible to the organizational intelligence. Every significant decision, commitment, escalation, and lesson is a digital artifact.",
          "Performance is measured continuously and automatically, against defined quality standards, not through periodic reviews conducted by someone who has been watching from a distance. There are no annual performance surprises. There is only the data, current and accurate.",
        ],
      },
      {
        heading: "The Competitive Implication",
        paragraphs: [
          "The organizations that will dominate the next decade are not those with the best products, the largest teams, or the most senior leadership. They are the ones that learn the fastest.",
          "Learning speed is determined by how quickly an organization can convert real-world signals — from clients, from delivery, from financial performance, from the market — into improved capabilities. In a hierarchy, this signal travels slowly, compresses at every relay, and frequently fails to reach the decision point intact. In an intelligence-driven organization, the signal is captured at the edge, stored in the model, and already feeding improvement processes before any human has held a retrospective meeting.",
          "The compounding effect of this difference is not linear. An organization that learns twice as fast does not end up twice as capable in five years. It ends up in a different category entirely.",
          "The hierarchy is not evil. It was the correct solution to a problem that no longer exists. What it is now is a competitive disadvantage. The question is not whether to end the hierarchy. It will end. The question is whether your organization ends it deliberately, with the intelligence infrastructure ready to replace it, or is ended by a competitor who did.",
        ],
      },
      {
        heading: "What SavvPro Built",
        paragraphs: [
          "SavvPro was designed from the outset without a management layer. Not as an experiment — as an engineering decision made after concluding that the hierarchy was the wrong solution to the coordination problem.",
          "In its place: the Company World Model, which maintains the full operational context of the organization continuously and makes it available to every contributor and every AI agent without latency or distortion. Three roles — the Individual Contributor, the Directly Responsible Individual, and the Player-Coach — that define accountability clearly without creating administrative layers between the work and the intelligence. And a suite of platforms — Business Pulse, Nexus, BaseEcho, BaseWave — that together form the operating system through which the intelligence coordinates the work.",
          "The model is not complete. It never will be — it grows richer with every delivery, every client relationship, every capability iteration. That is precisely the point. Every day the organization operates with discipline, the intelligence deepens and the coordination improves. The compound learning is the moat.",
        ],
      },
    ],
    closing:
      "SavvPro builds and operates AI-native platforms and delivers AI-powered services to organizations navigating the transition into the agentic era.",
  },
  {
    slug: "capabilities-over-features",
    number: "02",
    title: "Capabilities Over Features",
    version: "1.0",
    date: "May 2026",
    tagline: "Features are what you have done. Capabilities are what you are getting better at.",
    imagePrompt:
      "A side-by-side conceptual visualization. Left half: scattered cubes labeled as features, each isolated, no connections, dim and gray. Right half: an interconnected system of glowing cyan gears and feedback loops representing a capability — gears feeding into each other, with arrows showing compounding refinement cycles. Dark void background, terminal aesthetic, precise technical illustration style. Wide 16:9. No text in image.",
    thesis:
      "Features are outputs. Capabilities are engines. The shift from feature-thinking to Capability-thinking is the most consequential architectural decision an organization can make in the agentic era.",
    sections: [
      {
        heading: "The Feature Trap",
        paragraphs: [
          "Features are seductive because they are legible. A feature can be put in a proposal, listed in a brochure, checked off in a project plan, and pointed to in a retrospective. \"We built the voice agent.\" \"We delivered the content pipeline.\" Each of these is a complete sentence with a clear past tense.",
          "The trap is that a feature, once delivered, contributes almost nothing to the next delivery of the same type. Each engagement starts from roughly the same point. The cost estimate for the new engagement is based on the previous one plus or minus a judgment call. The quality depends heavily on which team members happen to be available. The timeline is a negotiation between optimism and experience.",
          "Feature-based organizations face a consistent set of structural problems: margins that compress as competition intensifies, delivery timelines that are difficult to predict, quality that varies with team composition, and a scaling model that requires hiring roughly proportionally to revenue. More clients means more people. More people means more coordination cost. More coordination cost means thinner margins.",
          "Feature-thinking also corrupts planning. The roadmap is a list. It is not a model of what the organization is getting better at. It tells you what you intend to make. Not how well you are getting at making it.",
        ],
      },
      {
        heading: "What a Capability Is",
        margin: "→ this is the organization's IP, in structured executable form. Not a list. A process.",
        paragraphs: [
          "A Capability is a formally defined, repeatable, measured production process. It is not a list of things the organization can do. It is a precisely documented mechanism for doing a specific class of work — with defined inputs, defined outputs, a defined quality standard, a current cost profile, and a tracked history of every time it has been deployed.",
          "Every Capability in SavvPro's Capabilities Registry contains: a **name and description** stated in operational terms; a **skill composition** identifying which skills are required, at what confidence level; a **quality specification** — the Definition of Done — stated in measurable terms; a **cost profile** measured from delivery history, not estimated; a **quality history** of DoD pass rates and outcomes; an **efficiency trend** showing whether delivery is compounding; and a **Capability owner** accountable for its maturity.",
          "This is what the organization actually owns. Not features. Capabilities.",
        ],
      },
      {
        heading: "The Compounding Effect",
        margin: "the only durable moat in a world of equal model access. See Doctrine 03 §4 on data accuracy as fuel.",
        paragraphs: [
          "The most important property of a Capability — the one that separates it decisively from a feature — is that it compounds.",
          "Each time a Capability is deployed, the organization learns something. The cost profile is updated with real delivery data. The quality history adds a new data point. The efficiency trend is recalculated. The skill composition is refined.",
          "The second deployment of a Capability is more efficient than the first. The fifth is more efficient than the second. The twentieth is dramatically more efficient than the first — faster, cheaper, and more reliably high-quality — not because the same people have gotten better through individual experience, but because the process itself has been improved systematically, and those improvements are available to anyone executing the Capability, regardless of their individual tenure.",
          "**Margins expand over time rather than compress.** As a Capability matures, the cost per delivery decreases while the quality and speed increase. The market rate does not decrease at the same rate. **Delivery becomes predictable.** Scoping is an analytical exercise, not a negotiation. **AI augmentation compounds the compounding.** Revenue becomes increasingly decoupled from headcount.",
        ],
      },
      {
        heading: "How Capabilities Are Built",
        paragraphs: [
          "Capabilities are never invented in a planning session. They are formalized from patterns in actual delivery. The process is: deliver something repeatedly, recognize the pattern, formalize the pattern as a Capability, and then improve the Capability systematically.",
          "Every client engagement is both a delivery and a Capability investment. When the same type of problem is solved more than once, the organization asks: what is the repeatable process here? What inputs, what steps, what quality checks, what outputs? That formalization is the Capability.",
          "The traditional product roadmap is replaced by failure signal. When the intelligence layer tries to compose a service for a client and cannot, because the required Capability does not exist or is too immature to deploy reliably, that failure is the backlog entry. The organization builds what real delivery demands, not what hypothetical planning predicts.",
        ],
      },
      {
        heading: "Service as Capability Composition",
        paragraphs: [
          "In the market-facing layer of a Capability-driven organization, services are not sold as feature bundles. They are composed from Capabilities. When a client engagement is scoped, the question is not \"what can we build for them?\" but \"which of our Capabilities apply to their problem, and how do we compose them into a service that solves it?\"",
          "This produces **honest scoping** — proposals reflect reality, not estimate. **Scalable delivery** — the quality is in the process, not in the individual. **A pricing model that rewards investment** — immature Capabilities are priced for risk; mature Capabilities are priced for the efficiency that earned them.",
        ],
      },
      {
        heading: "The AI-Native Relevance",
        paragraphs: [
          "Feature-thinking is especially dangerous in AI. The industry is littered with organizations that confuse AI capability with organizational Capability. They have access to powerful models. They can build an AI feature in a sprint. But building an AI feature is not the same as having a Capability for AI delivery.",
          "The organizations that will compound in the agentic era are those that treat every AI delivery as a Capability investment. The feedback loop is the moat. Features are not a moat. A refined, measured, continuously improving Capability is.",
        ],
      },
    ],
    closing:
      "Features are what you have done. Capabilities are what you are getting better at doing. The difference is compounding. And compounding, over time, is everything.",
  },
  {
    slug: "world-model-imperative",
    number: "03",
    title: "The World Model Imperative",
    version: "1.0",
    date: "May 2026",
    tagline: "The tools change. The model is yours.",
    imagePrompt:
      "A glowing translucent 3D wireframe globe made of interconnected data nodes — skills, capabilities, clients, financial events — each labeled subtly as glowing tags. Cyan and ice-white nodes on a void-black background, with subtle data streams flowing between them. Feels like a living organizational digital twin. Sharp, technical, sci-fi-realistic, with depth and atmosphere. Wide 16:9. No real text or logos.",
    thesis:
      "Every organization already has a World Model. The question is whether that model is explicit, structured, and queryable — or implicit, fragmented, and lossy.",
    sections: [
      {
        heading: "The Organization's Representation of Its Own Reality",
        paragraphs: [
          "A World Model, in the most precise sense, is a system's internal representation of the environment it must navigate. Every intelligent system operates on some model of reality. The quality of its decisions is bounded by the accuracy of that model.",
          "An organization's World Model is its internal representation of its own operational reality: what skills it holds, what capabilities it has mastered, what clients it serves and what those relationships actually look like, what delivery is in flight and what its health is, what the financial performance is and what is driving it, what risks are building and where.",
          "Every decision made in an organization is made against some version of this model. When the World Model is implicit — scattered across individual memories and siloed documents — every decision-maker is working from a partial, potentially outdated, and definitely unverifiable version of reality.",
        ],
      },
      {
        heading: "The Hidden Cost of the Implicit Model",
        margin: "fn. every departure costs roughly six months of equivalent ramp time. Rarely captured on a balance sheet.",
        paragraphs: [
          "**The onboarding tax.** Every new contributor must reconstruct relevant World Model context from scratch. They ask questions of colleagues. They dig through old emails. They piece together a picture that is incomplete at best. The time cost is measured in weeks. The accuracy cost is unmeasurable.",
          "**The departure cliff.** When a contributor who has been with the organization for years leaves, they take a disproportionate share of the implicit World Model with them. Client relationship history. Delivery lessons that were never written down. The reasoning behind decisions that now look arbitrary.",
          "**The scoping error cycle.** When delivery cost data exists only in memory, scoping new engagements is subjective. Humans systematically underestimate the complexity of work they have done before. The result is a persistent tendency to under-price, over-commit, and under-deliver on margin.",
          "**The signal loss problem.** Organizations generate enormous amounts of operational signal that contains actionable intelligence. In an implicit World Model, almost none of this signal reaches the people and processes capable of acting on it.",
          "**The coordination overhead.** When the World Model is implicit, alignment requires meetings. Regular updates, status calls, and check-ins exist primarily to synchronize each individual's partial version of the model with everyone else's.",
        ],
      },
      {
        heading: "What Making It Explicit Requires",
        paragraphs: [
          "Making the World Model explicit is a discipline project before it is a technology project. The technology that hosts the model is important, but it is secondary to the organizational practice of feeding it accurately and consistently.",
          "**The Skills and People layer** — the structured representation of what every contributor can do. Not job titles. Not years of experience. Specific, verifiable competencies, with confidence scores derived from actual work output.",
          "**The Capabilities layer** — the formal registry of what the organization can produce — every repeatable production process, with its skill requirements, quality specification, cost profile, and improvement history.",
          "**The Client and Relationship layer** — the full, current, accurate record of every client relationship — the history of every engagement, the current delivery status, the financial performance, the health signals.",
          "**The Financial and Performance layer** — the real-time, attribution-accurate record of every financial event, attributed to the Capability it served and the client engagement it supported.",
          "Each one is necessary. The model is only as useful as its least accurate component.",
        ],
      },
      {
        heading: "The Replacement for Management",
        paragraphs: [
          "The management layer in a traditional organization exists primarily to maintain a shared version of the World Model and use it to coordinate work. An explicit, current, accurate World Model does all of this — without the latency, without the compression, without the political distortion, and at a fraction of the cost.",
          "When a contributor needs the context that a manager used to provide, they query the model. When a new engagement needs to be scoped, the model provides the data. When a delivery risk is building, the model surfaces it. When a client relationship is deteriorating, the model flags it before a human has noticed the pattern.",
          "The World Model does not replace human judgment. It provides the context that makes human judgment accurate.",
        ],
      },
      {
        heading: "The Accuracy Imperative",
        margin: "the model is fed at the edge — Doctrine 01 explains why humans operate there as judgment engines.",
        paragraphs: [
          "The World Model is only as good as what goes into it. This is the point most organizations underestimate.",
          "The model is fed at the edge. Every contributor who logs their work accurately, attributes their costs correctly, updates their Skill Profile honestly, and records client interactions completely is making the model more accurate. Every contributor who skips the log, rounds the estimate, defers the update, or omits the uncomfortable signal is degrading the model.",
          "Accuracy and honesty at the edge are not administrative virtues. They are technical requirements.",
        ],
      },
      {
        heading: "The Compounding Advantage",
        paragraphs: [
          "The most important property of an explicit World Model is not its accuracy at any given moment. It is the compounding effect of improving accuracy over time.",
          "An organization that begins building its explicit World Model today and maintains it with discipline will, in three years, hold an intelligence infrastructure that cannot be purchased by a competitor starting fresh. The data is proprietary by definition — it reflects this organization's actual delivery history, actual client relationships, actual cost structure. No competitor can acquire it. It cannot be reverse-engineered.",
          "In a domain where every organization has access to the same AI models, the same development tools, and roughly the same talent market, the depth and accuracy of the organizational World Model is the primary source of durable competitive advantage.",
        ],
      },
    ],
    closing:
      "The imperative is not to have the best AI tools. It is to build the best model of your own organization. The tools change. The model is yours.",
  },
  {
    slug: "partner-doctrine",
    number: "04",
    title: "The Partner Doctrine",
    version: "1.0",
    date: "May 2026",
    tagline: "We are the backbone. The partner is the surface. The roles do not overlap.",
    imagePrompt:
      "Two abstract architectural columns connected by horizontal beams of cyan light, set against a deep navy void. One column represents 'intelligence backbone' — built of stacked translucent data layers; the other represents 'market surface' — a textured pillar suggesting human relationship and trust. The connecting beams pulse with light, suggesting bidirectional value flow. Editorial, technical-illustration aesthetic. Wide 16:9. No text or logos.",
    thesis:
      "SavvPro does not go to market alone. A SavvPro partner is not a reseller. It is an organization that carries the client relationship in a specific market and is backed by SavvPro's full intelligence infrastructure. The relationship is structural.",
    sections: [
      {
        heading: "Why the Partner Model Exists",
        margin: "concentration → maturity. Doctrine 02 in motion across the ecosystem.",
        paragraphs: [
          "SavvPro's primary competitive advantage is the depth and accuracy of its organizational intelligence — the Capabilities Registry, the World Model, the improvement loops that make every delivery more efficient than the last. This advantage is most powerful when applied repeatedly to similar problems within a market or vertical.",
          "The partner model creates exactly this condition. A partner operating in a specific vertical brings a concentrated set of client relationships. SavvPro's Capabilities are deployed repeatedly across those relationships. The Capabilities mature faster because the use cases repeat. The World Model grows richer because the client signals accumulate and cross-inform.",
          "This is the positive-sum structure that distinguishes a genuine partner relationship from a distribution arrangement. In distribution, the vendor wins when the distributor sells volume. In the SavvPro partnership model, both parties are investing in a shared intelligence infrastructure that makes both more capable.",
        ],
      },
      {
        heading: "What SavvPro Brings",
        paragraphs: [
          "**The Capabilities layer.** Formally defined, measured, continuously improving Capabilities across AI automation, voice agent deployment, chatbot deployment, knowledge base configuration, digital marketing automation, content generation, and the infrastructure that connects them. Production-grade processes with real cost profiles and real quality histories.",
          "**The platform infrastructure.** BaseEcho, BaseWave, Business Pulse, and Nexus are available to the partner ecosystem as delivery infrastructure. A partner does not need to build or procure these separately — they are part of what the partnership provides.",
          "**The World Model.** As the partnership deepens, the partner's vertical and market knowledge becomes part of the shared intelligence infrastructure. The partner contributes intelligence to the ecosystem through their delivery experience. The ecosystem returns richer Capabilities and more accurate delivery data.",
          "**The operating model itself.** Partners who adopt the Skills-to-Capabilities-to-Services model, the quality standards, and the decision-making frameworks become more capable organizations in their own right.",
        ],
      },
      {
        heading: "What the Partner Brings",
        paragraphs: [
          "**Established market presence and client trust.** The most valuable asset a partner brings is trust — the accumulated credibility of a relationship built over time in a specific market. This takes years to develop and cannot be replicated by a new entrant, regardless of Capability quality.",
          "**Vertical and contextual knowledge.** Every market has specific operating context — regulatory requirements, cultural norms, competitive dynamics, decision-making structures — that takes years of direct experience to understand correctly.",
          "**Client relationship ownership.** The partner carries the client relationship. SavvPro is present in the delivery, contributing the Capabilities, enriching the World Model — but the client's primary relationship is with the partner.",
          "**Intelligence contribution to the ecosystem.** Each partner engagement generates signal — delivery data, client feedback, market patterns, use case variations — that, when fed into the shared World Model, makes the Capabilities more refined for every subsequent deployment.",
        ],
      },
      {
        heading: "Partner Criteria",
        margin: "evaluated continuously, not just at signing. Partnerships are deepened, maintained, or quietly concluded.",
        paragraphs: [
          "**Market and vertical clarity.** A SavvPro partner has a defined market — a specific geography, industry vertical, or client segment where they have established presence. Generalist organizations without a defined market dilute the concentration of vertical signal that drives Capability maturity.",
          "**Delivery integrity.** A partner who cannot commit to SavvPro's quality standards — the Definition of Done, the contribution of accurate delivery data, the honest reporting of client signal — is not a partner this ecosystem can accommodate. The World Model's value depends on the discipline of every actor who feeds it.",
          "**Alignment with the operating model.** Partners who think in Capabilities rather than features, who value accuracy in delivery data, and who approach client relationships with honest communication.",
          "**Genuine reciprocity.** The partnership must be two-directional in practice. A partner who takes Capability access without contributing delivery signal, market intelligence, or honest feedback is eroding the ecosystem.",
        ],
      },
      {
        heading: "The Current Ecosystem",
        paragraphs: [
          "**MoInc (United States)** is SavvPro's anchor go-to-market partner. MoInc operates across diversified vertical client engagements, carrying the client relationship and deploying SavvPro's AI-native Capability layer. The MoInc partnership is the primary US market surface during the current stealth phase.",
          "**Zovox (zovox.ai)** is SavvPro's active technology and infrastructure partner, working alongside SavvPro on AI-native infrastructure deployments and joint Capability development. The relationship is as much a technical collaboration as a go-to-market partnership.",
          "The ecosystem is designed to expand. Future partners — vertical specialists, regional gateways, additional infrastructure providers — will join as the Capabilities mature and the ecosystem has the depth to support them. Partner addition follows the criteria above without exception.",
        ],
      },
      {
        heading: "How to Engage",
        paragraphs: [
          "SavvPro is in deliberate stealth during its current capability-building phase. Partner signups are handled manually, directly, and relationship-first.",
          "There is no form. There is no pipeline. There is a direct inquiry through savv.pro, a conversation with the SavvPro team to assess fit honestly on both sides, and a partnership structure built around the specific market, Capability fit, and reciprocal commitments that make the relationship genuinely structural.",
          "We are not looking for volume in the partner ecosystem. We are looking for the right organizations — those whose market presence, operating principles, and commitment to genuine reciprocity make the partnership a compounding asset for both parties.",
        ],
      },
    ],
    closing:
      "If that is what you are building, we want to hear from you.",
  },
];

export function getDoctrine(slug: string): Doctrine | undefined {
  return DOCTRINES.find((d) => d.slug === slug);
}
