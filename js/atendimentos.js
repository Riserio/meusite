
let atendimentos = JSON.parse(localStorage.getItem("atendimentos") || "[]");

document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("formAtendimento");
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const a = {
        cliente: (document.getElementById("clienteAtendimento")||{}).value || "",
        corretor: (window.usuarioLogado ? window.usuarioLogado.nome : ""),
        data: new Date().toLocaleString(),
        assunto: (document.getElementById("assuntoAtendimento")||{}).value || "",
        status: (document.getElementById("statusAtendimento")||{}).value || "Em aberto",
        cotacoes: parseInt((document.getElementById("cotacoesAtendimento")||{}).value || "0", 10)
      };
      atendimentos.push(a);
      localStorage.setItem("atendimentos", JSON.stringify(atendimentos));
      renderAtendimentos();
      form.reset();
      if(typeof atualizarCounters==="function") atualizarCounters();
      alert("Atendimento criado!");
    });
  }
  renderAtendimentos();
});

function renderAtendimentos(){
  const tbody = document.querySelector("#tabelaAtendimentos tbody");
  if(!tbody) return;
  tbody.innerHTML = "";
  atendimentos.forEach((a,i)=>{
    tbody.innerHTML += `<tr>
      <td>${a.cliente}</td><td>${a.corretor}</td><td>${a.data}</td>
      <td>${a.assunto}</td><td>${a.status}</td><td>${a.cotacoes}</td>
      <td><button class="action-btn" onclick="excluirAt(${i})">Excluir</button></td>
    </tr>`;
  });
}

function excluirAt(i){
  if(!confirm("Excluir atendimento?")) return;
  atendimentos.splice(i,1);
  localStorage.setItem("atendimentos", JSON.stringify(atendimentos));
  renderAtendimentos();
  if(typeof atualizarCounters==="function") atualizarCounters();
}
