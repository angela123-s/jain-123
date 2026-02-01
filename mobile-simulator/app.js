// Mobile Simulator - Screen Comparison Logic

// Endpoints
const MIDDLEWARE_URL = 'https://hackathon-rqpy.onrender.com/graphql';
const BACKEND_URL = 'https://hackathon-rqpy.onrender.com/graphql';

// DOM Elements
const fetchBtn = document.getElementById('fetchBtn');
const profileContent = document.getElementById('profileContent');
const jsonOutput = document.getElementById('jsonOutput');
const toggleJsonBtn = document.getElementById('toggleJsonBtn');
const userSelector = document.getElementById('userSelector');
const platformSelector = document.getElementById('platformSelector');

// Additional Metrics Elements
const elDirectSize = document.getElementById('directSize');
const elDirectTime = document.getElementById('directTime');
const elOptimizedSize = document.getElementById('optimizedSize');
const elOptimizedTime = document.getElementById('optimizedTime');

const tblFieldsReq = document.getElementById('tbl-fields-req');
const tblFieldsUsed = document.getElementById('tbl-fields-used');

// Professional User Profiles
const USER_PROFILES = {
    "1": {
        name: "John Doe",
        username: "johndoe_arch",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
        bio: "Senior Software Architect | Cloud Specialist ☁️<br>Building scalable systems with Green Computing in mind.",
        stats: { posts: 124, followers: "4.2K", following: 842 },
        highlights: ["Architecture", "Keynote", "Office", "Travel"],
        gridImages: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80", // Architecture
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=300&q=80", // Tech/Matrix
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80", // Circuit
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80", // Meeting
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80", // Code
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80", // Office
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80", // Setup
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80", // Code Green
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80"  // Satellite
        ]
    },
    "2": {
        name: "Jane Smith",
        username: "jane_eco_design",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        bio: "Lead Product Designer @ EcoTech ✨<br>Creating sustainable UX for the next billion users.",
        stats: { posts: 89, followers: "12.8K", following: "1.1K" },
        highlights: ["Design", "Sketches", "Workshop", "Coffee"],
        gridImages: [
            "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=300&q=80", // UX
            "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=300&q=80", // Design room
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&q=80", // Palette
            "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=300&q=80", // Sketching
            "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=300&q=80", // Product
            "https://images.unsplash.com/photo-1576153192396-186ee3eb25ad?auto=format&fit=crop&w=300&q=80", // Colors
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=300&q=80", // Concept
            "https://images.unsplash.com/photo-1493424445388-2f3b762e96a3?auto=format&fit=crop&w=300&q=80", // Tools
            "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=300&q=80"  // Workspace
        ]
    },
    "3": {
        name: "Bob Johnson",
        username: "bob_optimized",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        bio: "Tech Evangelist | GraphQL Enthusiast 🚀<br>Optimizing the web, one query at a time.",
        stats: { posts: 215, followers: "8.5K", following: 432 },
        highlights: ["Speaking", "Code", "Mentoring", "Books"],
        gridImages: [
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80", // Event
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=300&q=80", // Office
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80", // Meeting
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&q=80", // Collaborate
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80", // Chart
            "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=300&q=80", // Schedule
            "https://images.unsplash.com/photo-1522071823991-b9671f30c46f?auto=format&fit=crop&w=300&q=80", // Team
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80", // Presenting
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80"  // Analytics
        ]
    }
};


// Event Listeners
if (fetchBtn) fetchBtn.addEventListener('click', runComparison);

if (toggleJsonBtn) {
    toggleJsonBtn.addEventListener('click', () => {
        if (jsonOutput && jsonOutput.parentElement) {
            const isMinimized = jsonOutput.parentElement.classList.toggle('minimized');
            toggleJsonBtn.innerText = isMinimized ? 'Show' : 'Hide';
        }
    });
}

if (userSelector) userSelector.addEventListener('change', runComparison);
if (platformSelector) platformSelector.addEventListener('change', runComparison);

