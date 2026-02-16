// Shared Training Events Data
// Used by both the home page events widget and the training calendar
// NOTE: Keep in sync with _events/ CMS collection — only CMS-managed events should appear here

const GPDC_EVENTS = [
    {
        id: 1,
        title: "GPDC Emory Collaboration: Rapid Screening & Red-Flag Identification",
        date: new Date(2026, 1, 20, 13, 0),
        endDate: new Date(2026, 1, 20, 17, 0),
        location: "Emory University School of Law",
        type: "in-person",
        description: "Collaborative training with Emory University on rapid screening techniques and identifying red flags during client interviews.",
        image: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=2348&auto=format&fit=crop",
        registerUrl: "#"
    },
    {
        id: 2,
        title: "Winter CPD Meeting",
        date: new Date(2026, 1, 27),
        endDate: new Date(2026, 1, 28),
        location: "Evergreen, Stone Mountain",
        type: "in-person",
        description: "Biannual meeting bringing together Circuit Public Defenders from across Georgia for updates, training, and collaboration.",
        image: "https://images.unsplash.com/photo-1764471444363-e6dc0f9773bc?q=80&w=987&auto=format&fit=crop",
        registerUrl: "#"
    },
    {
        id: 3,
        title: "Leadership Academy 2025-2026 Graduation",
        date: new Date(2026, 4, 22, 9, 0),
        endDate: new Date(2026, 4, 22, 12, 0),
        location: "Athens, GA",
        type: "in-person",
        description: "Graduation for the 2025-2026 class of the Leadership Academy for Assistant and Circuit Public Defenders.",
        image: "https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/684200c524675d5f75d8021d_Leadership%20Academy%20Graduation-10%20Large.jpeg",
        registerUrl: ""
    },
    {
        id: 4,
        title: "Public Defense Week 2026",
        date: new Date(2026, 6, 20),
        endDate: new Date(2026, 6, 25),
        location: "Athens, GA",
        type: "in-person",
        description: "Annual flagship conference featuring Summer Public Defense Conference and Transition into Law Practice Program (TILPP).",
        image: "/images/uploads/1Q8A9466.JPG",
        registerUrl: "https://gapubdef.org/events/public-defense-week-2026"
    }
];

// Helper function to get upcoming events sorted by date
function getUpcomingEvents(limit = null) {
    const now = new Date();
    let events = GPDC_EVENTS
        .filter(e => e.date >= now)
        .sort((a, b) => a.date - b.date);

    if (limit) {
        events = events.slice(0, limit);
    }

    return events;
}
