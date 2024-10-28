// 초기 데이터 로드
const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) || membersData;
const memberList = document.querySelector("#memberList");

const filterButton = document.querySelector(".filter-button");
const resetButton = document.querySelector(".reset-button");

// section1에서 input값 입력하고 검색하면 filter하는 기능
filterButton.addEventListener("click", () => {
    const nameValue = document.getElementById("name").value;
    const englishNameValue = document.getElementById("englishName").value;
    const githubValue = document.getElementById("github").value;
    const genderValue = document.getElementById("gender").value;
    const roleValue = document.getElementById("role").value;
    const firstWeekGroupValue = document.getElementById("firstWeekGroup").value;
    const secondWeekGroupValue = document.getElementById("secondWeekGroup").value;

    // 필터링 조건에 따라 멤버 필터링
    filteredMembers = membersData.filter(member => {
        return (
            (nameValue === "" || member.name.includes(nameValue)) &&
            (englishNameValue === "" || member.englishName.includes(englishNameValue)) &&
            (githubValue === "" || member.github.includes(githubValue)) &&
            (genderValue === "" || member.gender.includes(genderValue)) &&
            (roleValue === "" || member.role.includes(roleValue)) &&
            (firstWeekGroupValue === "" || member.firstWeekGroup.includes(firstWeekGroupValue)) &&
            (secondWeekGroupValue === "" || member.secondWeekGroup.includes(secondWeekGroupValue))
        );
    });

    localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
    renderMemberList(filteredMembers);
});

function renderMemberList(data) {

    const memberList = document.querySelector("#memberList");
    const fixedListItem = memberList.querySelector(".represent-list");

    memberList.innerHTML = "";
    memberList.appendChild(fixedListItem);

    data.forEach(member => {
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
            secondWeekGroupSpan
        );

        memberList.appendChild(listItem);
    });
}

// 페이지 로드 시 필터링된 데이터 또는 전체 데이터 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderMemberList(filteredMembers);
});

// 리셋 버튼 - 필터링 초기화하고 전체 멤버 리스트 로드
resetButton.addEventListener("click", () => {
    filteredMembers = membersData; // 원본 데이터를 사용
    localStorage.setItem("filteredMembers", JSON.stringify(membersData)); // 필터링 초기화
    renderMemberList(membersData);
});

// 체크박스 전체 선택 및 해제
const selectAll = document.querySelector('#select-all');

selectAll.onclick = () => {
    const listAll = document.querySelectorAll(".member-checkbox");
    listAll.forEach(checkbox => checkbox.checked = selectAll.checked);
};

// 체크박스 누르고 삭제 버튼 클릭 시 해당 항목 삭제
const deleteButton = document.querySelector(".delete-button");

deleteButton.onclick = () => {
    const selectedMembers = [...document.querySelectorAll(".member-checkbox:checked")];
    selectedMembers.forEach(checkbox => {
        const nameToRemove = checkbox.nextSibling.textContent;
        const indexToRemove = membersData.findIndex(member => member.name === nameToRemove);
        
        if (indexToRemove !== -1) {
            membersData.splice(indexToRemove, 1);
        }
        checkbox.parentElement.remove();
    });

    localStorage.setItem("membersData", JSON.stringify(membersData));
    localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
};
