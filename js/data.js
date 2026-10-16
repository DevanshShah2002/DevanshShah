/* ==========================================================================
   DEVANSH SHAH PORTFOLIO — CONTENT DATA
   --------------------------------------------------------------------------
   RULE: Every fact here comes from the uploaded resume
   (assets/resume/Devansh_Shah_Resume.pdf, Oct 2026) or from links Devansh
   supplied. Never invent employers, titles, dates, metrics, publications,
   certifications, or project claims. Missing info => placeholder/omit.
   ========================================================================== */

const PORTFOLIO = {
  identity: {
    name: "Devansh Shah",
    roles: [
      "AI Engineer",
      "Generative AI Engineer",
      "Agentic AI Engineer",
      "Machine Learning Engineer",
      "Data Scientist"
    ],
    location: "Maryland, United States",
    education: "M.S. in Artificial Intelligence, University of Texas at San Antonio (May 2026)",
    email: "DevanshVipulbhai.Shah@my.utsa.edu",
    linkedin: "https://www.linkedin.com/in/devanshshah2002",
    github: "https://github.com/devanshshah2002",
    resumeFile: "assets/resume/Devansh_Shah_Resume.pdf",
    status: "OPEN TO AI/ML ENGINEERING OPPORTUNITIES"
  },

  about: {
    heading: "THE HUMAN BEHIND THE MODELS",
    photo: "assets/images/portrait-bw.jpg",
    photoAlt: "Devansh Shah, black-and-white portrait",
    identityLines: [
      ["IDENTITY", "DEVANSH SHAH"],
      ["ROLE", "AI / GENAI / AGENTIC AI ENGINEER"],
      ["LOCATION", "MARYLAND, USA"],
      ["EDUCATION", "M.S. ARTIFICIAL INTELLIGENCE, UTSA '26 — GPA 3.93"],
      ["STATUS", "OPEN TO RELEVANT OPPORTUNITIES"]
    ],
    intro: [
      "I'm an AI engineer who specializes in LLMs, RAG systems, semantic search, and machine learning — the kind of engineer who cares as much about evaluation numbers as about the experience around them.",
      "My main project story is an Adaptive RAG pipeline for multi-hop question answering: it decomposes hard questions, retrieves with BGE-M3, reranks with a Cross-Encoder, retries when retrieval falls short, and generates answers with Llama 3.3 70B. On MuSiQue's 19,938 questions it reached 0.450 exact match — and I scaled the whole experiment on a SLURM-managed HPC cluster before shipping a Streamlit UI with Docker and GitHub Actions CI/CD.",
      "Before grad school I built an Elasticsearch search system over 1.2M+ Indian brand products at Downtown Technologies, taking accuracy to 99.5% (a 30% improvement) with crawling, categorization models, and ranking work on AWS. Since then I've interned at Quacito building LLM agents for sentiment and service identification, and at a San Antonio museum building an LLM-powered chatbot and semantic search over real archives.",
      "I also publish: I'm a co-author on 'Ice Cream Express: A Game-Based Tool to Teach AI Pathfinding to K-12 Learners,' accepted to SIGCSE Virtual 2026. Outside the lab, I volunteer with SAJAG rescuing birds — 1000+ and counting."
    ],
    strengths: [
      "Adaptive RAG pipelines (retrieval, reranking, retry-based refinement)",
      "Multi-agent systems (debate pipelines, role prompting, judge models)",
      "LLM fine-tuning with PEFT/TRL on HPC (SLURM)",
      "Semantic search at scale (Elasticsearch 1.2M+ products, dense retrieval)",
      "Production deployment (FastAPI, Streamlit, Docker, CI/CD)"
    ]
  },

  skills: {
    heading: "MY TECHNICAL TOOLKIT",
    note: "Grouped by how the resume lists them. Hover or tap a skill for context. No made-up proficiency scores — evidence comes from real projects and roles.",
    categories: [
      {
        name: "Programming Languages",
        icon: "⌨",
        skills: [
          { name: "Python", context: "Primary language — RAG pipelines, LLM fine-tuning, FastAPI backends, HPC experiment harnesses." },
          { name: "SQL", context: "Self-named focus area. Used with PostgreSQL/pgvector and SQL databases in the museum chatbot internship." },
          { name: "R", context: "Data analysis and statistics, listed on resume." },
          { name: "C++", context: "Listed on resume; DSA foundation." }
        ]
      },
      {
        name: "AI & LLMs",
        icon: "🧠",
        skills: [
          { name: "RAG & Adaptive RAG", context: "End-to-end adaptive multi-hop RAG on MuSiQue: decomposition, BGE-M3 retrieval, Cross-Encoder rerank, retry loop, Llama 3.3 70B generation." },
          { name: "AI Agents", context: "Sentiment & service-identification agents at Quacito; multi-agent debate pipeline on StrategyQA." },
          { name: "LangChain", context: "Agent and pipeline work, per resume skill set." },
          { name: "LlamaIndex", context: "Listed for RAG pipelines on resume." },
          { name: "LLM Fine-tuning (PEFT/TRL)", context: "Two-stage instruction tuning of Phi-3.5-Mini-Instruct on SLURM HPC: Alpaca-Cleaned + custom teacher-generated data." },
          { name: "Hallucination Mitigation", context: "Retry-based retrieval refinement and reranking in Adaptive RAG; debate + judge model in multi-agent reasoning." },
          { name: "Dense Vector Retrieval", context: "BGE-M3 embeddings in Adaptive RAG; vector databases across internships." },
          { name: "Cross-Encoder Re-ranking", context: "Reranking stage in the Adaptive RAG pipeline." },
          { name: "Hugging Face", context: "Models and tooling for fine-tuning and inference." },
          { name: "Llama / Qwen / GPT / Gemini", context: "Llama 3.3 70B (RAG generation), Llama 3.1 & Qwen (debate agents), OpenAI models at Quacito." },
          { name: "Transformers", context: "Core architecture family behind the fine-tuning and RAG work." }
        ]
      },
      {
        name: "ML & Data Science",
        icon: "📊",
        skills: [
          { name: "Machine Learning", context: "Classification, regression, predictive modeling, model evaluation — including Random Forest / Logistic Regression categorization models at Downtown Technologies." },
          { name: "Deep Learning", context: "PyTorch / TensorFlow; LLM fine-tuning pipelines." },
          { name: "Recommender Systems", context: "Price recommendations at Downtown Technologies (+5% improvement)." },
          { name: "Time-Series Forecasting", context: "Listed in ML & Data Science skill set." },
          { name: "Feature Engineering", context: "EDA, preprocessing, and data cleaning across projects." },
          { name: "PyTorch", context: "Deep learning work and LLM pipelines." },
          { name: "TensorFlow", context: "Listed alongside PyTorch on resume." },
          { name: "Scikit-learn", context: "Classical ML models incl. Random Forest / Logistic Regression." },
          { name: "Pandas / NumPy", context: "Data processing backbone for every project." },
          { name: "Web Scraping & Crawling", context: "Large-scale crawling of 1.2M+ products with Celery scheduling at Downtown Technologies." },
          { name: "Power BI", context: "Listed data visualization tool." },
          { name: "Statistics", context: "Pre-MBA Statistics certificate, IIM Ahmedabad." }
        ]
      },
      {
        name: "Databases & Search",
        icon: "🗄",
        skills: [
          { name: "Vector Databases", context: "MongoDB vector store at Quacito; pgvector in museum chatbot; dense retrieval in Adaptive RAG." },
          { name: "PostgreSQL (pgvector)", context: "SQL + vector search for museum archive chatbot." },
          { name: "MongoDB", context: "Vector database backing RAG pipelines at Quacito." },
          { name: "Supabase", context: "Listed database platform." },
          { name: "Elasticsearch", context: "Search over 1.2M+ products at Downtown Technologies: 99.5% accuracy (+30%)." }
        ]
      },
      {
        name: "Backend & MLOps",
        icon: "⚙",
        skills: [
          { name: "FastAPI", context: "Phase 1 backend for the video teaser generator; REST APIs for ingestion and processing." },
          { name: "Flask", context: "Listed backend framework." },
          { name: "Django", context: "Listed backend framework." },
          { name: "Streamlit", context: "Interactive UI for the Adaptive RAG system." },
          { name: "Docker", context: "Containerized deployment of the Adaptive RAG app." },
          { name: "Kubernetes", context: "Listed container orchestration skill." },
          { name: "CI/CD Pipelines", context: "GitHub Actions automated production deployment for Adaptive RAG." },
          { name: "Git", context: "Version control across all projects." },
          { name: "Render", context: "Listed deployment platform." },
          { name: "Kaggle", context: "Listed data science platform." }
        ]
      },
      {
        name: "HPC & Infrastructure",
        icon: "🖥",
        skills: [
          { name: "SLURM Batch Scripting", context: "Managed large-batch experiments on the UTSA HPC cluster." },
          { name: "HPC Cluster Deployment", context: "Scaled Adaptive RAG experiments with 16-worker ThreadPoolExecutor parallelism." },
          { name: "Parallelism (ThreadPoolExecutor)", context: "16-worker parallel experiment execution." },
          { name: "AWS (EC2, S3)", context: "Trained categorization models on EC2; stored datasets in S3 at Downtown Technologies." }
        ]
      }
    ]
  },

  experience: {
    heading: "ENGINEERING IN THE REAL WORLD",
    entries: [
      {
        org: "University of Texas at San Antonio",
        title: "Researcher",
        location: "San Antonio, TX",
        dates: "Sep 2026 – Present",
        summary: "End-to-end NLP, LLM, and Generative AI research: identifying open problems in the literature, engineering Python-based models, building RAG and semantic retrieval pipelines, running data experiments, and co-authoring academic publications.",
        details: [
          "Drives end-to-end NLP, LLM, and Generative AI research",
          "Identifies open problems in published literature and scopes experiments",
          "Engineers Python-based models and RAG / semantic retrieval pipelines",
          "Runs data experiments and co-authors academic publications"
        ],
        stack: ["Python", "LLMs", "RAG", "Semantic Retrieval", "Academic Publishing"]
      },
      {
        org: "San Antonio African American Community Archive and Museum",
        title: "Intern",
        location: "San Antonio, TX",
        dates: "Jan 2026 – Apr 2026",
        summary: "Built an LLM-powered chatbot and semantic search tools over museum archives — natural-language access to historical content, backed by NLP, RAG, embeddings, SQL databases, and vector databases.",
        details: [
          "Developed an LLM-powered chatbot for natural-language access to museum archives and historical content",
          "Built semantic search tools leveraging NLP, RAG, embeddings, SQL databases, and vector databases",
          "Collaborated with non-technical staff on generative AI, workflow automation, and AI training to improve efficiency and accessibility"
        ],
        stack: ["LLMs", "RAG", "Embeddings", "SQL Databases", "Vector Databases", "NLP"]
      },
      {
        org: "Quacito LLC",
        title: "Trainee Data Science Engineer (Intern)",
        location: "San Antonio, TX",
        dates: "Jun 2025 – Aug 2025",
        summary: "Built LLM-based sentiment and service-identification agents with RAG pipelines, MongoDB vector storage, semantic retrieval, and OpenAI models — in a fast-paced startup environment.",
        details: [
          "Developed LLM-based sentiment and service-identification agents for reviews, feedback, and work-order data",
          "Integrated RAG pipelines, vector databases (MongoDB), semantic retrieval, and OpenAI models",
          "Designed and optimized prompts, contributing to end-to-end AI solution development in a fast-paced startup environment"
        ],
        stack: ["LLMs", "AI Agents", "RAG", "MongoDB (Vector)", "Semantic Retrieval", "OpenAI", "Prompt Engineering"]
      },
      {
        org: "University of Texas at San Antonio",
        title: "Teaching / Lab Assistant",
        location: "San Antonio, TX",
        dates: "Sep 2024 – May 2026",
        summary: "Teaching and lab support across the M.S. program — helping students get hands-on with the same AI and computing material behind this portfolio.",
        details: [
          "Supported teaching and lab sessions (Sep 2024 – May 2026, per resume)"
        ],
        stack: ["Teaching", "Mentoring"]
      },
      {
        org: "Downtown Technologies Pvt. Ltd.",
        title: "Data Science Intern",
        location: "Ahmedabad, India",
        dates: "Jan 2023 – May 2023",
        summary: "Built an Elasticsearch search system over 1.2M+ Indian brand products reaching 99.5% accuracy (a 30% improvement) — crawling, preprocessing, categorization, ranking, and UI, plus Celery-scheduled large-scale crawling and ML models trained on AWS.",
        details: [
          "Built an Elasticsearch-based search system for 1.2M+ Indian brand products, securing 99.5% accuracy (30% improvement)",
          "Handled crawling, preprocessing, categorization, ranking, and UI design using JavaScript (GitHub: shyamsar30/flask-app-elasticsearch)",
          "Automated email verification, price recommendations, and image processing",
          "Used Celery for job scheduling and large-scale crawling (1.2M+ products), reducing manual workload",
          "Trained categorization models using Random Forest and Logistic Regression on AWS EC2, stored datasets in S3",
          "Improved categorization accuracy by 2%, recommendations by 5%, and user interaction by 10%"
        ],
        stack: ["Elasticsearch", "Python", "JavaScript", "Celery", "AWS EC2", "AWS S3", "Random Forest", "Logistic Regression"]
      }
    ]
  },

  projects: {
    heading: "THINGS I'VE BUILT",
    items: [
      {
        id: "adaptive-rag",
        name: "Adaptive Multi-Hop RAG",
        tagline: "An end-to-end adaptive retrieval-augmented generation pipeline for multi-hop QA.",
        problem: "Multi-hop questions can't be answered with a single retrieval pass — evidence must be gathered across documents, decomposed, and re-queried when the first attempt falls short.",
        stack: ["Python", "Llama 3.3 70B", "BGE-M3", "Cross-Encoder", "SLURM", "HPC", "Streamlit", "Docker", "GitHub Actions"],
        contribution: "Designed and built the full NLP/LLM workflow: question decomposition, semantic retrieval, retry-based refinement, and answer extraction. Scaled large-batch experiments on the UTSA HPC cluster and deployed an interactive Streamlit UI with Docker and CI/CD.",
        results: [
          "Evaluated on MuSiQue: 19,938 multi-hop questions",
          "Exact Match 0.450 (project notes report +81% vs. the published oracle baseline)",
          "Scaled experiments with SLURM + 16-worker ThreadPoolExecutor parallelism",
          "Shipped interactive Streamlit UI, Dockerized, with GitHub Actions automated deployment"
        ],
        github: "https://github.com/DevanshShah2002/Adaptive_RAG",
        demo: null,
        caseStudy: {
          architecture: [
            ["Question Decomposition", "Break the multi-hop question into answerable sub-questions."],
            ["Semantic Retrieval", "BGE-M3 dense retrieval over the corpus for each sub-question."],
            ["Cross-Encoder Reranking", "Rerank candidates with a Cross-Encoder for precision."],
            ["Retry-Based Refinement", "If evidence is insufficient, reformulate and re-retrieve — the adaptive loop."],
            ["Answer Extraction", "Llama 3.3 70B synthesizes the final answer from gathered evidence."]
          ],
          decisions: [
            "Adaptive retry loop instead of fixed retrieval depth — stops early on easy questions, digs deeper on hard ones.",
            "Cross-Encoder reranking after dense retrieval to balance recall (BGE-M3) with precision.",
            "SLURM + 16-worker ThreadPoolExecutor parallelism to make 19,938-question evaluation tractable on HPC."
          ],
          limitations: [
            "Evaluation is on MuSiQue only — generalization to other multi-hop benchmarks is unverified.",
            "Llama 3.3 70B inference is compute-heavy; a smaller-generator variant is untested."
          ]
        }
      },
      {
        id: "video-teaser",
        name: "AI-Powered Video Teaser Generator",
        tagline: "An AI video-understanding pipeline that generates teaser clips from long-form YouTube videos. (Ongoing)",
        problem: "Long-form videos bury their best moments. Manually finding teaser-worthy clips is slow and subjective.",
        stack: ["Python", "FastAPI", "REST APIs", "Whisper", "OCR", "LLMs"],
        contribution: "Building the full pipeline; Phase 1 backend is implemented: video ingestion, subtitle extraction with Whisper fallback, OCR text detection, metadata processing, and multimodal context preparation.",
        results: [
          "Phase 1 backend complete: ingestion, Whisper subtitle extraction (with fallback), OCR text detection, metadata processing",
          "Multimodal context preparation feeding LLM-based contextual analysis for teaser selection"
        ],
        github: null,
        demo: null,
        caseStudy: {
          architecture: [
            ["Video Ingestion", "FastAPI + REST APIs pull and stage long-form YouTube videos."],
            ["Subtitle Extraction", "Whisper transcription with a fallback path when subtitles are missing."],
            ["OCR Text Detection", "On-screen text detected and aligned with the transcript timeline."],
            ["Metadata Processing", "Titles, chapters, and descriptions parsed into structured context."],
            ["Multimodal Context Prep", "Transcript + OCR + metadata fused for LLM-based teaser analysis."]
          ],
          decisions: [
            "Whisper fallback instead of depending on creator subtitles — works on any video.",
            "FastAPI backend first: get the data pipeline right before the teaser-selection model."
          ],
          limitations: [
            "Ongoing project — teaser selection quality is not yet evaluated.",
            "Long-video processing cost and latency are open engineering questions."
          ]
        }
      },
      {
        id: "phi-finetune",
        name: "LLM Fine-Tuning Pipeline: Phi-3.5-Mini-Instruct",
        tagline: "Two-stage instruction tuning with PEFT/TRL on a SLURM-managed HPC cluster.",
        problem: "Training even a small LLM end-to-end — data, tuning method, cluster scheduling, evaluation, deployment — requires the whole MLOps loop to work, not just a training script.",
        stack: ["Python", "PEFT", "TRL", "SLURM", "HPC", "Hugging Face"],
        contribution: "Built the two-stage instruction tuning pipeline (Alpaca-Cleaned + custom teacher-generated data), ran it with PEFT/TRL on the SLURM cluster, and carried it through evaluation to local deployment.",
        results: [
          "Two-stage instruction tuning: Alpaca-Cleaned + custom teacher-generated data",
          "End-to-end LLM training, evaluation, and local deployment demonstrated"
        ],
        github: null,
        demo: null,
        caseStudy: {
          architecture: [
            ["Data Preparation", "Alpaca-Cleaned base plus custom teacher-generated instruction data."],
            ["Stage 1 Tuning", "Instruction tuning pass with PEFT (LoRA-style efficient tuning)."],
            ["Stage 2 Tuning", "Second stage on teacher-generated data for task alignment."],
            ["Evaluation", "Instruction-following quality assessed."],
            ["Local Deployment", "Tuned model packaged for local inference."]
          ],
          decisions: [
            "PEFT/TRL over full fine-tuning — tractable on available HPC resources.",
            "Teacher-generated data to supplement Alpaca-Cleaned with task-specific instructions."
          ],
          limitations: [
            "Small-model study (Phi-3.5-Mini) — results don't directly transfer to 70B-class models.",
            "Evaluation methodology is qualitative; no standardized benchmark scores reported."
          ]
        }
      },
      {
        id: "llm-debate",
        name: "LLM Debate & Multi-Agent Reasoning",
        tagline: "A multi-agent debate pipeline where models argue and a judge decides.",
        problem: "Single-model answers on reasoning benchmarks are brittle. Can structured multi-agent debate with a judge model do better?",
        stack: ["Python", "Llama 3.1", "Qwen"],
        contribution: "Built the debate pipeline: specialized role prompting for debater agents, adaptive stopping to bound cost, and a judge model to pick the final answer on StrategyQA.",
        results: [
          "74.5% accuracy on StrategyQA",
          "Adaptive stopping keeps debate cost bounded; judge model resolves disagreements"
        ],
        github: null,
        demo: null,
        caseStudy: {
          architecture: [
            ["Role Prompting", "Debater agents take specialized stances on the StrategyQA question."],
            ["Debate Rounds", "Agents exchange arguments across rounds (Llama 3.1, Qwen)."],
            ["Adaptive Stopping", "Debate halts early when agents converge or gains plateau."],
            ["Judge Model", "A separate judge model reviews the debate and selects the final answer."]
          ],
          decisions: [
            "Adaptive stopping as the cost control — unbounded debate rounds are expensive.",
            "Separate judge model rather than majority vote, to weigh argument quality."
          ],
          limitations: [
            "Evaluated on StrategyQA only.",
            "Debate multiplies inference cost vs. a single model — the accuracy/cost trade-off is use-case dependent."
          ]
        }
      },
      {
        id: "elasticsearch-search",
        name: "Elasticsearch Product Search",
        tagline: "Flask + Elasticsearch search over a catalog of 1.2M+ Indian brand products.",
        problem: "A catalog of 1.2M+ Indian brand products needs fast, accurate search — crawling, normalization, categorization, and ranking across noisy product data.",
        stack: ["Python", "Flask", "Elasticsearch", "Kibana", "JavaScript", "Celery", "AWS EC2", "AWS S3", "Random Forest", "Logistic Regression"],
        contribution: "Built the search system end to end at Downtown Technologies: crawling and preprocessing, Elasticsearch indexing and ranking, categorization models, and the search UI. Automated email verification, price recommendations, and image processing; Celery-scheduled large-scale crawling.",
        results: [
          "99.5% search accuracy — a 30% improvement",
          "1.2M+ products crawled, preprocessed, and indexed",
          "Categorization accuracy +2%, recommendations +5%, user interaction +10%",
          "Categorization models (Random Forest, Logistic Regression) trained on AWS EC2; datasets stored in S3"
        ],
        github: "https://github.com/shyamsar30/flask-app-elasticsearch",
        demo: null,
        caseStudy: {
          architecture: [
            ["Crawling", "Celery-scheduled large-scale crawling of 1.2M+ product pages."],
            ["Preprocessing", "Cleaning, normalization, and categorization of noisy catalog data."],
            ["Indexing", "Elasticsearch indices tuned for product search and ranking."],
            ["Ranking & UI", "Relevance ranking with a JavaScript search UI on a Flask backend."],
            ["Automation", "Email verification, price recommendations, and image processing pipelines."]
          ],
          decisions: [
            "Elasticsearch as the search core — full-text relevance at 1.2M-document scale.",
            "Celery for crawl scheduling — decoupled, retryable large-scale ingestion.",
            "Classical ML (Random Forest / Logistic Regression) for categorization — interpretable and cheap to train on EC2."
          ],
          limitations: [
            "Keyword/relevance search, not semantic — dense retrieval would be the modern upgrade.",
            "Metrics (99.5% accuracy) are from the internship project report."
          ]
        }
      },
      {
        id: "linkedin-scraper",
        name: "LinkedIn Scraper",
        tagline: "Selenium-driven script to search LinkedIn and scrape profile details.",
        problem: "Manually gathering LinkedIn profile details is slow and repetitive — a scripted browser can search and extract them systematically.",
        stack: ["Python", "Selenium", "ChromeDriver"],
        contribution: "Wrote the scraping script (Profile_scraping.py): automated LinkedIn search and profile-detail extraction using Selenium with ChromeDriver.",
        results: [
          "Working search-and-scrape flow for LinkedIn profile details",
          "Pinned ChromeDriver 124.0.6367.78 for reproducible browser automation"
        ],
        github: "https://github.com/devanshshah2002/linkedin_scraper",
        demo: null,
        caseStudy: {
          architecture: [
            ["Browser Automation", "Selenium drives Chrome via ChromeDriver."],
            ["Search", "Scripted LinkedIn search queries."],
            ["Extraction", "Profile_scraping.py extracts profile details from result pages."],
            ["Dependencies", "requirements.txt pins the automation stack."]
          ],
          decisions: [
            "Selenium over raw HTTP — LinkedIn pages are JavaScript-heavy and bot-guarded.",
            "Pinned ChromeDriver version to avoid driver/browser mismatch."
          ],
          limitations: [
            "LinkedIn actively resists scraping — subject to its Terms of Service, login walls, and rate limits.",
            "No verified accuracy or coverage metrics published in the repo."
          ]
        }
      }
    ]
  },

  genai: {
    heading: "BUILDING INTELLIGENT SYSTEMS",
    intro: "This is the lab view of the GenAI and agentic work behind the project cards — the loops, tools, and trade-offs, drawn from real systems Devansh built.",
    systems: [
      {
        name: "Adaptive Retrieval Loop",
        basedOn: "Adaptive Multi-Hop RAG",
        description: "An agentic retrieval loop: the system decides whether it has enough evidence, and if not, it reformulates and retries — stopping early on easy questions, digging deeper on hard ones.",
        loop: ["Decompose question", "Retrieve (BGE-M3)", "Rerank (Cross-Encoder)", "Evidence sufficient?", "Retry with reformulation", "Generate (Llama 3.3 70B)"]
      },
      {
        name: "Multi-Agent Debate",
        basedOn: "LLM Debate & Multi-Agent Reasoning",
        description: "Specialized debater agents argue from different stances; adaptive stopping bounds the cost; a judge model weighs the arguments and decides. 74.5% on StrategyQA.",
        loop: ["Assign roles", "Debate rounds", "Converged?", "Adaptive stop", "Judge decides"]
      },
      {
        name: "Production Agent Stack",
        basedOn: "Quacito LLC + Museum internships",
        description: "Agents wired into real workflows: sentiment and service-identification agents over reviews and work orders (MongoDB vector store, OpenAI models), and an archive chatbot over SQL + vector databases with prompt design tuned for non-technical staff.",
        loop: ["User query", "Semantic retrieval", "Tool / DB lookup", "LLM synthesis", "Human-in-the-loop"]
      },
      {
        name: "Fine-Tuning Loop",
        basedOn: "Phi-3.5-Mini-Instruct pipeline",
        description: "Two-stage instruction tuning (Alpaca-Cleaned, then custom teacher-generated data) with PEFT/TRL on SLURM HPC — training, evaluation, and local deployment as one pipeline.",
        loop: ["Curate data", "Stage 1 tuning", "Stage 2 tuning", "Evaluate", "Deploy locally"]
      }
    ],
    tradeoffs: [
      ["Accuracy vs. latency", "Cross-Encoder reranking and debate rounds buy accuracy at inference cost — bounded with adaptive stopping."],
      ["Recall vs. precision", "BGE-M3 dense retrieval casts a wide net; the reranker narrows it before generation."],
      ["Autonomy vs. control", "Retry loops and agents act on their own, but stopping conditions and judge models keep them honest."],
      ["Scale vs. cost", "SLURM + 16-worker parallelism made 19,938-question evaluation tractable on shared HPC."]
    ]
  },

  research: {
    heading: "EXPLORING WHAT'S NEXT",
    publications: [
      {
        title: "Ice Cream Express: A Game-Based Tool to Teach AI Pathfinding to K-12 Learners",
        authors: "Tian, N., Shah, D., Sanusi, I., & Martin, F.",
        venue: "Accepted to SIGCSE Virtual 2026 — The ACM Virtual Global Computing Education Conference",
        year: "2026",
        status: "Accepted",
        question: "How can K-12 learners grasp AI pathfinding concepts through play rather than lectures?",
        methodology: "Design and development of a game-based learning tool ('Ice Cream Express') that teaches AI pathfinding interactively.",
        findings: "Accepted to SIGCSE Virtual 2026 — a peer-reviewed ACM computing education venue.",
        link: null
      }
    ],
    ongoing: [
      {
        title: "Adaptive Multi-Hop RAG for Question Answering",
        status: "Ongoing research project (unpublished)",
        description: "Adaptive retrieval-augmented generation with question decomposition, BGE-M3 retrieval, Cross-Encoder reranking, and retry-based refinement — evaluated on MuSiQue (19,938 questions, EM 0.450).",
        link: "https://github.com/DevanshShah2002/Adaptive_RAG"
      }
    ]
  },

  education: {
    heading: "THE FOUNDATION",
    entries: [
      {
        degree: "Master of Science in Artificial Intelligence (with Computer Science track)",
        school: "The University of Texas at San Antonio",
        dates: "Aug 2024 – May 2026",
        details: ["GPA: 3.93", "Researcher (Sep 2026 – Present)", "Teaching / Lab Assistant (Sep 2024 – May 2026)"]
      },
      {
        degree: "Bachelor of Engineering, Computer",
        school: "G.E.C., Gandhinagar (GTU)",
        dates: "Jun 2019 – Jun 2023",
        details: []
      }
    ],
    certifications: [
      "Google Data Analytics Professional Certificate",
      "Pre-MBA Statistics — Indian Institute of Management Ahmedabad"
    ]
  },

  achievements: {
    heading: "SIGNAL OVER NOISE",
    items: [
      { metric: "3.93", label: "M.S. Artificial Intelligence GPA, UTSA", context: "Graduate GPA across the AI + CS track." },
      { metric: "0.450 EM", label: "Adaptive RAG on MuSiQue (19,938 questions)", context: "Exact match on the full multi-hop benchmark; project notes report +81% vs. the published oracle baseline." },
      { metric: "99.5%", label: "Search accuracy over 1.2M+ products", context: "Elasticsearch system at Downtown Technologies — a 30% improvement." },
      { metric: "74.5%", label: "Multi-agent debate accuracy on StrategyQA", context: "Llama 3.1 + Qwen debaters with adaptive stopping and a judge model." },
      { metric: "SIGCSE '26", label: "ACM publication accepted", context: "'Ice Cream Express' — game-based AI pathfinding education, SIGCSE Virtual 2026." },
      { metric: "1000+", label: "Birds rescued as SAJAG volunteer", context: "Volunteer bird rescuer, Jan 2021 – Jun 2024." }
    ],
    leadership: [
      "International Student Advisory Council Member, UTSA",
      "Volunteer Bird Rescuer, SAJAG (1000+ birds rescued, Jan 2021 – Jun 2024)"
    ]
  },

  contact: {
    heading: "LET'S BUILD SOMETHING INTELLIGENT",
    robotLine: "That's the tour! Have a project in mind, a research idea, or an opportunity worth exploring?",
    goodbye: "Until next time. Keep building!",
    channels: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/devanshshah2002", icon: "in" },
      { label: "GitHub", url: "https://github.com/devanshshah2002", icon: "gh" },
      { label: "Email", url: "mailto:DevanshVipulbhai.Shah@my.utsa.edu", icon: "@" },
      { label: "Download Resume", url: "assets/resume/Devansh_Shah_Resume.pdf", icon: "⬇", download: true }
    ]
  },

  /* Robot dialogue scripts */
  scripts: {
    intro: [
      "Hey! I'm Devansh's AI agent.",
      "Welcome to his digital workspace.",
      "I can show you his projects, technical skills, research, and experience. What would you like to explore?"
    ],
    sectionIntros: {
      about: "Good choice. Before the models and metrics — the human. Here's Devansh in his own words.",
      skills: "Let's inspect Devansh's technical toolkit. From Python and machine learning to RAG pipelines and agentic systems — here's what he actually works with.",
      experience: "Time to look at how Devansh has applied AI and software engineering in real projects — from startups to museums to research labs.",
      projects: "Good choice! Devansh enjoys turning AI research into working systems. Here are the builds that matter most.",
      genai: "Now we're in the lab. These are the agentic loops and GenAI systems behind the projects — how they retrieve, reason, and decide.",
      research: "Curious about the research side? Peer-reviewed work and ongoing investigations — properly labeled, no padding.",
      education: "The foundation. Verified degrees, real dates, and the certifications on top.",
      achievements: "Signal, not noise. Only numbers that come with receipts.",
      contact: "That's the tour! Have a project in mind, a research idea, or an opportunity worth exploring?"
    },
    sectionSummaries: {
      about: "AI engineer (M.S. AI, UTSA '26, 3.93 GPA) in Maryland — LLMs, Adaptive RAG, semantic search. Published at SIGCSE 2026. Open to AI/ML engineering opportunities.",
      skills: "Python · SQL · R · C++ — RAG & Adaptive RAG, AI agents, LLM fine-tuning (PEFT/TRL), dense retrieval + reranking, Elasticsearch, FastAPI, Docker, SLURM/HPC, AWS.",
      experience: "Researcher @ UTSA (now) · Museum AI intern (LLM chatbot + semantic search) · Quacito (LLM agents, RAG) · Teaching/Lab Assistant (2024–26) · Downtown Technologies (1.2M-product search, 99.5% accuracy).",
      projects: "Adaptive Multi-Hop RAG (MuSiQue, EM 0.450) · AI Video Teaser Generator (ongoing) · Phi-3.5 fine-tuning pipeline (PEFT/TRL, SLURM) · Multi-agent LLM debate (StrategyQA 74.5%) · Elasticsearch product search (1.2M+ products, 99.5% accuracy) · LinkedIn profile scraper.",
      genai: "Adaptive retrieval loops · multi-agent debate with a judge · production agent stacks (MongoDB vector store, OpenAI) · two-stage instruction tuning — with the trade-offs spelled out.",
      research: "SIGCSE Virtual 2026 (accepted): 'Ice Cream Express' — game-based AI pathfinding for K-12. Plus ongoing Adaptive RAG research (unpublished, labeled honestly).",
      education: "M.S. Artificial Intelligence, UTSA (2024–26, GPA 3.93) · B.E. Computer, GEC Gandhinagar (2019–23) · Google Data Analytics cert · IIM-A Pre-MBA Statistics.",
      achievements: "3.93 GPA · EM 0.450 on MuSiQue · 99.5% search accuracy · 74.5% debate accuracy · SIGCSE '26 publication · 1000+ birds rescued.",
      contact: "LinkedIn, GitHub, email, and the resume — everything a recruiter needs, one click away."
    },
    askExplore: "Want to explore the full details?",
    letsGo: "Alright, let's go!"
  }
};

/* Terminal command help */
const TERMINAL_COMMANDS = [
  { cmd: "help", desc: "Show available commands" },
  { cmd: "menu", desc: "Back to the main menu" },
  { cmd: "about", desc: "About Devansh" },
  { cmd: "skills", desc: "Technical skills" },
  { cmd: "experience", desc: "Work experience" },
  { cmd: "projects", desc: "Projects" },
  { cmd: "genai", desc: "Generative AI & Agentic AI" },
  { cmd: "research", desc: "Research & publications" },
  { cmd: "education", desc: "Education" },
  { cmd: "achievements", desc: "Achievements" },
  { cmd: "contact", desc: "Contact & links" },
  { cmd: "ascii", desc: "Render Devansh in ASCII" },
  { cmd: "resume", desc: "Download the resume" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "home", desc: "Back to the start" }
];
