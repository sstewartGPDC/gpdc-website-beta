// Shared Training Events Data
// Used by both the home page events widget and the training calendar

const GPDC_EVENTS = [
    {
        id: 1,
        title: "GPDC Emory Collaboration: Rapid Screening & Red-Flag Identification in Client Interviews",
        date: new Date(2026, 1, 20, 13, 0),
        endDate: new Date(2026, 1, 20, 17, 0),
        location: "Emory University School of Law",
        type: "in-person",
        description: "Collaborative training with Emory University on rapid screening techniques and identifying red flags during client interviews.",
        image: "https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/684200c524675d5f75d8021d_Leadership%20Academy%20Graduation-10%20Large.jpeg",
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
        image: "https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/66e891aa2febf78fe64b3da0_1Q8A3235_2.jpg",
        registerUrl: "#"
    },
    {
        id: 3,
        title: "Be Well Wednesday: Mindfulness for Lawyers",
        date: new Date(2026, 1, 5),
        location: "Online",
        type: "online",
        description: "Drop-in wellness session addressing mindfulness practices for public defenders managing high-stress caseloads.",
        image: null,
        registerUrl: "https://gapubdef.org/events/be-well-wednesday"
    },
    {
        id: 4,
        title: "PSLF Webinar: Repayment Strategies",
        date: new Date(2026, 1, 12),
        location: "Online",
        type: "online",
        description: "Learn about Public Service Loan Forgiveness repayment strategies and the limited waiver opportunity.",
        image: null,
        registerUrl: "https://gapubdef.org/events/pslf-webinar"
    },
    {
        id: 5,
        title: "Juvenile Defense Training",
        date: new Date(2026, 1, 28),
        location: "Online",
        type: "online",
        description: "Specialized training for attorneys handling juvenile cases.",
        image: null,
        registerUrl: "https://gapubdef.org/events/juvenile-defense-training"
    },
    {
        id: 6,
        title: "Leadership Academy - Spring Cohort",
        date: new Date(2026, 2, 15),
        location: "Atlanta, GA",
        type: "in-person",
        description: "Intensive leadership development program for Assistant and Circuit Public Defenders.",
        image: "https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/684200c524675d5f75d8021d_Leadership%20Academy%20Graduation-10%20Large.jpeg",
        registerUrl: "https://gapubdef.org/events/leadership-academy-spring-2026"
    },
    {
        id: 7,
        title: "Mental Health Defense Seminar",
        date: new Date(2026, 2, 22),
        location: "Atlanta, GA / Online",
        type: "hybrid",
        description: "Understanding mental health issues in criminal defense cases.",
        image: null,
        registerUrl: "https://gapubdef.org/events/mental-health-defense"
    },
    {
        id: 8,
        title: "Nxt Up Program Kickoff",
        date: new Date(2026, 3, 8),
        location: "Atlanta, GA",
        type: "in-person",
        description: "Executive-readiness program for Chief Assistant Public Defenders preparing for leadership roles.",
        image: null,
        registerUrl: "https://gapubdef.org/events/nxt-up-2026"
    },
    {
        id: 9,
        title: "Trial Advocacy Workshop",
        date: new Date(2026, 4, 18),
        endDate: new Date(2026, 4, 20),
        location: "Macon, GA",
        type: "in-person",
        description: "Hands-on trial skills training with mock trials and expert feedback.",
        image: null,
        registerUrl: "https://gapubdef.org/events/trial-advocacy-workshop"
    },
    {
        id: 10,
        title: "Ethics in Public Defense",
        date: new Date(2026, 5, 10),
        location: "On-Demand",
        type: "on-demand",
        description: "Self-paced ethics CLE covering professional responsibility for public defenders.",
        image: null,
        registerUrl: "https://gapubdef.org/events/ethics-on-demand"
    },
    {
        id: 11,
        title: "Public Defense Week 2026",
        date: new Date(2026, 6, 20),
        endDate: new Date(2026, 6, 25),
        location: "Athens, GA",
        type: "in-person",
        description: "Annual flagship conference featuring Summer Public Defense Conference, Chief Assistant Training, and Transition into Law Practice Program.",
        image: "https://cdn.prod.website-files.com/66c9595306b0d169d1677ecc/66e891aa2febf78fe64b3da0_1Q8A3235_2.jpg",
        registerUrl: "https://gapubdef.org/events/public-defense-week-2026"
    },
    {
        id: 12,
        title: "Capital Defense Symposium",
        date: new Date(2026, 8, 15),
        endDate: new Date(2026, 8, 17),
        location: "Atlanta, GA",
        type: "in-person",
        description: "Advanced training for capital defense attorneys and mitigation specialists.",
        image: null,
        registerUrl: "https://gapubdef.org/events/capital-defense-symposium"
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