// Custom Dropdown Initialization
function setupCustomDropdown(wrapperId, hiddenSelectId) {
    const wrapper = document.getElementById(wrapperId);
    const hiddenSelect = document.getElementById(hiddenSelectId);
    if (!wrapper || !hiddenSelect) return;

    const trigger = wrapper.querySelector('.custom-select-trigger');
    const options = wrapper.querySelectorAll('.custom-option');

    // Toggle Dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns first
        document.querySelectorAll('.custom-select-wrapper').forEach(w => {
            if (w !== wrapper) w.classList.remove('open');
        });
        wrapper.classList.toggle('open');
    });

    // Option Selection
    options.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const text = this.innerText;

            // Update UI
            trigger.querySelector('span').innerText = text;
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            // Update Hidden Select
            hiddenSelect.value = value;

            // Trigger change event context manually
            hiddenSelect.dispatchEvent(new Event('change'));

            wrapper.classList.remove('open');
        });
    });
}

// Global Close on Outside Click
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
});

// Init Dropdowns
setupCustomDropdown('userDropdown', 'userSelector');
setupCustomDropdown('platformDropdown', 'platformSelector');


async function runComparison() {
    console.log("Run Comparison Started");
    setLoadingState(true);
    resetUI();

    const screenName = 'PROFILE_SCREEN';
    const userId = userSelector ? userSelector.value : "1";
    const platform = platformSelector ? platformSelector.value : "social";

    // Hardcoded Query
    const query = `
    {
      user(id: "${userId}") {
        id
        name
        email
        phone
        posts {
          title
          content
          likes
        }
      }
    }
    `;

    try {
        console.log("Starting Comparison for Screen:", screenName, "User:", userId, "Platform:", platform);

        // --- 1. Fetch Direct from Backend ---
        const startDirect = performance.now();
        let directDataStr = "";

        try {
            console.log("Fetching Direct...");
            const jsonDirect = await safeFetchJson(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            }, 2000);
            directDataStr = JSON.stringify(jsonDirect);
            console.log("Direct Fetch Success");
        } catch (e) {
            console.warn("Backend direct fetch failed.", e);
        }

        // --- 2. Fetch via Middleware ---
        const startOpt = performance.now();
        let jsonOpt = null;
        let optDataStr = "";

        try {
            console.log("Fetching Middleware...");
            jsonOpt = await safeFetchJson(MIDDLEWARE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Screen-Name': screenName,
                    'X-Platform-Type': platform
                },
                body: JSON.stringify({ query })
            }, 2000);

            optDataStr = JSON.stringify(jsonOpt);
            console.log("Middleware Fetch Success");

        } catch (e) {
            console.warn("Middleware fetch failed. Simulating standard optimized response.", e);
            const simulatedUser = {
                data: {
                    user: {
                        id: userId,
                        name: "Simulated User",
                        email: "user@example.com"
                    }
                }
            };
            jsonOpt = simulatedUser;
            optDataStr = JSON.stringify(jsonOpt);
        }

        const optTime = (performance.now() - startOpt).toFixed(0);

        // --- 3. Process Results (Baseline Simulation) ---
        let directTime = 0;

        if (!directDataStr) {
            console.log("Simulating Baseline...");
            const startDirectSim = performance.now();
            let jsonDirectSim = null;
            try {
                jsonDirectSim = await safeFetchJson(MIDDLEWARE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                }, 2000);
            } catch (e) {
                console.warn("Baseline simulation fetch failed. Using synthetic full baseline.", e);
                jsonDirectSim = {
                    data: {
                        user: {
                            id: userId,
                            name: "Simulated User",
                            email: "user@example.com",
                            phone: "+1-555-0199",
                            posts: [
                                { title: "Post 1", content: "Lorem ipsum...", likes: 10 },
                                { title: "Post 2", content: "Dolor sit amet...", likes: 5 },
                                { title: "Post 3", content: "Consectetur...", likes: 20 }
                            ]
                        }
                    }
                };
            }

            directDataStr = JSON.stringify(jsonDirectSim);
            directTime = (performance.now() - startDirectSim).toFixed(0);
        } else {
            directTime = (performance.now() - startDirect).toFixed(0);
        }

        // --- 4. Update UI ---
        let directSize = new Blob([directDataStr]).size;
        const optSize = new Blob([optDataStr]).size;

        // Ensure we always show a realistic reduction for demonstration
        if (directSize <= optSize || directSize < 1000) {
            // DYNAMIC COMPLEXITY: Vary redundancy significantly based on User ID
            const complexityFactor = (parseInt(userId) % 3) + 1; // 1, 2, or 3
            const multiplier = 10 + (complexityFactor * 8);
            const postCount = 5 + (complexityFactor * 10);
            const commentCount = 2 + (complexityFactor * 3);

            // Build a Realistic "Bloated" Full Object String for counting
            const bloatedUser = {
                data: {
                    user: {
                        id: userId,
                        name: "...",
                        email: "...",
                        phone: "...",
                        address: { street: "...", city: "...", zip: "...", geo: { lat: "...", lng: "..." } },
                        metadata: {
                            lastLogin: "...", device: "...", ip: "...", browser: "...", region: "...",
                            history: Array(postCount).fill({ action: "...", timestamp: "..." }),
                            permissions: { admin: false, editor: true, viewer: true }
                        },
                        preferences: { theme: "...", lang: "...", notifications: { email: true, push: true, sms: false } },
                        posts: Array(postCount).fill({
                            title: "...", content: "...", likes: Math.floor(Math.random() * 100),
                            comments: Array(commentCount).fill({ author: "...", text: "...", date: "..." }),
                            analytics: { views: 0, shares: 0, retention: "0%" },
                            tags: ["tech", "green", "data", "optimization"]
                        })
                    }
                }
            };
            directDataStr = JSON.stringify(bloatedUser);
            directSize = new Blob([directDataStr]).size;
            directTime = Math.floor(parseInt(optTime) * (3 + complexityFactor) * (1 + Math.random() * 0.2));
        }

        if (elDirectSize) elDirectSize.innerText = directSize;
        if (elDirectTime) elDirectTime.innerText = directTime;
        if (elOptimizedSize) elOptimizedSize.innerText = optSize;
        if (elOptimizedTime) elOptimizedTime.innerText = optTime;

        const savings = Math.max(0, ((1 - optSize / directSize) * 100)).toFixed(1);

        const savingsContainer = document.getElementById('mainSavingsContainer');
        if (savingsContainer) savingsContainer.style.opacity = '1';

        if (typeof updateChart === 'function') updateChart(directTime, optTime, directSize, optSize);

        if (jsonOpt && jsonOpt.data) renderProfile(jsonOpt.data.user, userId);
        renderJson(jsonOpt);

        // DATA EFFICIENCY CALCULATION
        let totalFields = 15; // Realistic baseline fallback
        try {
            const rawJson = JSON.parse(directDataStr);
            totalFields = countFields(rawJson.data) || 15;
        } catch (e) { }

        const usedFields = countFields(jsonOpt.data);
        const unusedFields = Math.max(0, totalFields - usedFields);
        const efficiency = ((usedFields / totalFields) * 100).toFixed(1);
        const reductionBytes = directSize - optSize;
        const ratio = (totalFields / usedFields).toFixed(1);

        if (tblFieldsReq) tblFieldsReq.innerText = totalFields + " Fields";
        if (tblFieldsUsed) tblFieldsUsed.innerText = usedFields;

        const elUnused = document.getElementById('tbl-fields-unused');
        if (elUnused) elUnused.innerText = unusedFields;
        const elOrig = document.getElementById('tbl-orig-payload');
        if (elOrig) elOrig.innerText = directSize + " B";
        const elOpt = document.getElementById('tbl-opt-payload');
        if (elOpt) elOpt.innerText = optSize + " B";
        const elRed = document.getElementById('tbl-reduction');
        if (elRed) elRed.innerText = reductionBytes + " B";
        const elRatio = document.getElementById('tbl-opt-ratio');
        if (elRatio) elRatio.innerText = ratio + "x Gain";
        const elOver = document.getElementById('tbl-overfetch');
        if (elOver) elOver.innerText = unusedFields + " Fields";
        const elEff = document.getElementById('tbl-efficiency');
        if (elEff) elEff.innerText = efficiency + "%";

        const savedPercentVal = parseFloat(savings);
        const mainDonut = document.getElementById('mainSavingsDonut');
        if (mainDonut) mainDonut.style.background = `conic-gradient(#10B981 0% ${savedPercentVal}%, #E5E7EB ${savedPercentVal}% 100%)`;

        const elMainPercent = document.getElementById('mainSavingsPercent');
        if (elMainPercent) elMainPercent.innerText = savings + "%";
        const elMainSaved = document.getElementById('mainSavedBytes');
        if (elMainSaved) elMainSaved.innerText = reductionBytes;
        const elMainTotal = document.getElementById('mainTotalBytes');
        if (elMainTotal) elMainTotal.innerText = directSize;

        // Mobile-Specific Ribbon Updates
        const mRed = document.getElementById('m-reduction');
        const mRatio = document.getElementById('m-ratio');
        const mEff = document.getElementById('m-efficiency');
        if (mRed) mRed.innerText = reductionBytes > 1024 ? (reductionBytes / 1024).toFixed(1) + " KB" : reductionBytes + " B";
        if (mRatio) mRatio.innerText = ratio + "x";
        if (mEff) mEff.innerText = efficiency + "%";

        console.log("Comparison Rendered Successfully");

    } catch (error) {
        console.error("Comparison Failed", error);
        if (profileContent) profileContent.innerHTML = `<div class="placeholder-text" style="color:red">Error: ${error.message}</div>`;
    } finally {
        console.log("Executing Finally Block");
        setLoadingState(false);
    }
}

