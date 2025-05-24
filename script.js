async function buscarCep() {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  const resultado = document.getElementById("resultado");

  if (cep.length !== 8) {
    resultado.innerHTML = "<p class='erro'>CEP inválido. Digite 8 dígitos.</p>";
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      resultado.innerHTML = "<p class='erro'>CEP não encontrado.</p>";
    } else {
      resultado.innerHTML = `
        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Localidade:</strong> ${data.localidade}</p>
        <p><strong>UF:</strong> ${data.uf}</p>
      `;
    }
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    resultado.innerHTML = "<p class='erro'>Erro ao buscar o CEP. Tente novamente.</p>";
  }
}