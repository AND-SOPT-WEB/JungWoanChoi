// 초기 데이터 로드
const membersData = JSON.parse(localStorage.getItem("membersData"));
let filteredMembers = JSON.parse(localStorage.getItem("filteredMembers")) || membersData;

const filterButton = document.querySelector(".filter-button");
const resetButton = document.querySelector(".reset-button");

// 첫 번째 section에서 input값 입력하고 검색하면 filter하는 기능
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
            (genderValue === "" || member.gender === genderValue) &&
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
    tableBody.innerHTML = "";

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

// 개별 체크박스 상태 변경 시 체크박스 상태 업데이트
document.addEventListener("click", () => {
    const allCheckboxes = [...document.querySelectorAll(".member-checkbox")];
    const isAllChecked = allCheckboxes.every(checkbox => checkbox.checked);
    document.querySelector("#select-all").checked = isAllChecked;
});

const modal = document.getElementById("modal");
const addButton = document.querySelector(".add-button");
const closeModalButton = document.getElementById("closeModalButton");
const addMemberButton = document.getElementById("addMemberButton");

// 모달 열기
addButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// 모달 닫기
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// 모달 입력 필드 초기화
function clearModalInputs() {
    document.getElementById("newName").value = "";
    document.getElementById("newEnglishName").value = "";
    document.getElementById("newGithub").value = "";
    document.getElementById("newGender").value = "";
    document.getElementById("newRole").value = "";
    document.getElementById("newFirstWeekGroup").value = "";
    document.getElementById("newSecondWeekGroup").value = "";
}

// 데이터에 모달에 입력한 정보의 새 멤버 추가
addMemberButton.addEventListener("click", () => {
    const newName = document.getElementById("newName").value;
    const newEnglishName = document.getElementById("newEnglishName").value;
    const newGithub = document.getElementById("newGithub").value;
    const newGender = document.getElementById("newGender").value;
    const newRole = document.getElementById("newRole").value;
    const newFirstWeekGroup = parseInt(document.getElementById("newFirstWeekGroup").value);
    const newSecondWeekGroup = parseInt(document.getElementById("newSecondWeekGroup").value);

    if (!newName || !newEnglishName || !newGithub || !newGender || !newRole || isNaN(newFirstWeekGroup) || isNaN(newSecondWeekGroup)) {
        alert("모든 필드를 입력해야 합니다.");
        return;
    }

    // 새로운 멤버 객체 생성
    const newMember = {
        id: membersData.length + 1,
        name: newName,
        englishName: newEnglishName,
        github: newGithub,
        gender: newGender,
        role: newRole,
        firstWeekGroup: parseInt(newFirstWeekGroup),
        secondWeekGroup: parseInt(newSecondWeekGroup),
    };

    // 테이블에 추가
    // membersData와 filteredMembers에 새 멤버 추가
    membersData.push(newMember);
    filteredMembers = [...membersData]; // 전체 데이터 갱신
    localStorage.setItem("membersData", JSON.stringify(membersData));
    localStorage.setItem("filteredMembers", JSON.stringify(filteredMembers)); // 저장된 필터 데이터도 업데이트

    renderMemberTable(filteredMembers); // 테이블 다시 렌더링

    modal.style.display = "none"; // 모달 숨김
    clearModalInputs(); // 입력 필드 초기화
});

// 모달 입력 필드 초기화 함수


// 페이지 로드 시 저장된 데이터를 테이블에 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderMemberTable(filteredMembers); // 로드 시 필터링된 데이터가 표시되도록
});


