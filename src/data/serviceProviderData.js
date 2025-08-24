// Service Provider Program Data
// Source: https://discuss.ens.domains/c/service-provider-program/75

export const serviceProviderData = {
  programOverview: {
    title: "Service Provider Program (SPP)",
    description: "ENS DAO's program for funding and supporting service providers in the ENS ecosystem",
    currentPhase: "SPP2",
    totalProviders: 12,
    totalFunding: "$4.5M",
    lastUpdated: "2025-07-27"
  },

  spp2Details: {
    title: "Service Provider Program Season 2 (SPP2)",
    executableProposal: "EP 6.13",
    implementationDate: "2025-06-15",
    annualBudget: "$4.5M",
    previousBudget: "$3.6M",
    budgetIncrease: "$900K",
    totalProviders: 8,
    continuingProviders: 6,
    newProviders: 2,
    streamingInfrastructure: true,
    monthlyFunding: "$375K USDC",
    autoWrapperEnabled: true,
    description: "SPP2 represents a significant evolution of the Service Provider Program, increasing the annual budget to $4.5M and implementing advanced streaming infrastructure for continuous funding to 8 carefully selected providers.",
    keyFeatures: [
      "Streaming Infrastructure: Automated monthly disbursements through Stream Management Pod",
      "Increased Budget: 25% increase from $3.6M to $4.5M annually",
      "Provider Optimization: Refined selection from 9 to 8 high-performing providers",
      "Auto-Wrapper Integration: Enhanced fund management capabilities",
      "USDC Stability: Monthly 375K USDC funding for operational consistency"
    ],
    governanceLinks: [
      {
        title: "EP 6.13 Executable Proposal",
        url: "https://discuss.ens.domains/t/ep-6-13-executable-service-provider-program-season-2-implementation/20971",
        description: "Official executable proposal for SPP2 implementation"
      },
      {
        title: "SPP2 Stream Implementation Discussion",
        url: "https://discuss.ens.domains/t/spp2-stream-implementation-preparing-the-executable-proposal/20890",
        description: "Detailed technical implementation and preparation discussions"
      }
    ]
  },

  activeServiceProviders: [
    {
      id: "zk-email",
      name: "ZK Email",
      status: "Active",
      category: "Infrastructure",
      funding: "$180,000",
      applicationDate: "2025-07-27",
      description: "Zero-knowledge email integration for ENS",
      forumThread: "https://discuss.ens.domains/t/spp2-zk-email-application/20450",
      contributors: ["Yush", "jefflau.eth", "lightwalker.eth", "clowes.eth", "daostrat.eth"],
      replies: 12,
      views: 644
    },
    {
      id: "justaname",
      name: "JustaName",
      status: "Active",
      category: "Identity",
      funding: "$150,000",
      applicationDate: "2025-05-12",
      description: "ENS identity and naming services",
      forumThread: "https://discuss.ens.domains/t/spp2-justaname-application/20430",
      contributors: ["JustRyan", "daostrat.eth", "lightwalker.eth"],
      replies: 5,
      views: 584
    },
    {
      id: "namehash-labs",
      name: "NameHash Labs",
      status: "Active",
      category: "Development",
      funding: "$200,000",
      applicationDate: "2025-05-12",
      description: "ENS development tools and infrastructure",
      forumThread: "https://discuss.ens.domains/t/spp2-namehash-labs-application/20502",
      contributors: ["lightwalker.eth", "matoken.eth", "JustRyan", "typedarray.eth", "raffy"],
      replies: 14,
      views: 774
    },
    {
      id: "namestone",
      name: "NameStone",
      status: "Active",
      category: "Infrastructure",
      funding: "$120,000",
      applicationDate: "2025-05-07",
      description: "ENS domain management and analytics",
      forumThread: "https://discuss.ens.domains/t/spp2-namestone-application/20462",
      contributors: ["slobo.eth", "daostrat.eth", "jefflau.eth", "lightwalker.eth"],
      replies: 3,
      views: 299
    },
    {
      id: "namespace",
      name: "Namespace",
      status: "Active",
      category: "Infrastructure",
      funding: "$160,000",
      applicationDate: "2025-05-07",
      description: "ENS namespace management services",
      forumThread: "https://discuss.ens.domains/t/spp2-namespace-application/20456",
      contributors: ["cap", "daostrat.eth", "Griff", "lightwalker.eth"],
      replies: 4,
      views: 359
    },
    {
      id: "enscribe",
      name: "ENScribe",
      status: "Active",
      category: "Content",
      funding: "$140,000",
      applicationDate: "2025-05-07",
      description: "ENS content creation and management",
      forumThread: "https://discuss.ens.domains/t/spp2-enscribe-application/20474",
      contributors: ["conor", "daostrat.eth", "AvsA", "lightwalker.eth"],
      replies: 5,
      views: 245
    },
    {
      id: "eth-limo",
      name: "eth.limo",
      status: "Active",
      category: "Infrastructure",
      funding: "$180,000",
      applicationDate: "2025-05-07",
      description: "ENS gateway and infrastructure services",
      forumThread: "https://discuss.ens.domains/t/spp2-eth-limo-application/20369",
      contributors: ["ethlimo.eth", "daostrat.eth", "James", "lightwalker.eth"],
      replies: 3,
      views: 500,
      q2Update: {
        date: "2025-08-04",
        forumThread: "https://discuss.ens.domains/t/eth-limo-q2-2025-update/21159",
        achievements: [
          "Fixed IPNI issues with Pinata",
          "Performance tuning",
          "Informative error pages for IPFS/IPNS",
          "dataUri architecture finalized",
          "Battling spam/phishing/malicious traffic",
          "Legal work and SPP vote",
          "Rainbow security hardening and auditing (on-going)",
          "Fixed rare unicode bug"
        ],
        legalStatus: {
          ongoing: true,
          description: "Working with legal counsel to finalize public statements relating to Tornado Cash trial experience",
          impact: "Mental and emotional toll, working to get back into full operational capacity"
        },
        quarterlyMetrics: {
          totalQ2Traffic: 212439066,
          monthlyBreakdown: [
            {
              month: "May 2025",
              total: 55831806,
              doh: 8173823,
              ethLimo: 43502856,
              ethLink: 9345939,
              gnoLimo: 26494,
              uptime: "100%"
            },
            {
              month: "June 2025", 
              total: 79437896,
              doh: 10269298,
              ethLimo: 41701699,
              ethLink: 29022597,
              gnoLimo: 25389,
              uptime: "100%"
            },
            {
              month: "July 2025",
              total: 77169364,
              doh: 8962571,
              ethLimo: 57302685,
              ethLink: 13915170,
              gnoLimo: 26196,
              uptime: "99.999%"
            }
          ]
        }
      }
    },
    {
      id: "blockful",
      name: "Blockful",
      status: "Active",
      category: "Development",
      funding: "$130,000",
      applicationDate: "2025-05-07",
      description: "ENS development and integration services",
      forumThread: "https://discuss.ens.domains/t/spp2-blockful-application/20463",
      contributors: ["blockful", "daostrat.eth", "nick.eth", "lightwalker.eth"],
      replies: 3,
      views: 321
    },
    {
      id: "eif",
      name: "Ethereum Identity Foundation",
      status: "Active",
      category: "Research",
      funding: "$220,000",
      applicationDate: "2025-05-07",
      description: "ENS identity research and standards",
      forumThread: "https://discuss.ens.domains/t/spp2-ethereum-identity-foundation-application/20439",
      contributors: ["brantlymillegan", "daostrat.eth", "James", "lightwalker.eth"],
      replies: 3,
      views: 381,
      q2Update: {
        date: "2025-07-17",
        forumThread: "https://discuss.ens.domains/t/eif-efp-spp-financial-and-progress-reports/20102/3",
        financialStatus: {
          income: "ENS DAO SPP stream only",
          expenses: "Team pay (core team and outside advisors)",
          budget: "$500k SPP2 funding secured"
        },
        spp2Results: {
          ranking: "Ranked #2 in Average ENS Support, #3 in Copeland method wins",
          funding: "Basic scope budget ($500k) for another year",
          status: "Successfully secured SPP2 funding"
        },
        achievements: {
          ethcc: {
            event: "EthCC & ENS side event",
            presentation: "Brantly.eth presented 'We Finally Have the Elements of an Ethereum Identity Stack'",
            additional: "Lightning talk at ENS event, team networking for ENS, EFP, EIK promotion"
          },
          eik: {
            title: "Ethereum Identity Kit (EIK) Features",
            features: [
              "Full width profile cards",
              "Followers you know modal",
              "Paymaster support",
              "More options in checkout",
              "Sign in with Ethereum button",
              "Custom theme colors",
              "EFP Notifications component",
              "Followers/Following module",
              "Recommended module",
              "Efficiency improvements",
              "Bug fixes"
            ]
          },
          llms: {
            title: "LLMs.txt Context Files",
            description: "Created Minimal and Full context files for ENS, EFP, Sign in with Ethereum, and Ethereum Identity Kit",
            purpose: "Ensure LLMs have necessary niche context for coding and questions"
          },
          efp: {
            title: "Ethereum Follow Protocol (EFP) Improvements",
            features: [
              "Emergency Response plan for critical bugs",
              "Indexer automatic service redeployment in Railway",
              "Draft of new List Records V2 smart contract",
              "Active cache management for API",
              "Telegram notification bot",
              "Followers you know modal",
              "Profile pfp favicons",
              "Bug fixes"
            ],
            integrations: {
              new: 14,
              total: 58,
              examples: ["Dappcon app", "Namespace", "Common Ground", "ENScribe", "MetaPoll"]
            }
          },
          signInWithEthereum: {
            title: "Sign in with Ethereum EIP 4361",
            status: "Taking over abandoned EIP to get it finalized",
            progress: "Moved through several steps toward finalization, expected shortly"
          }
        },
        kpis: {
          target: "Per quarter: minimum 4 new EFP integrations, 2+ new EIK features, 2+ new EFP app features",
          status: "All KPIs fulfilled this quarter",
          details: {
            efpIntegrations: "14 new integrations (exceeded 4 minimum)",
            eikFeatures: "11+ new features (exceeded 2 minimum)",
            efpFeatures: "8+ new features (exceeded 2 minimum)"
          }
        },
        links: {
          stream: {
            etherscan: "Etherscan stream link",
            superfluid: "Superfluid stream link"
          },
          eif: "EIF Website",
          eik: {
            website: "EIK Website",
            github: "EIK Github",
            docs: "EIK Docs",
            twitter: "EIK Twitter/X"
          },
          efp: {
            website: "EFP Website",
            github: "EFP Github",
            docs: "EFP Docs",
            duneAnalytics: ["Dune Analytics 1", "Dune Analytics 2"],
            twitter: "EFP Twitter/X"
          }
        }
      }
    },
    {
      id: "pyor",
      name: "PYOR",
      status: "Active",
      category: "Governance",
      funding: "$110,000",
      applicationDate: "2025-04-27",
      description: "ENS governance and voting tools",
      forumThread: "https://discuss.ens.domains/t/spp2-pyor-application/20429",
      contributors: ["PYOR", "daostrat.eth"],
      replies: 4,
      views: 221
    },
    {
      id: "unicorn-eth",
      name: "ENS Accounts powered by Unicorn.eth",
      status: "Active",
      category: "Infrastructure",
      funding: "$140,000",
      applicationDate: "2025-04-27",
      description: "ENS account management and subdomain services",
      forumThread: "https://discuss.ens.domains/t/spp2-ens-accounts-powered-by-unicorn-eth/20467",
      contributors: ["Griff", "daostrat.eth"],
      replies: 5,
      views: 303
    },
    {
      id: "govpal",
      name: "GovPal",
      status: "Active",
      category: "Governance",
      funding: "$100,000",
      applicationDate: "2025-04-26",
      description: "ENS governance and voting interface",
      forumThread: "https://discuss.ens.domains/t/spp2-govpal-application/20459",
      contributors: ["Zeptimus", "daostrat.eth"],
      replies: 2,
      views: 142
    }
  ],

  programUpdates: [
    {
      id: "eif-q2-2025-financial-progress-report",
      title: "EIF/EFP: SPP financial and progress reports",
      date: "2025-07-17",
      category: "Provider Update",
      forumThread: "https://discuss.ens.domains/t/eif-efp-spp-financial-and-progress-reports/20102/3",
      contributors: ["brantlymillegan"],
      replies: 3,
      views: 245,
      description: "Q2 2025 financial and progress report covering SPP2 funding success, EthCC presentation, EIK/EFP development, and KPI achievements with 14 new EFP integrations"
    },
    {
      id: "eth-limo-q2-2025-update",
      title: "Eth.limo Q2 2025 - Update",
      date: "2025-08-04",
      category: "Provider Update",
      forumThread: "https://discuss.ens.domains/t/eth-limo-q2-2025-update/21159",
      contributors: ["ethlimo.eth"],
      replies: 8,
      views: 245,
      description: "Q2 2025 update covering technical achievements, legal status, and quarterly traffic metrics showing 212M+ total requests with 99.999% uptime"
    },
    {
      id: "spp2-executable-implementation",
      title: "EP 6.13 [Executable] - Service Provider Program Season 2 Implementation",
      date: "2025-06-15",
      category: "Executable Proposal",
      forumThread: "https://discuss.ens.domains/t/ep-6-13-executable-service-provider-program-season-2-implementation/20971",
      contributors: ["ENS DAO", "Stream Management Pod", "Working Group Stewards"],
      replies: 12,
      views: 892,
      description: "Official implementation of SPP2 with $4.5M annual budget, streaming infrastructure, and enhanced provider support"
    },
    {
      id: "stream-implementation",
      title: "SPP2 Stream Implementation - Preparing the Executable Proposal",
      date: "2025-06-23",
      category: "Implementation",
      forumThread: "https://discuss.ens.domains/t/spp2-stream-implementation-preparing-the-executable-proposal/20890",
      contributors: ["5pence.eth", "clowes.eth", "netto.eth", "estmcmxci"],
      replies: 7,
      views: 276
    },
    {
      id: "opt-in-streams",
      title: "Opt-in streams in sUSDS: More resources with no additional cost",
      date: "2025-06-20",
      category: "Funding",
      forumThread: "https://discuss.ens.domains/t/opt-in-streams-in-susds-more-resources-with-no-additional-cost/20925",
      contributors: ["netto.eth", "Arnold", "clowes.eth", "5pence.eth", "estmcmxci"],
      replies: 6,
      views: 142
    },
    {
      id: "retroactive-grant",
      title: "SPP2 Retroactive Grant - Custom Voting Interface Contributors",
      date: "2025-06-12",
      category: "Funding",
      forumThread: "https://discuss.ens.domains/t/spp2-retroactive-grant-custom-voting-interface-contributors/20903",
      contributors: ["5pence.eth", "clowes.eth", "Arnold", "zcf"],
      replies: 4,
      views: 160
    },
    {
      id: "transition-plan",
      title: "SPP2 - Transition & Implementation Plan",
      date: "2025-05-17",
      category: "Implementation",
      forumThread: "https://discuss.ens.domains/t/spp2-transition-implementation-plan/20796",
      contributors: ["daostrat.eth", "5pence.eth"],
      replies: 1,
      views: 148
    }
  ],

  votingReports: [
    {
      delegate: "slobo.eth",
      date: "2025-05-11",
      forumThread: "https://discuss.ens.domains/t/voting-report-slobo-eth/20768",
      views: 140
    },
    {
      delegate: "griff.eth",
      date: "2025-05-12",
      forumThread: "https://discuss.ens.domains/t/voting-report-griff-eth/20787",
      views: 103
    },
    {
      delegate: "estmcmxci.eth",
      date: "2025-05-11",
      forumThread: "https://discuss.ens.domains/t/voting-report-estmcmxci-eth/20775",
      views: 92
    },
    {
      delegate: "daostrat.eth",
      date: "2025-05-12",
      forumThread: "https://discuss.ens.domains/t/voting-report-daostrat-eth/20779",
      views: 91
    },
    {
      delegate: "thecap.eth",
      date: "2025-05-11",
      forumThread: "https://discuss.ens.domains/t/voting-report-thecap-eth/20774",
      views: 96
    },
    {
      delegate: "lefteris.eth",
      date: "2025-05-10",
      forumThread: "https://discuss.ens.domains/t/voting-report-lefteris-eth/20770",
      views: 255
    },
    {
      delegate: "5pence.eth",
      date: "2025-05-09",
      forumThread: "https://discuss.ens.domains/t/voting-report-5pence-eth/20764",
      views: 113
    },
    {
      delegate: "nick.eth",
      date: "2025-05-08",
      forumThread: "https://discuss.ens.domains/t/voting-report-nick-eth/20746",
      views: 200
    },
    {
      delegate: "brantly.eth",
      date: "2025-05-08",
      forumThread: "https://discuss.ens.domains/t/voting-report-brantly-eth/20742",
      views: 155
    }
  ],

  categories: {
    Infrastructure: { count: 5, totalFunding: "$1.95M" },
    Development: { count: 2, totalFunding: "$900K" },
    Governance: { count: 2, totalFunding: "$675K" },
    Identity: { count: 1, totalFunding: "$450K" },
    Content: { count: 1, totalFunding: "$300K" },
    Research: { count: 1, totalFunding: "$225K" }
  },

  statistics: {
    totalProviders: 12,
    totalFunding: "$4.5M",
    averageFunding: "$562,500",
    activeSince: "2025-04-26",
    forumThreads: 27,
    totalViews: 5200,
    totalReplies: 145,
    spp2Budget: "$4.5M",
    spp1Budget: "$3.6M",
    budgetIncrease: "25%"
  },

  // Authoritative sources on discuss.ens.domains
  sources: [
    {
      title: "Service Provider Program (category)",
      url: "https://discuss.ens.domains/c/service-provider/75"
    },
    {
      title: "Service Provider Applications (subcategory)",
      url: "https://discuss.ens.domains/c/service-provider-program/service-provider-applications/76"
    },
    {
      title: "Service Provider Strategy Forum",
      url: "https://discuss.ens.domains/t/service-provider-strategy-forum/20349"
    },
    {
      title: "Service Provider Program Scope and Deliverables",
      url: "https://discuss.ens.domains/t/service-provider-program-scope-and-deliverables/20316"
    }
  ]
};

export const getCategoryColor = (category) => {
  const colors = {
    Infrastructure: "bg-blue-600",
    Development: "bg-green-600",
    Governance: "bg-purple-600",
    Identity: "bg-orange-600",
    Content: "bg-pink-600",
    Research: "bg-indigo-600"
  };
  return colors[category] || "bg-gray-600";
};

export const getStatusColor = (status) => {
  const colors = {
    Active: "bg-green-600",
    Pending: "bg-yellow-600",
    Inactive: "bg-red-600"
  };
  return colors[status] || "bg-gray-600";
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
