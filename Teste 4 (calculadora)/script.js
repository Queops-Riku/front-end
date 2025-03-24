let expressao = "";

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    let valor = this.getAttribute("data-value"); // Corrigido para capturar corretamente

    if (valor === "=") {
      try {
        resultado = eval(expressao); // Calcula o resultado
        document.querySelector(".valorFinal p").innerText = resultado; // Mostra o resultado
        expressao = "";
      } catch {
        resultado = "Erro!";
        document.querySelector(".valorFinal p").innerText = resultado;
      }
    } else if (valor === "⌫") {
      expressao = expressao.slice(0, -1); // Remove o último caractere
      document.querySelector(".expressao h2").innerText = expressao; // Atualiza a expressão
    } else if (valor === "C") {
      expressao = "";
      document.querySelector(".expressao h2").innerText = expressao;
    } else {
      expressao += valor;
      document.querySelector(".expressao h2").innerText = expressao; // Atualiza a expressão
    }
  });
});