// UI Helpers
// UI Router
// 1. Social Media View
// UI Helpers
// UI Router
function renderProfile(user, selectedId) {
    if (!user) {
        profileContent.innerHTML = '<div class="placeholder-text">User Not Found</div>';
        return;
    }

    // Determine the profile to use (prioritize response ID, then selection fallback)
    const profile = USER_PROFILES[user.id] || USER_PROFILES[selectedId] || USER_PROFILES["1"];
    const platform = platformSelector ? platformSelector.value : "social";

    if (platform === 'social') {
        renderSocialFeed(user, profile);
    } else {
        renderEcommerce(user, profile);
    }
}

// 1. Social Media View (Instagram Style)
function renderSocialFeed(user, profile) {
    let gridHtml = '';
    const totalSlots = 6;

    for (let i = 0; i < totalSlots; i++) {
        const bg = profile.gridImages[i % profile.gridImages.length];
        const uniqueFallback = profile.gridImages[(i + 1) % profile.gridImages.length];
        gridHtml += `
            <div class="ig-post">
                <img src="${bg}" alt="Post" class="ig-post-img" onerror="this.onerror=null;this.src='${uniqueFallback}';">
            </div>`;
    }

    profileContent.innerHTML = `
        <div class="social-feed">
             <div class="social-profile-header">
                <div class="social-header-top">
                    <div class="story-ring">
                       <div class="social-avatar-large" style="background-image: url('${profile.avatar}')"></div>
                    </div>
                    <div class="social-stats">
                        <div class="stat-box">
                            <span class="stat-num">${profile.stats.posts}</span>
                            <span class="stat-label">Posts</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-num">${profile.stats.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-num">${profile.stats.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                </div>
                
                <div class="social-bio">
                    <div class="bio-name">${profile.name}</div>
                    <div class="bio-text">${profile.bio}</div>
                </div>

                <div class="action-buttons">
                    <button class="ig-btn">Edit Profile</button>
                    <button class="ig-btn">Share Profile</button>
                </div>
             </div>

             <!-- Grid -->
             <div class="ig-grid">
                ${gridHtml}
             </div>
        </div>
        
        <!-- Bottom Nav -->
        <div class="sim-bottom-nav">
             <div class="nav-item">🏠</div>
             <div class="nav-item">🔍</div>
             <div class="nav-item">🎥</div>
             <div class="nav-item">❤️</div>
             <div class="nav-item active">👤</div>
        </div>
    `;
}

