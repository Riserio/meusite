document.getElementById("formCorretor").addEventListener("submit", e=>{
  e.preventDefault();

  const file = document.getElementById("fotoCorretor").files[0];
  let reader = new FileReader();

  reader.onload = function(evt) {
    let c = { 
      nome: document.getElementById("nomeCorretor").value, 
      cnpj: document.getElementById("cnpjCorretor").value, 
      estado: document.getElementById("estadoCorretor").value, 
      cidade: document.getElementById("cidadeCorretor").value, 
      celular: document.getElementById("celularCorretor").value, 
      email: document.getElementById("emailCorretor").value, 
      senha: document.getElementById("senhaCorretor").value, 
      papel: document.getElementById("papelCorretor").value,
      foto: evt.target.result // Base64 da imagem
    };

    usuarios.push(c);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderCorretores(); atualizarSelectCorretores(); atualizarSelectClientes();
    e.target.reset();
    alert("Corretor cadastrado!");
  };

  if(file){
    reader.readAsDataURL(file);
  } else {
    reader.onload({ target: { result: "img/avatar.png" } }); // fallback
  }
});

function renderCorretores(){
  const tbody=document.querySelector("#tabelaCorretores tbody"); tbody.innerHTML="";
  usuarios.forEach((c,i)=>{
    tbody.innerHTML+=`<tr>
      <td>${c.nome}</td><td>${c.cnpj}</td><td>${c.estado}</td><td>${c.cidade}</td><td>${c.celular}</td><td>${c.email}</td><td>${c.papel}</td>
      <td>${usuarioLogado && usuarioLogado.papel==="master"
        ?`<button class="action-btn" onclick="editarCorretor(${i})">Editar</button>
           <button class="action-btn" onclick="excluirCorretor(${i})">Excluir</button>`:""}</td>
    </tr>`;
  });
}

function editarCorretor(i){
  const c=usuarios[i];
  const nome=prompt("Nome:", c.nome); if(nome===null) return;
  const cnpj=prompt("CNPJ:", c.cnpj); if(cnpj===null) return;
  const estado=prompt("Estado:", c.estado); if(estado===null) return;
  const cidade=prompt("Cidade:", c.cidade); if(cidade===null) return;
  const celular=prompt("Celular:", c.celular); if(celular===null) return;
  const email=prompt("Email:", c.email); if(email===null) return;
  const papel=prompt("Papel (comercial/master):", c.papel); if(papel===null) return;
  usuarios[i]={...c, nome, cnpj, estado, cidade, celular, email, papel};
  localStorage.setItem("usuarios",JSON.stringify(usuarios));
  renderCorretores(); atualizarSelectCorretores(); atualizarSelectClientes();
}

function excluirCorretor(i){
  if(!confirm("Excluir este corretor?")) return;
  usuarios.splice(i,1);
  localStorage.setItem("usuarios",JSON.stringify(usuarios));
  renderCorretores(); atualizarSelectCorretores(); atualizarSelectClientes();
}

function atualizarSelectCorretores(){
  const select=document.getElementById("corretorLead"); 
  select.innerHTML="<option value=''>Selecione um corretor</option>";
  usuarios.filter(u=>u.papel==="comercial").forEach(c=>select.innerHTML+=`<option value="${c.nome}">${c.nome}</option>`);
}


if(usuarioLogado && usuarioLogado.foto){
  document.getElementById("fotoUsuario").src = usuarioLogado.foto;
}
