const loader = document.querySelector('#loader');
const tbody = document.querySelector('#usersTbody');
const emptyState = document.querySelector('#emptyState');
const btnReload = document.querySelector('#btnReload');
const search = document.querySelector('#search');

const form = document.querySelector('#userForm');
const btnCreate = document.querySelector('#btnCreate');
const alertBox = document.querySelector('#alertBox');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const selectRole = document.querySelector('#role');

const API_BASE_URL = 'http://127.0.01:5000';
const USER_ENPOINT = `${API_BASE_URL}/api/users`;

const setLoading = (isLoading) => {
  loader.classList.toggle("d-none", !isLoading);
}

const hideAlert = () => {
  alertBox.classList.add("d-none");
  alertBox.innerHTML = "";
}

const showAlert = (type, message) => {
  alertBox.classList.remove("d-none");
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${(message)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}


const getUsers = async () => {
    setLoading(true);
    try {
        const res = await fetch(USER_ENPOINT, {
            headers: {'Accept': 'application/json'}
        });

        const data = await res.json()
        console.table(data.payload);
        rederUser( data.payload);
    } catch (error) {
        console.error('Error del servidor ', error);
    } finally {
        setLoading(false);
    }
}


const setCreateLoading = (isLoading) => {
  btnCreate.disabled = isLoading;
  btnCreate.textContent = isLoading ? "Creando..." : "Crear";
}

btnReload.addEventListener('click', () => {
    getUsers();
})

form.addEventListener('submit', onCreateSubmit)

const rederUser = (users) => {
    tbody.innerHTML = '';
    users.forEach( user => {
        tbody.innerHTML += `
        <tr>
            <td class="fw-semibold">${user.id ?? user._id ?? "-"}</td>
            <td>${user.name ?? ""}</td>
            <td>${user.email ?? ""}</td>
            <td><span class="badge text-bg-secondary">${user.role ?? "user"}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-secondary" disabled>Editar</button>
                <button class="btn btn-sm btn-outline-danger ms-1" disabled>Eliminar</button>
            </td>
        </tr>
        `;
    });
}


async function onCreateSubmit(e) {
  e.preventDefault();
  hideAlert();

  // Validación Bootstrap
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const payload = {
    name: inputName.value.trim(),
    email: inputEmail.value.trim(),
    role: selectRole.value,
  };

  setCreateLoading(true);

  try {
    const res = await fetch(USER_ENPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.json(res);
      throw new Error(`Error POST /users (${res.status}) ${text}`);
    }

    // Si tu API devuelve el usuario creado, lo usamos para actualizar sin recargar (opcional)
    const created = await res.json(res);

    showAlert("success", "Usuario creado correctamente.");
    // resetForm();

    // Estrategia simple: recargar listado
    await getUsers();
  } catch (err) {
    showAlert("danger", `No se pudo crear el usuario. ${err.message}`);
  } finally {
    setCreateLoading(false);
  }
}



getUsers();