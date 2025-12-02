const talks = [
    {
        title: "The Future of Artificial Intelligence",
        speakers: ["John Doe"],
        category: ["AI", "Machine Learning"],
        duration: 60,
        description: "A deep dive into the latest advancements in AI and what to expect in the coming years."
    },
    {
        title: "Building Scalable Web Applications",
        speakers: ["Jane Smith", "Peter Jones"],
        category: ["Web Development", "Scalability"],
        duration: 60,
        description: "Learn how to design and build web applications that can handle millions of users."
    },
    {
        title: "Cybersecurity in the Modern Age",
        speakers: ["Mary Johnson"],
        category: ["Cybersecurity", "Security"],
        duration: 60,
        description: "An overview of the current cybersecurity landscape and how to protect your systems."
    },
    {
        title: "The Power of Big Data",
        speakers: ["David Williams"],
        category: ["Big Data", "Data Analytics"],
        duration: 60,
        description: "Discover how big data is transforming industries and how you can leverage it."
    },
    {
        title: "Introduction to Quantum Computing",
        speakers: ["Sarah Miller"],
        category: ["Quantum Computing", "Physics"],
        duration: 60,
        description: "A beginner-friendly introduction to the mind-bending world of quantum computing."
    },
    {
        title: "The Rise of Serverless Architectures",
        speakers: ["Michael Brown", "Emily Davis"],
        category: ["Serverless", "Cloud Computing"],
        duration: 60,
        description: "Explore the benefits and challenges of serverless architectures and how to get started."
    }
];

const scheduleContainer = document.getElementById('schedule-container');
const searchInput = document.getElementById('searchInput');

function renderSchedule(filteredTalks) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    filteredTalks.forEach((talk, index) => {
        const talkElement = document.createElement('div');
        talkElement.classList.add('talk');

        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

        talkElement.innerHTML = `
            <h2>${talk.title}</h2>
            <p class="speakers">By: ${talk.speakers.join(', ')}</p>
            <p class="category">Category: ${talk.category.join(', ')}</p>
            <p>${talk.description}</p>
            <p><strong>Time:</strong> ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        `;

        scheduleContainer.appendChild(talkElement);

        currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

        if (index === 2) { // Lunch break after the 3rd talk
            const lunchBreakElement = document.createElement('div');
            lunchBreakElement.classList.add('talk');
            const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
            lunchBreakElement.innerHTML = `<h2>Lunch Break</h2><p><strong>Time:</strong> ${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>`;
            scheduleContainer.appendChild(lunchBreakElement);
            currentTime = lunchEndTime;
        }
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
        return talk.category.some(category => category.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
});

renderSchedule(talks);
