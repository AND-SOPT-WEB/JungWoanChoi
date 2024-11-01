const button = document.querySelector('#button');
const ul = document.querySelector('ul');
const inputData = document.querySelector('#input');

button.addEventListener("click", function() {
    if (inputData.value.length > 0) {
        const li = document.createElement("li");
        li.textContent = inputData.value;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";

        deleteBtn.addEventListener("click", function() {
            li.remove();
        });

        li.appendChild(deleteBtn);
        ul.appendChild(li);
        inputData.value = "";
    }
}
)

// 삭제 버튼 누르면 값 삭제하기
// 배열로 접근해서 추가하고 삭제한다는 느낌




// input에 입력된 데이터를 받아오기 - 그 데이터를 <ul>의 자식으로 추가하기

// const li = document.createElement('li');
// li.textContent = !!!
// todoList.appendChild(li);

// btn.addEventListener("click", () => {
//     alert("클릭")
// })

// const buttonClick = () => {
//     alert("클릭");
// }

// btn.addEventListener("click", buttonClick);