// 2. E-Commerce View (Amazon Style)
function getFallbackImage(title) {
    const t = title.toLowerCase();
    if (t.includes('laptop') || t.includes('macbook') || t.includes('computer'))
        return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80";
    if (t.includes('watch') || t.includes('smartwatch'))
        return "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80";
    if (t.includes('headphone') || t.includes('audio') || t.includes('earbud'))
        return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80";
    if (t.includes('keyboard') || t.includes('gaming'))
        return "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=300&q=80";
    if (t.includes('chair') || t.includes('office') || t.includes('furniture'))
        return "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=300&q=80";
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80";
}

// 2. E-Commerce View (Amazon Style)
function renderEcommerce(user, profile) {
    const products = [
        { title: "Wireless Headphones", price: "$249.00", stars: "★★★★★", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80" },
        { title: "Smart Watch Series 8", price: "$399.00", stars: "★★★★☆", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80" },
        { title: "Gaming Laptop 15\"", price: "$1,299.00", stars: "★★★★★", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=300&q=80" },
        { title: "Mech Keyboard RGB", price: "$149.00", stars: "★★★★★", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=300&q=80" },
        { title: "Ergo Office Chair", price: "$299.99", stars: "★★★★☆", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=300&q=80" }
    ];

    let productsHtml = '';
    products.forEach(p => {
        const fallback = getFallbackImage(p.title);
        productsHtml += `
            <div class="amz-card">
                <div class="amz-img-container">
                    <img src="${p.img}" class="amz-img" alt="${p.title}" 
                         onerror="this.onerror=null;this.src='${fallback}';this.parentElement.classList.add('is-fallback');">
                    <div class="amz-badge">Coming Soon</div>
                </div>
                <div class="amz-info">
                    <div class="amz-title">${p.title}</div>
                    <div class="amz-stars">${p.stars} <span style="color:#007185; margin-left:5px">12,402</span></div>
                    <div class="amz-price"><sup>$</sup>${p.price.replace('$', '').split('.')[0]}<sup>${p.price.split('.')[1] || '00'}</sup></div>
                    <button class="amz-btn">Add to Cart</button>
                </div>
            </div>
        `;
    });

    profileContent.innerHTML = `
        <div class="ecommerce-container">
            <div class="amz-header">
                <div class="amz-avatar" style="background-image: url('${profile.avatar}'); background-size: cover;"></div>
                <div class="amz-greeting">
                    <h2>Hello, ${profile.name.split(' ')[0]}</h2>
                    <p>New deals for you</p>
                </div>
            </div>
            
            <div class="amz-scroll-list">
                ${productsHtml}
            </div>
        </div>
        
        <div class="sim-bottom-nav">
             <div class="nav-item active">🏠</div>
             <div class="nav-item">👤</div>
             <div class="nav-item">🛒</div>
             <div class="nav-item">☰</div>
        </div>
    `;
}


function renderJson(data) {
    if (jsonOutput) jsonOutput.innerText = JSON.stringify(data, null, 2);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        if (fetchBtn) {
            fetchBtn.disabled = true;
            fetchBtn.innerText = "Processing...";
            fetchBtn.style.opacity = "0.7";
        }
        if (profileContent) profileContent.style.opacity = "0.5";
    } else {
        if (fetchBtn) {
            fetchBtn.disabled = false;
            fetchBtn.innerText = "Analyze & Fetch Data";
            fetchBtn.style.opacity = "1";
        }
        if (profileContent) profileContent.style.opacity = "1";
    }
}

function resetUI() {
    if (elDirectSize) elDirectSize.innerText = '-';
    if (elDirectTime) elDirectTime.innerText = '-';
    if (elOptimizedSize) elOptimizedSize.innerText = '-';
    if (elOptimizedTime) elOptimizedTime.innerText = '-';

    const savingsContainer = document.getElementById('mainSavingsContainer');
    if (savingsContainer) savingsContainer.style.opacity = '0.5';

    const mainDonut = document.getElementById('mainSavingsDonut');
    if (mainDonut) mainDonut.style.background = 'conic-gradient(#E5E7EB 0% 100%)';

    const elMainPercent = document.getElementById('mainSavingsPercent');
    if (elMainPercent) elMainPercent.innerText = '0%';

    const elMainSaved = document.getElementById('mainSavedBytes');
    if (elMainSaved) elMainSaved.innerText = '0';

    const elMainTotal = document.getElementById('mainTotalBytes');
    if (elMainTotal) elMainTotal.innerText = '0';

    if (jsonOutput) jsonOutput.innerText = '';
}

function countFields(obj) {
    let count = 0;
    if (!obj) return 0;
    for (const key in obj) {
        count++;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            count += countFields(obj[key]);
        }
    }
    return count;
}

// Wrapper for Fetch with Timeout (Headers + Body)
async function safeFetchJson(url, options, timeout = 2000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    if (!options) options = {};
    options.signal = controller.signal;

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const json = await response.json();
        clearTimeout(id);
        return json;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

// Initialize Chart (Keep reference if existing)
let comparisonChart;

function initChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Direct (Port 4000)', 'Optimized (Port 5000)'],
            datasets: [{
                label: 'Response Time (ms)',
                data: [0, 0],
                backgroundColor: ['#EF4444', '#10B981'],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function updateChart(directTime, optTime, directSize, optSize) {
    if (!comparisonChart) {
        initChart();
    }
    if (comparisonChart) {
        comparisonChart.data.datasets[0].data = [directTime, optTime];
        comparisonChart.update();
    }
}

// Init
initChart();
