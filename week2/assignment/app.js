// 초기 데이터 로드
const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) || membersData;

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
    renderMemberTable(filteredMembers);
});

function renderMemberTable(data) {
    const tableBody = document.querySelector("#memberTable tbody");
    tableBody.innerHTML = ""; // 테이블 초기화

    data.forEach(member => {
        const row = document.createElement("tr");

        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "member-checkbox";
        checkboxCell.appendChild(checkbox);

        const nameCell = document.createElement("td");
        nameCell.textContent = member.name;

        const englishNameCell = document.createElement("td");
        englishNameCell.textContent = member.englishName;

        const githubCell = document.createElement("td");
        githubCell.textContent = member.github;

        const genderCell = document.createElement("td");
        genderCell.textContent = member.gender;

        const roleCell = document.createElement("td");
        roleCell.textContent = member.role;

        const firstWeekGroupCell = document.createElement("td");
        firstWeekGroupCell.textContent = member.firstWeekGroup;

        const secondWeekGroupCell = document.createElement("td");
        secondWeekGroupCell.textContent = member.secondWeekGroup;

        row.append(
            checkboxCell,
            nameCell,
            englishNameCell,
            githubCell,
            genderCell,
            roleCell,
            firstWeekGroupCell,
            secondWeekGroupCell
        );

        tableBody.appendChild(row);
    });
}

// 페이지 로드 시 필터링된 데이터 또는 전체 데이터 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderMemberTable(filteredMembers);
});

// 리셋 버튼 - 필터링 초기화하고 전체 멤버 리스트 로드
resetButton.addEventListener("click", () => {
    filteredMembers = membersData; // 원본 데이터를 사용
    localStorage.setItem("filteredMembers", JSON.stringify(membersData)); // 필터링 초기화
    renderMemberTable(membersData);
});

// 체크박스 전체 선택 및 해제
const selectAll = document.querySelector('#select-all');

selectAll.onclick = () => {
    const checkboxes = document.querySelectorAll(".member-checkbox");
    checkboxes.forEach(checkbox => checkbox.checked = selectAll.checked);
};

// 체크박스 누르고 삭제 버튼 클릭 시 해당 항목 삭제
const deleteButton = document.querySelector(".delete-button");

deleteButton.onclick = () => {
    const selectedMembers = [...document.querySelectorAll(".member-checkbox:checked")];
    selectedMembers.forEach(checkbox => {
        const row = checkbox.closest("tr");
        const nameToRemove = row.children[1].textContent;
        const indexToRemove = membersData.findIndex(member => member.name === nameToRemove);

        if (indexToRemove !== -1) {
            membersData.splice(indexToRemove, 1);
        }
        row.remove();
    });

    filteredMembers = membersData;
    localStorage.setItem("membersData", JSON.stringify(membersData));
    localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers));
};

// 개별 체크박스 상태 변경 시 `select-all` 체크박스 상태 업데이트
document.addEventListener("click", () => {
    const allCheckboxes = [...document.querySelectorAll(".member-checkbox")];
    const isAllChecked = allCheckboxes.every(checkbox => checkbox.checked);
    document.querySelector("#select-all").checked = isAllChecked;
});