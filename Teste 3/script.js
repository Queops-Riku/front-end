// Seleciona os elementos do DOM
const form = document.getElementById("taskForm"); // O formulário onde o usuário digita a tarefa
const input = document.getElementById("taskName"); // Campo de texto para inserir a tarefa
const lista = document.getElementById("taskList"); // Lista onde as tarefas serão exibidas

// Inicializa o array de tarefas a partir do localStorage ou cria um array vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para renderizar (atualizar) a lista de tarefas na tela
function renderTasks() {
  // Limpa o conteúdo atual da lista
  lista.innerHTML = "";

  // Para cada tarefa no array "tasks", cria um item <li> e o adiciona à lista
  tasks.forEach((task) => {
    const item = document.createElement("li"); // Cria um novo elemento <li>
    item.textContent = task; // Define o texto do <li> com o conteúdo da tarefa
    item.classList.add("New-Task"); // Adiciona uma classe para fins de estilo
    lista.appendChild(item); // Insere o novo item na lista (DOM)
  });
}

// Função para adicionar uma nova tarefa
function addTask() {
  const taskText = input.value.trim(); // Captura o valor do input e remove espaços em branco

  // Verifica se o usuário digitou algo
  tasks.push(taskText); // Adiciona o valor digitado ao array "tasks"
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Atualiza o localStorage com o array atualizado de tarefas
  renderTasks(); // Atualiza a exibição da lista de tarefas
  input.value = ""; // Limpa o campo de input para nova entrada
}

// Evento de submissão do formulário:
// Quando o formulário for submetido, previne o comportamento padrão (recarregar a página)
// e chama a função addTask para adicionar a nova tarefa
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

// Cria um botão para excluir o usuário
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Excluir";
deleteBtn.classList.add("delete-btn");

// Adiciona evento ao botão para excluir o usuário
deleteBtn.addEventListener("click", () => {
  removeUser(user.id); // Remove o usuário com base no ID
});

// Renderiza as tarefas armazenadas ao carregar a página
renderTasks();
