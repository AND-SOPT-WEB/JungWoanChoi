const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
const memberList = document.querySelector("#memberList");

function renderMemberList() {
    if (Array.isArray(membersData)) {
        membersData.forEach(member => {
            const listItem = document.createElement("li");
            listItem.classList.add("member-item");
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "member-checkbox";

            const nameSpan = document.createElement("span");
            nameSpan.className = "name";
            nameSpan.textContent = member.name;

            const englishNameSpan = document.createElement("span");
            englishNameSpan.className = "englishName";
            englishNameSpan.textContent = member.englishName;

            const githubSpan = document.createElement("span");
            githubSpan.className = "github";
            githubSpan.textContent = member.github;

            const genderSpan = document.createElement("span");
            genderSpan.className = "gender";
            genderSpan.textContent = member.gender;

            const roleSpan = document.createElement("span");
            roleSpan.className = "role";
            roleSpan.textContent = member.role;

            const firstWeekGroupSpan = document.createElement("span");
            firstWeekGroupSpan.className = "firstWeekGroup";
            firstWeekGroupSpan.textContent = member.firstWeekGroup;

            const secondWeekGroupSpan = document.createElement("span");
            secondWeekGroupSpan.className = "secondWeekGroup";
            secondWeekGroupSpan.textContent = member.secondWeekGroup;

            listItem.append(
                checkbox,
                nameSpan, 
                englishNameSpan,
                githubSpan,
                genderSpan,
                roleSpan,
                firstWeekGroupSpan,
                secondWeekGroupSpan);
            
            memberList.appendChild(listItem);
        });
    } else {
        console.error("membersData is not an array:", membersData);
    }
}

renderMemberList();

function sayInfo() {
    console.log("검색 버튼 클릭됨");
    const nameBox = document.getElementById('name').value;
    const englishNameBox = document.getElementById('englishName').value;

    alert(nameBox + '님 안녕하세요!');
}