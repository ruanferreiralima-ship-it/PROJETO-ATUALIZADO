/* ============================================================
   JS CADASTRO - MÁSCARAS E VALIDAÇÃO COMPLETA DE DADOS
   ============================================================ */

   document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".cadastro-form");
    if (!form) return;

    const campos = {
        nome: document.getElementById("nome"),
        dataNascimento: document.getElementById("data-nascimento"),
        sexo: document.getElementById("sexo"),
        nomeMaterno: document.getElementById("nome-materno"),
        cpf: document.getElementById("cpf"),
        email: document.getElementById("email"), // Opcional, caso adicione no HTML
        celular: document.getElementById("celular"),
        telefone: document.getElementById("telefone"),
        cep: document.getElementById("cep"),
        endereco: document.getElementById("endereco"),
        numero: document.getElementById("numero"),
        login: document.getElementById("login"),
        senha: document.getElementById("senha"),
        confirmaSenha: document.getElementById("confirma-senha")
    };

    // ============================================================
    // UTILITÁRIOS DE ERRO VISUAL
    // ============================================================
    function mostrarErro(input, mensagem) {
        if (!input) return;
        limparErro(input);

        input.style.borderColor = "#ff4d4d";
        const span = document.createElement("small");
        span.className = "campo-erro-msg";
        span.style.color = "#ff4d4d";
        span.style.fontSize = "0.72rem";
        span.style.marginTop = "4px";
        span.style.fontWeight = "600";
        span.textContent = mensagem;

        input.parentElement.appendChild(span);
    }

    function limparErro(input) {
        if (!input) return;
        input.style.borderColor = "";
        const erroAntigo = input.parentElement.querySelector(".campo-erro-msg");
        if (erroAntigo) erroAntigo.remove();
    }

    // ============================================================
    // FUNÇÕES DE VALIDAÇÃO DE DADOS
    // ============================================================

    // 1. Validação Matemática de CPF
    function validarCPF(cpfFormatado) {
        const cpf = cpfFormatado.replace(/\D/g, "");
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto >= 10 ? 0 : resto;
        if (digito1 !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto >= 10 ? 0 : resto;
        return digito2 === parseInt(cpf.charAt(10));
    }

    // 2. Validação de Nome Completo (Mínimo nome e sobrenome)
    function validarNomeCompleto(nome) {
        const partes = nome.trim().split(/\s+/);
        return partes.length >= 2 && partes[0].length >= 2 && partes[1].length >= 2;
    }

    // 3. Validação de Celular (+55)DD-9XXXXXXXX
    function validarCelular(celular) {
        const regex = /^\(\+55\)[1-9]{2}-9[0-9]{8}$/;
        return regex.test(celular);
    }

    // 4. Validação de Telefone Fixo (+55)DD-XXXXXXXX
    function validarTelefoneFixo(telefone) {
        const regex = /^\(\+55\)[1-9]{2}-[2-5][0-9]{7}$/;
        return regex.test(telefone);
    }

    // 5. Validação de E-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(email.trim());
    }

    // 6. Validação de Data de Nascimento (Entre 16 e 120 anos)
    function validarDataNascimento(dataISO) {
        if (!dataISO) return false;
        const nascimento = new Date(dataISO);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade >= 16 && idade <= 120;
    }

    // ============================================================
    // MÁSCARAS E FILTROS EM TEMPO REAL
    // ============================================================

    const filtrarApenasLetras = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zà-úÀ-Ú\s]/g, "");
        limparErro(e.target);
    };

    if (campos.nome) {
        campos.nome.addEventListener("input", filtrarApenasLetras);
        campos.nome.addEventListener("blur", () => {
            if (!validarNomeCompleto(campos.nome.value)) {
                mostrarErro(campos.nome, "Informe nome e sobrenome válidos.");
            }
        });
    }

    if (campos.nomeMaterno) {
        campos.nomeMaterno.addEventListener("input", filtrarApenasLetras);
        campos.nomeMaterno.addEventListener("blur", () => {
            if (!validarNomeCompleto(campos.nomeMaterno.value)) {
                mostrarErro(campos.nomeMaterno, "Informe o nome completo da mãe.");
            }
        });
    }

    if (campos.dataNascimento) {
        campos.dataNascimento.addEventListener("blur", () => {
            if (!validarDataNascimento(campos.dataNascimento.value)) {
                mostrarErro(campos.dataNascimento, "Data inválida ou idade mínima de 16 anos não atingida.");
            } else {
                limparErro(campos.dataNascimento);
            }
        });
    }

    // Máscara + Validação CPF
    if (campos.cpf) {
        campos.cpf.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = v;
            limparErro(campos.cpf);
        });

        campos.cpf.addEventListener("blur", () => {
            if (campos.cpf.value.length > 0 && !validarCPF(campos.cpf.value)) {
                mostrarErro(campos.cpf, "CPF inválido! Verifique os números digitados.");
            }
        });
    }

    // Validação E-mail (caso esteja presente no HTML)
    if (campos.email) {
        campos.email.addEventListener("blur", () => {
            if (!validarEmail(campos.email.value)) {
                mostrarErro(campos.email, "Digite um endereço de e-mail válido.");
            } else {
                limparErro(campos.email);
            }
        });
    }

    // Máscara + Validação Celular
    if (campos.celular) {
        campos.celular.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.startsWith("55")) v = v.slice(2);
            v = v.slice(0, 11);

            if (v.length > 2) {
                v = `(+55)${v.slice(0, 2)}-${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(+55)${v}`;
            }
            e.target.value = v;
            limparErro(campos.celular);
        });

        campos.celular.addEventListener("blur", () => {
            if (campos.celular.value.length > 0 && !validarCelular(campos.celular.value)) {
                mostrarErro(campos.celular, "Celular inválido. Ex: (+55)21-999999999");
            }
        });
    }

    // Máscara + Validação Telefone Fixo
    if (campos.telefone) {
        campos.telefone.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "");
            if (v.startsWith("55")) v = v.slice(2);
            v = v.slice(0, 10);

            if (v.length > 2) {
                v = `(+55)${v.slice(0, 2)}-${v.slice(2)}`;
            } else if (v.length > 0) {
                v = `(+55)${v}`;
            }
            e.target.value = v;
            limparErro(campos.telefone);
        });

        campos.telefone.addEventListener("blur", () => {
            if (campos.telefone.value.length > 0 && !validarTelefoneFixo(campos.telefone.value)) {
                mostrarErro(campos.telefone, "Fixo inválido. Ex: (+55)21-22223333");
            }
        });
    }

    // Máscara CEP + Consulta ViaCEP
    if (campos.cep) {
        campos.cep.addEventListener("input", (e) => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 8);
            if (v.length > 5) v = v.replace(/(\d{5})(\d{1,3})/, "$1-$2");
            e.target.value = v;
            limparErro(campos.cep);

            const cepLimpo = v.replace(/\D/g, "");
            if (cepLimpo.length === 8) {
                fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.erro) {
                            campos.endereco.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                            limparErro(campos.endereco);
                            if (campos.numero) campos.numero.focus();
                        } else {
                            mostrarErro(campos.cep, "CEP não encontrado.");
                            campos.endereco.value = "";
                        }
                    })
                    .catch(() => {
                        mostrarErro(campos.cep, "Erro ao consultar o CEP.");
                    });
            }
        });
    }

    if (campos.numero) {
        campos.numero.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
            limparErro(campos.numero);
        });
    }

    // Validação em tempo real das Senhas
    function checarSenhas() {
        if (!campos.senha || !campos.confirmaSenha) return true;
        if (campos.confirmaSenha.value.length > 0 && campos.senha.value !== campos.confirmaSenha.value) {
            mostrarErro(campos.confirmaSenha, "As senhas não coincidem!");
            return false;
        }
        limparErro(campos.confirmaSenha);
        return true;
    }

    if (campos.senha) campos.senha.addEventListener("input", checarSenhas);
    if (campos.confirmaSenha) campos.confirmaSenha.addEventListener("input", checarSenhas);

    function formatarDataBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    // ============================================================
    // ENVIO E VALIDAÇÃO FINAL DO FORMULÁRIO
    // ============================================================
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formularioValido = true;

        if (!validarNomeCompleto(campos.nome.value)) {
            mostrarErro(campos.nome, "Informe seu nome e sobrenome.");
            formularioValido = false;
        }

        if (!validarDataNascimento(campos.dataNascimento.value)) {
            mostrarErro(campos.dataNascimento, "Data de nascimento inválida (mínimo 16 anos).");
            formularioValido = false;
        }

        if (!validarNomeCompleto(campos.nomeMaterno.value)) {
            mostrarErro(campos.nomeMaterno, "Informe o nome e sobrenome da mãe.");
            formularioValido = false;
        }

        if (!validarCPF(campos.cpf.value)) {
            mostrarErro(campos.cpf, "CPF inválido.");
            formularioValido = false;
        }

        if (campos.email && !validarEmail(campos.email.value)) {
            mostrarErro(campos.email, "E-mail inválido.");
            formularioValido = false;
        }

        if (!validarCelular(campos.celular.value)) {
            mostrarErro(campos.celular, "Celular inválido. Use o formato (+55)21-9XXXXXXXX");
            formularioValido = false;
        }

        if (!validarTelefoneFixo(campos.telefone.value)) {
            mostrarErro(campos.telefone, "Telefone fixo inválido. Use o formato (+55)21-XXXXXXXX");
            formularioValido = false;
        }

        if (campos.cep.value.replace(/\D/g, "").length !== 8) {
            mostrarErro(campos.cep, "CEP incompleto.");
            formularioValido = false;
        }

        if (!checarSenhas()) {
            formularioValido = false;
        }

        if (!formularioValido) return;

        const usuario = {
            nome: campos.nome.value.trim(),
            dataNascimento: formatarDataBR(campos.dataNascimento.value),
            sexo: campos.sexo.value,
            nomeMaterno: campos.nomeMaterno.value.trim(),
            cpf: campos.cpf.value.trim(),
            email: campos.email ? campos.email.value.trim() : "",
            celular: campos.celular.value.trim(),
            telefone: campos.telefone.value.trim(),
            cep: campos.cep.value.trim(),
            endereco: campos.endereco.value.trim(),
            numero: campos.numero.value.trim(),
            login: campos.login.value.trim(),
            senha: campos.senha.value,
            dataCadastro: new Date().toISOString()
        };

        const cadastrosExistentes = JSON.parse(localStorage.getItem("usuarios_cadastrados")) || [];
        const usuarioExiste = cadastrosExistentes.some(
            (user) => user.login === usuario.login || user.cpf === usuario.cpf
        );

        if (usuarioExiste) {
            mostrarErro(campos.cpf, "Este CPF ou Login já está cadastrado.");
            return;
        }

        cadastrosExistentes.push(usuario);
        localStorage.setItem("usuarios_cadastrados", JSON.stringify(cadastrosExistentes));

        alert("Cadastro realizado com sucesso!");
        form.reset();
    });
});