document.getElementById("formLead").addEventListener("submit", e=>{
  e.preventDefault();
  const lead = {
    nome: document.getElementById("nomeLead").value,
    celular: document.getElementById("celularLead").value,
    email: document.getElementById("emailLead").value,
    cidade: document.getElementById("cidadeLead").value,
    estado: document.getElementById("estadoLead").value,
    corretor: document.getElementById("corretorLead").value
  };
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads(); atualizarSelectClientes();
  e.target.reset();
  alert("Lead cadastrado!");
});

function renderLeads(){
  const tbody = document.querySelector("#tabelaLeads tbody"); tbody.innerHTML="";
  const lista = (!usuarioLogado || usuarioLogado.papel==="master") ? leads : leads.filter(l=>l.corretor===usuarioLogado.nome);
  lista.forEach((l,i)=>{
    const idx = leads.indexOf(l); 
    tbody.innerHTML += `<tr>
      <td>${l.nome}</td><td>${l.celular}</td><td>${l.email}</td>
      <td>${l.cidade}</td><td>${l.estado}</td><td>${l.corretor||""}</td>
      <td>${usuarioLogado && usuarioLogado.papel==="master"
        ? `<button class="action-btn" onclick="excluirLead(${idx})">Excluir</button>` : ""}</td>
    </tr>`;
  });
}

function excluirLead(i){
  if(!confirm("Excluir este lead?")) return;
  leads.splice(i,1);
  localStorage.setItem("leads", JSON.stringify(leads));
  renderLeads(); atualizarSelectClientes();
}

function atualizarSelectClientes(){
  const select=document.getElementById("clienteAtendimento"); 
  if(!select) return;
  select.innerHTML="<option value=''>Selecione o cliente</option>";
  const clientesPermitidos=(!usuarioLogado || usuarioLogado.papel==="master")
    ? leads
    : leads.filter(l=>l.corretor===usuarioLogado.nome);
  clientesPermitidos.forEach(l=>select.innerHTML+=`<option value="${l.nome}">${l.nome}</option>`);
}
