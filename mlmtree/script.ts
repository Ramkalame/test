// TypeScript code for handling dynamic data will go here
// You can use TypeScript to manage your MLM network structure, e.g., an array of members
// and their relationships, and dynamically generate the HTML.

// Example data structure for a member
interface Member {
    id: number;
    name: string;
    parentID: number | null;
}

// Sample array of members
const members: Member[] = [
    { id: 1, name: 'Member 1', parentID: null },
    { id: 2, name: 'Member 2', parentID: null },
    { id: 3, name: 'Member 3', parentID: 1 },
    { id: 4, name: 'Member 4', parentID: 1 },
    { id: 5, name: 'Member 5', parentID: 2 },
    { id: 6, name: 'Member 6', parentID: 2 },
    { id: 7, name: 'Member 7', parentID: 3 },
    { id: 8, name: 'Member 8', parentID: 3 },
    { id: 9, name: 'Member 9', parentID: 4 },
    { id: 10, name: 'Member 10', parentID: 4 },
    // Add more members and their parent relationships
];

// Function to generate the MLM tree structure dynamically based on the data
function generateMLMTree() {
    const networkContainer = document.getElementById('network-container');

    // Function to recursively generate the HTML structure for a member and their downline
    function generateMemberHTML(member: Member): string {
        const subMembers = members.filter(m => m.parentID === member.id);

        let html = `<div class="node"><div class="member">${member.name}</div>`;
        if (subMembers.length > 0) {
            html += '<div class="connection"></div>';
            html += '<ul>';
            subMembers.forEach(subMember => {
                html += generateMemberHTML(subMember);
            });
            html += '</ul>';
        }
        html += '</div>';
        return html;
    }

    if (networkContainer) {
        const rootMembers = members.filter(member => member.parentID === null);
        rootMembers.forEach(rootMember => {
            networkContainer.innerHTML += generateMemberHTML(rootMember);
        });
    }
}

// Call the function to generate the MLM tree when the page loads
window.onload = generateMLMTree;
